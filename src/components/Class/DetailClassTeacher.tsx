import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { getSectionByClass } from "../../common/service/Section/GetSectionByClass";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { clearSelectedTeacherRegisterQuatification } from "../../store/actions/teacher_register_quantification.action";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IRootPageStateType, ISectionState, IStateType, IUserState } from "../../store/models/root.interface";
import "./DetailClassTeacher.css"
import RequestOffSectionForm from "./RequestOffSectionForm";

const DetailClassTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = sections.sections.length;
    const numberNotApprovedNowCount: number = sections.sections.length;
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const { state } = useLocation<any>();
    
    let class_id = 1;
    if (state !== undefined && state !== null) {
        class_id = state.class_id;
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
                    dispatch(getSectionByClass(class_id))
                    dispatch(getUserById(id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getSectionByClass(class_id))
                dispatch(getUserById(id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp học", "Buổi học"));
    }, [path.area, dispatch]);

    const [popup1, setPopup1] = useState(false);

    function onAnonymousNotificationRemove() {
        setPopup1(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/class/exercise-student'; 
        history.push({
            pathname: path,
        });
    }

    const routeChange1 = () =>{ 
        let path = '/exercise'; 
        history.push({
            pathname: path
        });
    }

    const onChangeRoute = (section_id: number) => {
        let path = "/classes/section";
        history.push({
            pathname: path,
            state: { section_id: section_id}
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
                    <div className="table-responsive portlet">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                    {
                        sections.sections.sort((a,b) => a.number - b.number).map((ele, index) => {
                            return (
                                <tr className={`table-row`} key={`semester_course_${index}`}>
                                <div className="row row-section mb-4 ml-2 mr-2" onClick={() => {onChangeRoute(ele.id)}}>
                                    <div className="col-xl-4 col-md-4 mb-4">
                                        <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="Card image cap" />
                                    </div>
                                    <div className="col-xl-8 col-md-8 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Buổi {ele.number}</h3>
                                        <h4 className=" mb-2" id="level-teacher">{ele.name}</h4>
                                    </div>
                                </div>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
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
