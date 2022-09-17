import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestSubmissionState, IRootPageStateType, IStateType, IUserGradeContestSubmissionState, IUserState } from "../../store/models/root.interface";
import "./ManageStudent.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getUserGradeContestSubmissionByContestId } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContest";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { IUserGradeContestSubmission } from "../../store/models/user_grade_contest_submission.interface";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";
import { IContestSubmission } from "../../store/models/contest_submission.interface";

const DetailContestStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_grade_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const contest_submissions: IContestSubmissionState = useSelector((state: IStateType) => state.contest_submissions);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(users.students)
    console.log(contest_submissions.contest_gradeds)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    let childs: IUserGradeContestSubmission[] = [];
    users.students.map((ele, idx) => {
        return user_grade_contest_submissions.userGradeContestSubmissions.map((element, idx) => {
            if (ele.id === element.student_id) {
                childs.push(element)
            }
            return element
        })
    })

    let submistions: IContestSubmission[] = [];
    childs.map((ele, idx) => {
        return contest_submissions.contest_gradeds.map((element, idx) => {
            if (element.id === ele.contest_submission_id){
                submistions.push(element);
            }
            return element
        })
    })

    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem('contest_name');
    let contest_name = "";

    if (id_z !== null) {
        contest_name = id_z;
    }

    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {

        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getStudentByParent(dispatch, id))
                    trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                    trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getStudentByParent(dispatch, id))
                trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
            }
        }
        dispatch(updateCurrentPath("Cuoc thi", "Chi tiết"));
    }, [dispatch, access_token, refresh_token, contest_id]);


    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", "Chi tiết"));
    }, [path.area, dispatch]);


    return (
        promiseInProgress ?
            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
                        </div>
                    </div>
                </div>
            </div> : <Fragment>

                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4" id="topcard-user">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Cuộc thi</h6>
                            </div>
                            <div className="card-body">
                                <p>
                                    {contest_name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    childs.map((ele, idx) => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Bài làm của bé: {ele.student_name}</h6>
                                        </div>
                                        <img className="card-img-top" src={submistions[idx].image_url} alt="" />
                                    </div>
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Điểm của bé</h6>
                                            </div>
                                            <div className="card-body">
                                                <CircularProgressbar value={ele.score} text={`${ele.score}`} />;
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Nhận xét</h6>
                                            </div>
                                            <div className="card-body">
                                                {ele.feedback}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </Fragment>
    );
};

export default DetailContestStudent;