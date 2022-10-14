import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, IUserState } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory } from "react-router-dom";
import "./SemesterClassDetail.css"
import { IUser } from "../../store/models/user.interface";
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

type Option1 = {
    label: string;
    value: string;
}

const SemesterClassDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const users: IUserState = useSelector((state: IStateType) => state.users);
    const listTeacher: IUser[] = users.students
    const listTeachers: Option1[] = [];
    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked)
    }

    listTeacher.map((ele) => {
        let item: Option1 = { "label": ele.username, "value": ele.id }
        return listTeachers.push(item)
    })

    var id_x = localStorage.getItem('id');
    var id: string = "";
    if (id_x !== null) {
        id = id_x;
    }

    var id_a = localStorage.getItem('description_course');
    var description_course: string = '';
    if (id_a !== null) {
        description_course = id_a;
    }

    var id_b = localStorage.getItem('course_id');
    var course_id: string = '';
    if (id_b !== null) {
        course_id = id_b;
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
    var semester_class_id: string = '';
    if (id_n !== null) {
        semester_class_id = id_n;
    }

    var id_nx = localStorage.getItem('url_image');
    var url_image: string = '';
    if (id_nx !== null) {
        url_image = id_nx;
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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getSemesterClassNew(dispatch))
                    trackPromise(getStudentByParent(dispatch, id))
                }
            }
            else {
                trackPromise(getSemesterClassNew(dispatch))
                trackPromise(getStudentByParent(dispatch, id))
            }
        }
        
    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp", ""));
    }, [path.area, dispatch])

    function handleRegister() {
        valueTeacher.map((ele, idx) => {
            dispatch(postUserRegisterJoinSemester({
                "student_id": ele.value,
                "semester_classes_id": semester_class_id,
                "payer_id": id,
                "price": price,
                "status": "Waiting"
            }))
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

        toast.success("Thêm giỏ hàng thành công...", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }

    const history = useHistory();
    function handleRegister1() {
        valueTeacher.map((ele, idx) => {
            dispatch(postUserRegisterJoinSemester({
                "student_id": ele.value,
                "semester_classes_id": semester_class_id,
                "payer_id": id,
                "price": price,
                "status": "Waiting"
            }))
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

    const [valueTeacher, setValueTeacher] = useState<any[]>([])

    console.log(valueTeacher)

    function changeValueTeacher(value: any) {
        setValueTeacher(value)
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
                <ToastContainer />
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4 shadow-1">
                        <div className="row no-gutters align-items-center">
                            <div className="text-xs font-weight-bold text-green text-uppercase ">
                                <p className="fullname ml-2 mt-4">{semester_class_name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-md-6">
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs ">
                                        <p className="birthday ml-2">Khóa học: {course_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-2">Thể loại: {art_type_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-2">Độ tuổi: {art_age_name}</p>
                                    </div>
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="text-xs">
                                        <p className="birthday ml-2">Trình độ: {art_level_name}</p>
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
                        <div className="row">
                            <div className="form-group col-md-6 ml-2">
                                <label>Bé</label>
                                <ReactSelect setValue={listTeachers} value={[]} changeValue={changeValueTeacher} />
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

export default SemesterClassDetail;
