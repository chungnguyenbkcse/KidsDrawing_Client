import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType, IUserState } from "../../store/models/root.interface";
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


const SemesterClassDetailStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const [checked, setChecked] = useState(false);

    var id_x = localStorage.getItem('id');
    var id: any = "";
    if (id_x !== null) {
        id = id_x;
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
                    localStorage.removeItem('role_privilege')
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
        dispatch(updateCurrentPath("Lớp", ""));
    }, [path.area, dispatch])

    function handleRegister() {
        dispatch(postUserRegisterJoinSemester({
            "student_id": id,
            "semester_classes_id": semester_class_id,
            "payer_id": users.teachers.length > 0 ? users.teachers[0].parents : 0,
            "price": price,
            "status": "Waiting"
        }))
        toast.success("Đăng kí thành công! Vui lòng đợi ba mẹ thanh toán...", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
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
                    <div className="card shadow mb-4" id="shadow-1">
                        <div className="row no-gutters align-items-center">
                            <div className="text-xs font-weight-bold text-green text-uppercase text-center">
                                <p className="fullname ml-2 mt-4 text-center">{semester_class_name}</p>
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
                        <div className="row" id="btn-register-course">
                            <div className="col-lg-12 col-md-12 col-xs-12 text-center justify-content-center">
                                <button className="btn btn-success btn-green" id="btn-create-register-course2" onClick={() => handleRegister()}>
                                    <GrLinkNext id="btn-payment" color="#ffffff" />
                                    Đăng kí ngay
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

export default SemesterClassDetailStudent;
