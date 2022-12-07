import React, { Fragment, Dispatch, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import "./Contest.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IStateType, IRootPageStateType, IUserGradeContestSubmissionState, IContestSubmissionState, IUserGradeContestState } from "../../store/models/root.interface";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { getContest } from "../../common/service/Contest/GetContest";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import TopStudent from "./TopStudent";
import TopTeacher from "./TopTeacher";
import { getUserGradeContestSubmissionByContestId } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContest";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";
import { ChartLine } from "../../common/components/CharLine";
import { getUserGradeContestByContestId } from "../../common/service/UserGradeContest/GetUserGradeContestByContestId";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";


const ResultContest: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_gradee_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const user_grade_contests: IUserGradeContestState = useSelector((state: IStateType) => state.user_grade_contests);
    const contest_submissions: IContestSubmissionState = useSelector((state: IStateType) => state.contest_submissions);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    

    var id_x = localStorage.getItem('contest_id');
    let contest_id: number = 0;
    if (id_x !== null){
        contest_id = parseInt(id_x)
    }

    const { promiseInProgress } = usePromiseTracker();

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
                    trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
                    trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                    trackPromise(getUserGradeContestByContestId(dispatch, contest_id))
                }
            }
            else {
                trackPromise(getUserGradeContestSubmissionByContestId(dispatch, contest_id))
                trackPromise(getContestSubmissionByContest(dispatch, contest_id))
                trackPromise(getUserGradeContestByContestId(dispatch, contest_id))
            }
        }
    }, [dispatch, contest_id, access_token, refresh_token])

    
    useEffect(() => {
        dispatch(updateCurrentPath("Cuộc thi", "danh sách"));
    }, [path.area, dispatch]);

    useEffect(() => {
        trackPromise(getTeacher(dispatch))
        trackPromise(getContest(dispatch))
        trackPromise(getArtType(dispatch))
        trackPromise(getArtLevel(dispatch))
        trackPromise(getArtAge(dispatch))
    }, [dispatch])

    let student: string[] = []
    let scores: number[] = []
    if (user_gradee_contest_submissions.userGradeContestSubmissions.length > 0){
        user_gradee_contest_submissions.userGradeContestSubmissions.map(ele => {
            student.push(ele.student_name)
            scores.push(ele.score)
            return ele
        })
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


    return (
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Cuộc thi</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ BÀI NỘP" text={`${contest_submissions.contest_gradeds.length + contest_submissions.contest_not_gradeds.length}`} icon="box" class="primary" />
                <TopCard title="GIÁO VIÊN CHẤM" text={`${user_grade_contests.userGradeContests.length}`} icon="box" class="primary" />
                <TopCard title="ĐÃ CHẤM" text={`${user_gradee_contest_submissions.userGradeContestSubmissions.length}`} icon="box" class="primary" />
            </div>

            {/* <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" />
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div> */}

        <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách điểm thi</h6>
            </div>
            <div className="card-body">
              <TopStudent />
            </div>
          </div>

        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên</h6>
            </div>
            <div className="card-body">
            <TopTeacher />
            </div>
          </div>
        </div>

        <div className="col-xl-12 col-md-12 mb-4">
            <div className="row justify-content-center">
                <ChartLine data={data} />
            </div>
        </div>

      </div>

        </Fragment >
    );
};

export default ResultContest;
