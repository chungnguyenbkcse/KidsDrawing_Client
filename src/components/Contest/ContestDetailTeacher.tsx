import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { IContestSubmissionTeacherState, IStateType } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getContestSubmissionByContestAndTeacher } from "../../common/service/ContestSubmission/GetContestSubmissonForTeacherAndContest";
import { GrLinkDown } from "react-icons/gr";

const ContestDetailTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contest_submissions: IContestSubmissionTeacherState = useSelector((state: IStateType) => state.contest_submission_teacher);
    const numberNotGradedCount: number = contest_submissions.contest_submission_not_grade.length;
    const numberGradedCount: number = contest_submissions.contest_submission_grade.length;


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

    var id_x = localStorage.getItem('id');
    let id = 0;

    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_z = localStorage.getItem('max_participant');
    let max_participant = 0;

    if (id_z !== null) {
        max_participant = parseInt(id_z);
    }

    var id_t = localStorage.getItem('art_type_contest');
    let art_type_contest: string = "";

    if (id_t !== null) {
        art_type_contest = id_t;
    }

    var id_h = localStorage.getItem('art_age_contest');
    let art_age_contest: string = "";

    if (id_h !== null) {
        art_age_contest = id_h;
    }

    var id_k = localStorage.getItem('registration_time');
    let registration_time: string = "";

    if (id_k !== null) {
        registration_time = id_k;
    }

    var id_l = localStorage.getItem('start_time');
    let start_time: string = "";

    if (id_l !== null) {
        start_time = id_l;
    }

    var id_m = localStorage.getItem('end_time');
    let end_time: string = "";

    if (id_m !== null) {
        end_time = id_m;
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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
                }
            }
            else {
                trackPromise(getContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id, id]);



    const history = useHistory();
    const routeChange = () => {
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

    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked)
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
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

                <div className="row">
                    <TopCard title="SỐ BÀI ĐÃ CHẤM" text={`${numberGradedCount}`} icon="book" class="primary" />
                    <TopCard title="CHƯA CHẤM" text={`${numberNotGradedCount}`} icon="book" class="danger" />
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            <div className="row no-gutters align-items-center">
                                <div className="text-xs font-weight-bold text-green text-uppercase ">
                                    <p className="fullname ml-4 mt-4">{contest_name}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-md-6">
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs ">
                                            <p className="birthday ml-4">Độ tuổi đăng kí: {art_age_contest}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday ml-4">Thể loại: {art_type_contest}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday ml-4">Thời gian đăng kí: {registration_time.replaceAll("T", " ")}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-md-6">
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs ">
                                            <p className="birthday">Thời gian bắt đầu: {start_time.replaceAll("T", " ")}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday">Thời gian kết thúc: {end_time.replaceAll("T", " ")}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday">Số người tham gia tối đa: {max_participant}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="row" id="btn-register-course">
                    <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-create-register-course4" onClick={() => handleClick()}>
                            <GrLinkDown id="btn-payment" color="#ffffff" />
                            Xem miêu tả
                        </button>
                    </div>
                </div>
                {
                    function () {
                        if (checked === true) {
                            return (
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-green">Chi tiết</h6>
                                    </div>
                                    <div className="card shadow mb-4">
                                        <div className="card-body" dangerouslySetInnerHTML={{ __html: contest_description_ }}>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }

                {
                    function () {
                        if (numberNotGradedCount === 0) {
                            return (
                                <div className="row justify-content-center mb-4">
                                    <button
                                        className="btn btn-success btn-green"
                                        id="btn-into-class-student"
                                        onClick={() => { routeChange1() }}
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
                                        onClick={() => { routeChange() }}
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
