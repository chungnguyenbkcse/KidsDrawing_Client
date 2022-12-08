import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, IUserState, ILessonState } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory } from "react-router-dom";
import "./SemesterClassDetail.css"
import { setModificationState } from "../../store/actions/lesson.action";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import ReactSelect from "../../common/components/ReactSelect";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { logout } from "../../store/actions/account.actions";
import { getSemesterClassNew } from "../../common/service/SemesterClass/GetSemesterNew";
import { getStudentByParent } from "../../common/service/Student/GetStudentByParent";
import jwt_decode from "jwt-decode";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrLinkDown, GrLinkNext } from "react-icons/gr";
import { addCart } from "../../store/actions/cart.action";
import { toast, ToastContainer } from "react-toastify";
import { postUserRegisterJoinSemester } from "../../common/service/UserRegisterJoinSemester/PostUserRegisterJoinSemester";
import { postUserRegisterJoinSemester1 } from "../../common/service/UserRegisterJoinSemester/postUserRegisterJoinSemester1";
import { IUser } from "../../store/models/user.interface";
import Popup from "reactjs-popup";
import { deleteUserRegisterJoinSemesterBySemesterClassAndStudent } from "../../common/service/UserRegisterJoinSemester/DeleteUserRegisterJoinSemesterBySemesterClassAndStudent";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteUserRegisterJoinSemesterBySemesterClassAndStudent1 } from "../../common/service/UserRegisterJoinSemester/DeleteUserRegisterJoinSemesterBySemesterClassAndStudent1";

type Option1 = {
    label: string;
    value: string;
}

const SemesterClassDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    const users: IUserState = useSelector((state: IStateType) => state.users);

    const [checked, setChecked] = useState(false);
    const [popup, setPopup] = useState(false);

    function handleClick() {
        setChecked(!checked)
    }

    const listTeacher: IUser[] = users.students

    const [valueTeacher, setValueTeacher] = useState<any[]>([])

    function changeValueTeacher(value: any) {
        setValueTeacher(value)
    }

    const [valueTeacher1, setValueTeacher1] = useState<any[]>([])

    function changeValueTeacher1(value: any) {
        setValueTeacher1(value)
    }

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

    var id_nx = localStorage.getItem('url_image');
    var url_image: string = '';
    if (id_nx !== null) {
        url_image = id_nx;
    }

    var id_ix = localStorage.getItem('student_ids');
    let student_ids: number[] = [];
    if (id_ix !== null) {
        student_ids = JSON.parse(id_ix);
    }

    var id_iy = localStorage.getItem('student_names');
    let student_names: string[] = [];
    if (id_iy !== null) {
        student_names = JSON.parse(id_iy);
    }

    var listTeachers1: Option1[] = [];
    var listTeachers2: Option1[] = [];
    listTeacher.map((ele) => {
        if (student_ids.includes(ele.id)) {
            let item: Option1 = { "label": ele.username, "value": ele.id }
            return listTeachers2.push(item)
        }
        else {
            let item: Option1 = { "label": ele.username, "value": ele.id }
            return listTeachers1.push(item)
        }
    })

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
                    trackPromise(getStudentByParent(dispatch, id))
                }
            }
            else {
                trackPromise(getStudentByParent(dispatch, id))
            }
        }

    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp", ""));
    }, [path.area, dispatch])

    function handleRegister() {
        if (valueTeacher.length === 0) {
            toast.error("Vui lòng chọn ít nhất một bé!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
        }
        else {
            const idxx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });

            valueTeacher.map((ele, idx) => {
                if (idx !== valueTeacher.length - 1) {
                    dispatch(postUserRegisterJoinSemester1({
                        "student_id": ele.value,
                        "semester_classes_id": semester_class_id,
                        "register_by_type": "ADMIN",
                        "price": price,
                        "status": "Waiting"
                    }, idxx))
                }
                else {
                    dispatch(postUserRegisterJoinSemester({
                        "student_id": ele.value,
                        "semester_classes_id": semester_class_id,
                        "payer_id": id,
                        "price": price,
                        "status": "Waiting"
                    }, idxx, routeHome))
                }
                return dispatch(addCart({
                    id: semester_class_id,
                    name: semester_class_name,
                    image: url_image,
                    student_id: ele.value,
                    student_name: ele.label,
                    quantity: 1,
                    price: parseInt(price)
                }))
            })
        }
    }

    function handleRemove() {
        if (valueTeacher1.length === 0) {
            toast.error("Vui lòng chọn ít nhất một bé!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
        }
        else {
            dispatch(setModificationState(LessonModificationStatus.Remove))
            setPopup(true)
        }
    }

    const history = useHistory();
    function handleRegister1() {
        if (valueTeacher.length === 0) {
            toast.error("Vui lòng chọn ít nhất một bé!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
        }
        else {
            const idxx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                position: toast.POSITION.TOP_CENTER
            });

            valueTeacher.map((ele, idx) => {
                if (idx !== valueTeacher.length - 1) {
                    dispatch(postUserRegisterJoinSemester1({
                        "student_id": ele.value,
                        "semester_classes_id": semester_class_id,
                        "payer_id": id,
                        "price": price,
                        "status": "Waiting"
                    }, idxx))
                }
                else {
                    dispatch(postUserRegisterJoinSemester({
                        "student_id": ele.value,
                        "semester_classes_id": semester_class_id,
                        "payer_id": id,
                        "price": price,
                        "status": "Waiting"
                    }, idxx, routeHome))
                }
                return dispatch(addCart({
                    id: semester_class_id,
                    name: semester_class_name,
                    image: url_image,
                    student_id: ele.value,
                    student_name: ele.label,
                    quantity: 1,
                    price: parseInt(price)
                }))
            })
            let path = '/cart';
            history.push({
                pathname: path
            });
        }
    }

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
                                                    setPopup(false);
                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                        position: toast.POSITION.TOP_CENTER
                                                    });
                                                    valueTeacher1.map((ele, idx) => {
                                                        if (idx === valueTeacher1.length - 1) {
                                                            dispatch(deleteUserRegisterJoinSemesterBySemesterClassAndStudent(semester_class_id, ele.value, idx, routeHome))
                                                        }
                                                        else {
                                                            dispatch(deleteUserRegisterJoinSemesterBySemesterClassAndStudent1(semester_class_id, ele.value))
                                                        }
                                                    })
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
                    <div className="card shadow mb-4 shadow-1 card-semester-class-detail">
                        <div className="row no-gutters align-items-center">
                            <div className="text-xs font-weight-bold text-green text-uppercase ">
                                <p className="fullname ml-4 mt-4">{semester_class_name}</p>
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
                                if (student_ids.length < users.students.length) {
                                    return (
                                        <>
                                            <div className="row">
                                                <div className="form-group col-md-6 ml-4">
                                                    <label>Bé</label>
                                                    <ReactSelect setValue={listTeachers1} value={[]} changeValue={changeValueTeacher} />
                                                </div>
                                            </div>
                                            <div className="row" id="btn-register-course">
                                                <div className="col-lg-6 col-md-6 col-xs-6 text-center justify-content-center">
                                                    <button className="btn btn-success btn-green" id="btn-create-register-course1" onClick={() => handleRegister()}>
                                                        <AiOutlineShoppingCart />
                                                        Thêm vào giỏ hàng
                                                    </button>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-xs-6 text-center justify-content-center">
                                                    <button className="btn btn-success btn-green" id="btn-create-register-course2" onClick={() => handleRegister1()}>
                                                        <GrLinkNext id="btn-payment" color="#ffffff" />
                                                        Thanh toán ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            }()
                        }
                        <div className="row">
                    {
                        function () {
                            if (student_ids.length > 0) {
                                return (
                                    <>
                                        <div className="col-lg-6 col-md-6 col-xs-6 pl-4">
                                            <div className="form-group pl-4">
                                                <label>Chọn học sinh</label>
                                                <ReactSelect setValue={listTeachers2} value={[]} changeValue={changeValueTeacher1} />
                                            </div>
                                            <div className="text-center justify-content-center">
                                                <button className="btn btn-danger" id="btn-create-register-coursexx" onClick={() => handleRemove()}>
                                                    <BsFillTrashFill id="btn-payment" color="#ffffff" />
                                                    Hủy kí ngay
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        }()
                    }
                    <div className="col-lg-6 col-md-6 col-xs-6 text-center justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-create-register-course4" onClick={() => handleClick()}>
                            <GrLinkDown id="btn-payment" color="#ffffff" />
                            Xem miêu tả
                        </button>
                    </div>
                                        
                </div>
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

export default SemesterClassDetail;
