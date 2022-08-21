import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./DetailClassTeacher.css"
import NotificationClassTeacher from "./NotificationClassTeacher";
import RequestOffSectionForm from "./RequestOffSectionForm";

const DetailClassTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = teacherRegisterQuantifications.approveds.length;
    const numberNotApprovedNowCount: number = teacherRegisterQuantifications.not_approved_now.length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    dispatch(clearSelectedTeacherRegisterQuatification());
                    dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                    dispatch(getUserById(id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getTeacherRegisterQuantificationByTeacherId(id))
                dispatch(getUserById(id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp học", "Buổi học"));
    }, [path.area, dispatch]);

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onTeacherRegisterQuantificationRemove() {
        if (teacherRegisterQuantifications.selectedTeacherRegisterQuantification) {
            setPopup(true);
        }
    }

    const [popup1, setPopup1] = useState(false);

    function onAnonymousNotificationRemove() {
        setPopup1(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [1, 2, 3, 4, 5, 6],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/class/exercise-student'; 
        history.push({
            pathname: path,
        });
    }

    const routeChange1 = () =>{ 
        let path = '/exercise/grade'; 
        history.push({
            pathname: path
        });
    }

    const onChangeRoute = () => {
        let path = "/classes/section";
        history.push({
            pathname: path
        })
    }
    
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="SỐ BUỔI ĐÃ DẠY" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="SỐ BÀI KIỂM TRA CHƯA CHẤM" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
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
                        Đăng kí nghỉ học
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
                                return <RequestOffSectionForm isCheck={onRemovePopup1} />
                            }
                        }()
                    }
                </>
            </Popup>
            <div className="row">
                <div className="col-xl-4 col-md-4 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Buổi học</h3>
                    <div className="row row-section mb-4 ml-2" onClick={onChangeRoute}>
                        <div className="col-xl-4 col-md-4 mb-4">
                            <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="Card image cap" />
                        </div>
                        <div className="col-xl-8 col-md-8 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Buổi 1</h3>
                            <h4 className=" mb-2" id="level-teacher">Giới thiệu</h4>
                        </div>
                    </div>

                    <div className="row row-section mb-4 ml-2">
                        <div className="col-xl-4 col-md-4 mb-4">
                            <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="Card image cap" />
                        </div>
                        <div className="col-xl-8 col-md-8 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Buổi 2</h3>
                            <h4 className=" mb-2" id="level-teacher">Giới thiệu</h4>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-4 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Bài kiểm tra cần chấm</h3>
                    <div className="row row-section mb-4 ml-2" onClick={routeChange1}>
                        <div className="col-xl-4 col-md-4 mb-4">
                            <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/exam1_clcq5z.png" alt="Card image cap" />
                        </div>
                        <div className="col-xl-8 col-md-8 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Bài tập 1</h3>
                            <h4 className=" mb-2" id="level-teacher">Vẽ con mèo</h4>
                        </div>
                    </div>

                    <div className="row row-section mb-4 ml-2">
                        <div className="col-xl-4 col-md-4 mb-4">
                            <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/exam1_clcq5z.png" alt="Card image cap" />
                        </div>
                        <div className="col-xl-8 col-md-8 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Bài tập 2</h3>
                            <h4 className=" mb-2" id="level-teacher">Vẽ con chó</h4>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-4 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Buổi nghỉ</h3>
                    <div className="row row-off-section mb-4 ml-2 mr-2">
                        <div className="col-xl-4 col-md-4 mb-4">
                            <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/timetable_dpbx2a.png" alt="Card image cap" />
                        </div>
                        <div className="col-xl-8 col-md-8 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Buổi 1</h3>
                            <h4 className=" mb-2" id="level-teacher">Đã duyệt</h4>
                        </div>
                    </div>

                    <div className="row row-off-section-2 mb-4 ml-2 mr-2">
                        <div className="col-xl-4 col-md-4 mb-4">
                            <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088283/timetable_dpbx2a.png" alt="Card image cap" />
                        </div>
                        <div className="col-xl-8 col-md-8 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Buổi 1</h3>
                            <h4 className=" mb-2" id="level-teacher">Chưa duyệt</h4>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default DetailClassTeacher;
