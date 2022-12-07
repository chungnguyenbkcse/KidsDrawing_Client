import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { clearSelectedTeacherRegisterQuatification } from "../../store/actions/teacher_register_quantification.action";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import "./ClassTeacherEndDetail.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import NotificationClassTeacher from "../Class/NotificationClassTeacher";
import StudentList from "../Class/StudentForTeacherList";
import { getInfoMyClassTeacher } from "../../common/service/MyClass/GetInforMyClassTeacher";
import StudentListEnd from "./StudentListEnd";

const ClassTeacherEndDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    console.log(teacherRegisterQuantifications)
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    dispatch(clearSelectedTeacherRegisterQuatification());       
                    trackPromise(getInfoMyClassTeacher(dispatch, class_id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());       
                trackPromise(getInfoMyClassTeacher(dispatch, class_id))
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

    /* const history = useHistory();
    const onRouteChange = () =>{ 
        let path = '/classes/detail-student'; 
        history.push({
            pathname: path,
            state: {class_id: class_id}
        });
    } */
    return (
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
            <ToastContainer />
            <div className="row">
                <TopCard title="SỐ HỌC SINH" text={`${numberStudentsCount}`} icon="book" class="danger" />
                <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
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
                                return <NotificationClassTeacher isCheck={onRemovePopup1} data={class_id}/>
                            }
                        }()
                    }
                </>
            </Popup>

            <div className="row">

                <div className="col-xl-12 col-md-12 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Danh sách học sinh</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <StudentListEnd />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default ClassTeacherEndDetail;