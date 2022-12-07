import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, IUserState, ILessonState } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import "./SemesterClassDetail.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { logout } from "../../store/actions/account.actions";
import { getSemesterClassNew } from "../../common/service/SemesterClass/GetSemesterNew";
import jwt_decode from "jwt-decode";
import { GrLinkDown, GrLinkNext } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import { postUserRegisterJoinSemester } from "../../common/service/UserRegisterJoinSemester/PostUserRegisterJoinSemester";
import { getUserById } from "../../common/service/User/GetUserById";
import { useHistory } from "react-router-dom";
import { deleteUserRegisterJoinSemesterBySemesterClassAndStudent } from "../../common/service/UserRegisterJoinSemester/DeleteUserRegisterJoinSemesterBySemesterClassAndStudent";
import { setModificationState } from "../../store/actions/lesson.action";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import Popup from "reactjs-popup";
import { BsFillTrashFill } from "react-icons/bs";


const SemesterClassDetailStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const users: IUserState = useSelector((state: IStateType) => state.users);

    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    
    const [checked, setChecked] = useState(false);

    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_a = localStorage.getItem('description_course');
    var description_course: string = '';
    if (id_a !== null) {
        description_course = id_a;
    }

    var id_b = localStorage.getItem('course_id');
    var course_id: number = 0;
    if (id_b !== null) {
        course_id = parseInt(id_b);
    }

    var id_c = localStorage.getItem('course_name');
    var course_name: string = '';
    if (id_c !== null) {
        course_name = id_c;
    }

    var id_d = localStorage.getItem('art_age_name');
    var art_age_name: string = '';
    if (id_d !== null) {
        art_age_name = id_d;
    }

    var id_e = localStorage.getItem('art_type_name');
    var art_type_name: string = '';
    if (id_e !== null) {
        art_type_name = id_e;
    }

    var id_f = localStorage.getItem('num_of_section');
    var num_of_section: string = '';
    if (id_f !== null) {
        num_of_section = id_f;
    }

    var id_h = localStorage.getItem('schedule');
    var schedule: string = '';
    if (id_h !== null) {
        schedule = id_h;
    }

    var id_k = localStorage.getItem('art_level_name');
    var art_level_name: string = '';
    if (id_k !== null) {
        art_level_name = id_k;
    }

    var id_l = localStorage.getItem('semester_class_name');
    var semester_class_name: string = '';
    if (id_l !== null) {
        semester_class_name = id_l;
    }

    var id_m = localStorage.getItem('price');
    var price: string = '';
    if (id_m !== null) {
        price = id_m;
    }

    var id_n = localStorage.getItem('semester_class_id');
    var semester_class_id: number = 0;
    if (id_n !== null) {
        semester_class_id = parseInt(id_n);
    }

    var id_j = localStorage.getItem('status');
    var status = "";
    if (id_j !== null) {
        status = id_j;
    }

    const [popup, setPopup] = useState(false);

    function onLessonRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    function handleClick() {
        setChecked(!checked)
    }


    console.log(course_id)
    console.log(semester_class_id)

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
                    trackPromise(getSemesterClassNew(dispatch))
                    trackPromise(getUserById(dispatch, id))
                }
            }
            else {
                trackPromise(getSemesterClassNew(dispatch))
                trackPromise(getUserById(dispatch, id))
            }
        }
    }, [dispatch, id, access_token, refresh_token]);


    useEffect(() => {
        dispatch(updateCurrentPath("Lớp theo kì", ""));
    }, [path.area, dispatch])

    function handleRegister() {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch(postUserRegisterJoinSemester({
            "student_id": id,
            "semester_classes_id": semester_class_id,
            "payer_id": users.teachers.length > 0 ? users.teachers[0].parents : 0,
            "price": price,
            "status": "Waiting"
        }, idx, routeHome))
    }

    function handleRemove() {
        dispatch(setModificationState(LessonModificationStatus.Remove))
        setPopup(true)
    }

    const history = useHistory();
    function routeHome() {
        let path = '/discover/course';
        history.push(path)
    }

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                <ToastContainer />
                {
                    function () {
                        if ((lessons.modificationState === LessonModificationStatus.Remove)) {
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
                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                        position: toast.POSITION.TOP_CENTER
                                                    });
                                                    dispatch(deleteUserRegisterJoinSemesterBySemesterClassAndStudent(semester_class_id, id, idx, routeHome))
                                                    setPopup(false);
                                                }}>Remove
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            )
                        }
                    }()
                }
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4" id="shadow-1">
                        <div className="row no-gutters align-items-center">
                            <div className="text-xs font-weight-bold text-green text-uppercase text-center">
                                <p className="fullname ml-4 mt-4 text-center">{semester_class_name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-md-6">
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs ">
                                        <p className="birthday ml-4">Khóa học: {course_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-4">Thể loại: {art_type_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-4">Độ tuổi: {art_age_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-4">Trình độ: {art_level_name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-md-6">
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs mr-2">
                                        <p className="birthday">Lịch học: {schedule}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday">Số buổi học: {num_of_section}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday">Giá: {price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            function () {
                                if (status === "Not register") {
                                    return (
                                        <div className="row" id="btn-register-course">
                                            <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                                                <button className="btn btn-success btn-green" id="btn-create-register-course2" onClick={() => handleRegister()}>
                                                    <GrLinkNext id="btn-payment" color="#ffffff" />
                                                    Đăng kí ngay
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                                else if (status === "Unpaid") {
                                    return (
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                                                <button className="btn btn-danger" id="btn-create-register-coursexx" onClick={() => handleRemove()}>
                                                    <BsFillTrashFill id="btn-payment" color="#ffffff" />
                                                    Hủy kí ngay
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            }()
                        }
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
                                        <div className="card-body" dangerouslySetInnerHTML={{ __html: description_course }}>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }

            </Fragment >
    );
};

export default SemesterClassDetailStudent;
