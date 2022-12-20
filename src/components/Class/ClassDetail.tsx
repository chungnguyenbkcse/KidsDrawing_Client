import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { IAnonymousNotificationState, IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, ITimeScheduleState, IUserState } from "../../store/models/root.interface";
import "./ClassTeacher.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import StudentForTeacherLists from "./StudentForTeacherLists";
import ScheduleForClassList from "./ScheduleForClassList";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import Popup from "reactjs-popup";
import NotificationClassTeacher from "./NotificationClassTeacher";
import { ToastContainer } from "react-toastify";

const ClassDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    console.log(teacherRegisterQuantifications)
    const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const students: IUserState = useSelector((state: IStateType) => state.users);
    const numberStudentsCount: number = students.students.length;
    var id_x = localStorage.getItem('class_id');
    let class_id: number = 0;
    if (id_x !== null) {
        class_id = parseInt(id_x);
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
                    trackPromise(getInfoMyClass(dispatch, class_id))
                }
            }
            else {
                trackPromise(getInfoMyClass(dispatch, class_id))
            }
        }
    }, [dispatch, class_id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp", "Chi tiết"));
    }, [dispatch, path.area])


    const [popup1, setPopup1] = useState(false);

    function onAnonymousNotificationRemove() {
        setPopup1(true);
    }


    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    const [checked, setChecked] = useState(true);
    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

                <ToastContainer />
                <div className="row">
                    <TopCard title="SỐ BUỔI" text={`${time_schedules.timeSchedules.length}`} icon="book" class="primary" />


                    <TopCard title="SỐ HỌC SINH" text={`${numberStudentsCount}`} icon="book" class="danger" />
                    {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(ClassTeacherModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}

                    <div className="col-xl-3 col-md-3 notification-x">
                        <button
                            className="btn btn-success btn-green"
                            id="btn-create-teacher-level"
                            onClick={() => {
                                dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Create))
                                onAnonymousNotificationRemove()
                            }}
                        >
                            <i className="fas fa fa-plus"></i>
                            Gửi thông báo
                        </button>
                    </div>
                </div>

                <Popup
                    open={popup1}
                    onClose={() => setPopup1(false)}
                    closeOnDocumentClick
                >
                    <>
                        {
                            function () {
                                if ((anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Create)) {
                                    return <NotificationClassTeacher isCheck={onRemovePopup1} data={class_id} />
                                }
                            }()
                        }
                    </>
                </Popup>


                <div className="row">
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked === false) {
                                setChecked(true)
                            }
                        }} style={{
                            color: checked ? "#F24E1E" : "#2F4F4F"
                        }}>Học sinh</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked === true) {
                                setChecked(false)
                            }
                        }}
                            style={{
                                color: checked ? "#2F4F4F" : "#F24E1E"
                            }}>Thời khóa biểu</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#ffffff" : "#F24E1E"
                        }}></div>
                    </div>
                </div>


                {
                    function () {
                        if (checked === true) {
                            return (
                                <Fragment>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4" id="topcard-user">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách lớp</h6>
                                                </div>
                                                <div className="card-body">
                                                    <StudentForTeacherLists />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                        else {
                            return (
                                <Fragment>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4" id="topcard-user">
                                                <div className="card-header py-3">
                                                    <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách lớp</h6>
                                                </div>
                                                <div className="card-body">
                                                    <ScheduleForClassList />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                    }()
                }


            </Fragment>
    );
};

export default ClassDetail;
