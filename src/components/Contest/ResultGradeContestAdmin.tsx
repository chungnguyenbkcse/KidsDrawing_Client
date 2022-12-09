import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { getUserGradeContestSubmissionByContestId } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContest";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestSubmissionState, IRootPageStateType, IStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import ScoreContestList from "./ScoreContestList";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import "./ResultContest.css"
import { getUserGradeContestSubmissionByContestAndTeacher } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContestAndTeacher";
import ScoreContestList1 from "./ScoreContestList1";
import ScoreContestAdminList from "./ScoreContestAdminList";
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";
import { IContestSubmission } from "../../store/models/contest_submission.interface";

const ResultGradeContestAdmin: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_submissions: IContestSubmissionState = useSelector((state: IStateType) => state.contest_submissions);
    let x: IContestSubmission[] = []
    x.push(...contest_submissions.contest_gradeds)
    x.push(...contest_submissions.contest_not_gradeds)
    const max = x.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = x.reduce((a, b) => Math.min(a, b.score), 100);

    var role = localStorage.getItem('role')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }

    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
    }

    var id_x = localStorage.getItem('id');
    var id: number = 0;
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getContestSubmissionByContest(dispatch, contest_id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id, id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", "kết quả"));
    }, [path.area, dispatch])


    const history = useHistory();
    const onRouteChange = () => {
        let path = '/contest/result-analytis';
        history.push({
            pathname: path
        });
    }

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>

                <div className="row">
                    <TopCard title="ĐIỂM CAO NHẤT" text={`${max}`} icon="book" class="primary" />
                    <TopCard title="ĐIỂM THẤP NHẤT" text={`${min}`} icon="book" class="danger" />
                    <div className="col-xl-3 col-md-3 notification-x">
                        <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() => {
                            onRouteChange()
                        }}>
                            Biểu đồ
                            <i className="fas fa fa-arrow-right"></i>
                        </button>
                    </div>
                </div>


                <div className="row">
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className={`card shadow h-100 py-2`} id="topcard-user">
                                <div className="card-body">
                                    <ScoreContestAdminList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
    );
};

export default ResultGradeContestAdmin;
