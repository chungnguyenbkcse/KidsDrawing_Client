import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getUserGradeContestByContestId } from "../../common/service/UserGradeContest/GetUserGradeContestByContestId";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import ScoreContestList from "./ScoreContestList";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import ScoreContestList1 from "./ScoreContestList1";
import { getUserGradeContestSubmissionByContestAndTeacher } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContestAndTeacher";


const AnalytisResultGradeContestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_grade_contest_submissions: IUserGradeContestSubmissionState  = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const max = user_grade_contest_submissions.userGradeContestSubmissions.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = user_grade_contest_submissions.userGradeContestSubmissions.reduce((a, b) => Math.min(a, b.score), 0);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    let student: string[] = []
    let scores: number[] = []
    if (user_grade_contest_submissions.userGradeContestSubmissions.length > 0){
        user_grade_contest_submissions.userGradeContestSubmissions.map(ele => {
            student.push(ele.student_name)
            scores.push(ele.score)
            return ele
        })
    }

    const { promiseInProgress } = usePromiseTracker();

    var id_x = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_x !== null) {
        class_id = parseInt(id_x);
    }

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

    const labels = student;
    let data = {
        labels,
        datasets: [
            {
                label: 'Điêm',
                data: scores,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {

        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
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
                    trackPromise(getUserGradeContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
                }
            }
            else {   
                trackPromise(getUserGradeContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
            }
        }
    }, [dispatch, contest_id, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", "Biểu đồ"));
    }, [path.area, dispatch])

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
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="ĐIỂM CAO NHẤT" text={`${max}`} icon="book" class="primary" />
                <TopCard title="ĐIỂM THẤP NHẤT" text={`${min}`} icon="book" class="danger" />
            </div>

            <div className="row">

                <div className="col-xl-12 col-md-6 mb-12">
                    <div className="row justify-content-center">
                        <ChartLine data={data} />
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default AnalytisResultGradeContestTeacher;

