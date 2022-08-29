import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { getExerciseSubmissionByClass } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByClass";
import { getSectionByClass } from "../../common/service/Section/GetSectionByClass";
import { getTeacherLeaveByTeacher } from "../../common/service/TeacherLeave/GetTeacherLeaveByTeacher";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { clearSelectedTeacherRegisterQuatification } from "../../store/actions/teacher_register_quantification.action";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IExerciseSubmissionState, IRootPageStateType, ISectionState, IStateType, ITeacherLeaveState } from "../../store/models/root.interface";
import "./DetailClassTeacher.css"
import RequestOffSectionForm from "./RequestOffSectionForm";

const DetailClassTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);
    console.log(exercise_submissions)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = sections.sections.length;
    const numberNotApprovedNowCount: number = exercise_submissions.exercise_not_gradeds.length;
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('class_id');
    
    let class_id = 1;

    if (id_y !== null) {
        class_id = parseInt(id_y);
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
                    dispatch(getTeacher())
                    dispatch(getExerciseSubmissionByClass(class_id))
                    dispatch(getTeacherLeaveByTeacher(id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getSectionByClass(class_id))
                dispatch(getUserById(id))
                dispatch(getTeacher())
                dispatch(getExerciseSubmissionByClass(class_id))
                dispatch(getTeacherLeaveByTeacher(id))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id, id]);

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

    const routeChange1 = () =>{ 
        let path = '/exercise'; 
        history.push({
            pathname: path
        });
    }

    const onChangeRoute = (section_id: number) => {
        let path = "/classes/section";
        localStorage.removeItem("section_id");
        localStorage.setItem("section_id", section_id.toString())
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
                        Đăng kí nghỉ dạy
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
                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                <div className="row row-section mb-4 ml-2 mr-2" onClick={() => {onChangeRoute(ele.id)}}>
                                    <div className="col-xl-4 col-md-4 mb-4">
                                        <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt=""/>
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
                    <div className="table-responsive portlet">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                            {
                        exercise_submissions.exercise_not_gradeds.map((ele, index) => {
                            return (
                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                <div className="row row-section mb-4 ml-2 mr-2" onClick={() => {routeChange1()}}>
                                    <div className="col-xl-4 col-md-4 mb-4">
                                        <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt=""/>
                                    </div>
                                    <div className="col-xl-8 col-md-8 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">{ele.exercise_name}</h3>
                                        <h3 className=" mb-2" id="level-teacher">Học sinh: {ele.student_name}</h3>
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
                    <h3 className=" mb-2" id="level-teacher">Yêu cầu nghỉ dạy</h3>
                    <div className="table-responsive portlet">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                            {
                        teacher_leaves.leaves.map((ele, index) => {
                            return (
                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                <div className="row row-section mb-4 ml-2 mr-2" onClick={() => {routeChange1()}}>
                                    <div className="col-xl-4 col-md-4 mb-4">
                                        <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt=""/>
                                    </div>
                                    <div className="col-xl-8 col-md-8 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">{ele.section_name}</h3>
                                        <h4 className=" mb-2" id="level-teacher">Chưa duyệt</h4>
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
            </div>

        </Fragment>
    );
};

export default DetailClassTeacher;
