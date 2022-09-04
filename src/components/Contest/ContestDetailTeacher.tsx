import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";
import { logout } from "../../store/actions/account.actions";
import { IContestSubmissionState, IStateType } from "../../store/models/root.interface";

const ContestDetailTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_submissions: IContestSubmissionState = useSelector((state: IStateType) => state.contest_submissions);
    const numberNotGradedCount: number = contest_submissions.contest_not_gradeds.length;
    const numberGradedCount: number = contest_submissions.contest_gradeds.length;


    var contest_description = localStorage.getItem('contest_description');
    var contest_description_: string = "";
    if (contest_description !== null) {
        contest_description_ = contest_description;
    }

    var contest_name = localStorage.getItem('contest_name');
    var contest_name_: string = "";
    if (contest_name !== null) {
        contest_name_ = contest_name;
    }

    var id_y = localStorage.getItem('contest_id');
    let contest_id = 0;

    if (id_y !== null) {
        contest_id = parseInt(id_y);
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
                    dispatch(getContestSubmissionByContest(contest_id))
                }
            }
            else {
                dispatch(getContestSubmissionByContest(contest_id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id]);

    

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/contest/grade'; 
        history.push({
            pathname: path
        });
    }

    const routeChange1 = () => {
        let path = '/contest/result-grade';
        history.push({
            pathname: path,
        });
    }
    
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="SỐ BÀI ĐÃ CHẤM" text={`${numberGradedCount}`} icon="book" class="primary" />
                <TopCard title="CHƯA CHẤM" text={`${numberNotGradedCount}`} icon="book" class="danger" />
            </div>
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Đề bài</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <p id="phone">{contest_name_}</p>
                                        </div>
                                        <div className="row no-gutters" dangerouslySetInnerHTML={{ __html: contest_description_ }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>

            {
                function () {
                    if (numberNotGradedCount === 0){
                        return (
                            <div className="row justify-content-center mb-4">
                                <button 
                                    className="btn btn-success btn-green" 
                                    id="btn-into-class-student"
                                    onClick={() => {routeChange1()}}
                                >
                                    Xem điểm
                                    <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                </button>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="row justify-content-center mb-4">
                                <button 
                                    className="btn btn-success btn-green" 
                                    id="btn-into-class-student"
                                    onClick={() => {routeChange()}}
                                >
                                    Chấm bài
                                    <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                </button>
                            </div>
                        )
                    }
                }()
            }

        </Fragment>
    );
};

export default ContestDetailTeacher;
