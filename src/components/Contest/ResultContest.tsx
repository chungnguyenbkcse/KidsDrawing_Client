import React, { Fragment, Dispatch, useState, useEffect } from "react";
import TopCard from "../../common/components/TopCard";
import "./Contest.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IContestState, IStateType, IRootPageStateType, IUserGradeContestSubmissionState } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    removeContest, clearSelectedContest, setModificationState,
    changeSelectedContest
} from "../../store/actions/contest.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ContestModificationStatus, IContest } from "../../store/models/contest.interface";
import ContestIsOnList from "./ContestIsOnList";
import ContestEndList from "./ContestEndList";
import ContestNotOnYetList from "./ContestNotOnYetList";
import { useHistory } from "react-router-dom";
import { deleteContest } from "../../common/service/Contest/DeleteContest";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { getContest } from "../../common/service/Contest/GetContest";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { formatDate } from "../../common/components/ConverDate";
import TopStudent from "./TopStudent";
import TopTeacher from "./TopTeacher";
import { getUserGradeContestSubmissionByContestId } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByContest";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";


const ResultContest: React.FC = () => {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
    const user_gradee_contest_submissions: IUserGradeContestSubmissionState = useSelector((state: IStateType) => state.user_grade_contest_submissions);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = 3;
    const [popup1, setPopup1] = useState(false);

    const date_0 = new Date();
    const date = date_0.toUTCString()
    console.log(date)
    const date_now = formatDate(new Date(date)).substring(0,10) + "Z"+ formatDate(new Date(date)).substring(11,16);
    

    var id_x = localStorage.getItem('contest_id');
    let contest_id: number = 0;
    if (id_x !== null){
        contest_id = parseInt(id_x)
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
                    dispatch(getUserGradeContestSubmissionByContestId(contest_id))
                }
            }
            else {
                dispatch(getUserGradeContestSubmissionByContestId(contest_id))
            }
        }
    }, [dispatch])

    
    useEffect(() => {
        dispatch(clearSelectedContest());
        dispatch(updateCurrentPath("Cuộc thi", "danh sách"));
    }, [path.area, dispatch]);

    useEffect(() => {
        dispatch(getTeacher())
        dispatch(getContest())
        dispatch(getArtType())
        dispatch(getArtLevel())
        dispatch(getArtAge())
    }, [dispatch])

    function onContestSelectNotOnYetList(contest: IContest): void {
        dispatch(changeSelectedContest(contest));
        onContestRemove1()
        dispatch(setModificationState(ContestModificationStatus.None));
    }

    function onContestSelectOnList(contest: IContest): void {
        dispatch(changeSelectedContest(contest));
        dispatch(setModificationState(ContestModificationStatus.None));
    }

    function onContestSelectEndList(contest: IContest): void {
        dispatch(changeSelectedContest(contest));
        dispatch(setModificationState(ContestModificationStatus.None));
    }

    function onContestRemove1() {
        setPopup1(true);
    }

    const history = useHistory();

    const routeChange = () => {
        let path = `/contests/edit-contest`; 
        history.push(
            {
                pathname: path,
                state: {contest_value: null} // your data array of objects
            }
        );
    }


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Cuộc thi</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="SỐ BÀI NỘP" text={`${user_gradee_contest_submissions.userGradeContestSubmissions.length}`} icon="box" class="primary" />
                <TopCard title="GIÁO VIÊN CHẤM" text={`${numberItemsCount}`} icon="box" class="primary" />
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

      </div>

        </Fragment >
    );
};

export default ResultContest;
