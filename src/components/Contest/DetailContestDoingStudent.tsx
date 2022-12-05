import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { IContestSubmissionTeacherState, ILessonState, IStateType } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getContestSubmissionByContestAndTeacher } from "../../common/service/ContestSubmission/GetContestSubmissonForTeacherAndContest";
import { GrLinkDown } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import Popup from "reactjs-popup";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import { setModificationState } from "../../store/actions/lesson.action";
import { deleteUserRegisterJoinContestByContestAndStudent } from "../../common/service/UserRegisterJoinSemester/DeleteUserRegisterJoinContestByContestAndStudent";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

const DetailContestDoingStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);

    const { promiseInProgress } = usePromiseTracker();


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
        contest_id = parseInt(id_y);;
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

    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked)
    }

    const [popup, setPopup] = useState(false);


    function onLessonRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    const history = useHistory();

    const routeChange = () => {
        let path = '/contests';
        history.push(path);
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
                    trackPromise(getContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
                }
            }
            else {
                trackPromise(getContestSubmissionByContestAndTeacher(dispatch, contest_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, contest_id, id]);


    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
            <ToastContainer />
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
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
                                            <p className="birthday ml-4">Thời gian đăng kí: {registration_time.replaceAll("T", " ").substring(0,16)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-md-6">
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs ">
                                            <p className="birthday">Thời gian bắt đầu: {start_time.replaceAll("T", " ").substring(0,16)}</p>
                                        </div>
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="text-xs">
                                            <p className="birthday">Thời gian kết thúc: {end_time.replaceAll("T", " ").substring(0,16)}</p>
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

                {
                    function () {
                        if (lessons.modificationState === LessonModificationStatus.Remove) {
                            return (
                                <Popup
                                open={popup}
                                onClose={() => setPopup(false)}
                                closeOnDocumentClick
                            >
                                <div className="popup-modal" id="popup-modal">
                                    <div className="popup-title">
                                        Bạn có chắc chắn muốn xóa?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                setPopup(false);
                                                const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                    position: toast.POSITION.TOP_CENTER
                                                });
                                                dispatch(deleteUserRegisterJoinContestByContestAndStudent(contest_id, id, idx, routeChange))
                                            }}>Remove
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                            )
                        }
                    }()
                }

                <div className="row" id="btn-register-course">
                    <div className="col-lg-6 col-md-6 col-xs-6 text-center justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-create-register-course4" onClick={() => handleClick()}>
                            <GrLinkDown id="btn-payment" color="#FFC0CB" />
                            Xem miêu tả
                        </button>
                    </div>

                    <div className="col-lg-6 col-md-6 col-xs-6 text-center justify-content-center">
                        <button className="btn btn-errorx" style={{backgroundColor: "#dc3545"}} onClick={() =>{
                            dispatch(setModificationState(LessonModificationStatus.Remove))
                            setPopup(true)
                        }}>
                            <AiFillDelete id="btn-payment" color="#000000" />
                            Hủy đăng ký
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

            </Fragment>
    );
};

export default DetailContestDoingStudent;
