import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { getUserGradeContestSubmissionByContestId } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContest";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import ScoreContestList from "./ScoreContestList";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import ScoreContestListStudent from "./ScoreContestListStudent";

const ResultGradeContestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_grade_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const max = user_grade_contest_submissions.userGradeContestSubmissions.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = user_grade_contest_submissions.userGradeContestSubmissions.reduce((a, b) => Math.min(a, b.score), 0);

    var role_privilege = localStorage.getItem('role_privilege')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role_privilege !== null) {
        rolePrivilege = role_privilege.split(',')
        roleUser = rolePrivilege[0]
    }

    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var id: any = "";
    if (id_x !== null) {
        id = id_x;
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
                    trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getStudentByParent(dispatch, id))
                trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
            }
        }
        dispatch(updateCurrentPath("Cuoc thi", "Chi tiết"));
    }, [dispatch, access_token, refresh_token, contest_id, id]);


    const history = useHistory();
    const onRouteChange = () => {
        let path = '/contest/result-analytis';
        history.push({
            pathname: path
        });
    }

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
                    <TopCard title="ĐIỂM CAO NHẤT" text={`${max}`} icon="book" class="primary" />
                    <TopCard title="ĐIỂM THẤP NHẤT" text={`${min}`} icon="book" class="danger" />
                </div>

                <div className="row">

                    {
                        function () {
                            if (roleUser === "TEACHER_USER") {
                                return (
                                    <div className="col-xl-8 col-md-8 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Danh sách học sinh</h3>
                                        <div className="col-xl-12 col-md-12 mb-4">
                                            <div className={`card shadow h-100 py-2`} id="topcard-user">
                                                <div className="card-body">
                                                    <ScoreContestList />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            else if (roleUser === "PARENT_USER") {
                                return (
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Bảng xếp hạng</h3>
                                        <div className="col-xl-12 col-md-12 mb-4">
                                            <div className={`card shadow h-100 py-2`} id="topcard-user">
                                                <div className="card-body">
                                                    <ScoreContestList />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            else if (roleUser === "STUDENT_USER") {
                                return (
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Bảng xếp hạng</h3>
                                        <div className="col-xl-12 col-md-12 mb-4">
                                            <div className={`card shadow h-100 py-2`} id="topcard-user">
                                                <div className="card-body">
                                                    <ScoreContestList />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        }()
                    }

                    {
                        function () {
                            if (roleUser === "TEACHER_USER") {
                                return (
                                    <div className="col-xl-4 col-md-4 mb-4">
                                        <div className="row justify-content-center">
                                            <button className="btn btn-success btn-green" id="btn-into-class" onClick={() => {
                                                onRouteChange()
                                            }}>
                                                Xem review
                                                <i className="fas fa fa-arrow-right"></i>
                                            </button>
                                        </div>
                                        {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                                    </div>
                                )
                            }
                        }()
                    }
                </div>

            </Fragment>
    );
};

export default ResultGradeContestTeacher;
