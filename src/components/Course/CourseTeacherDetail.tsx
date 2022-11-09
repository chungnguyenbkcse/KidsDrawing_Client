import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { useHistory } from "react-router-dom";
import "./CourseTeacherDetail.css"
import { postRegisterTeachSemester } from "../../common/service/UserTeachSemester/PostRegisterTeachSemester";
import { toast, ToastContainer } from "react-toastify";
import { GrLinkDown } from "react-icons/gr";

const CourseTeacherDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch]);

    const [checked, setChecked] = useState(false);

    function handleClick() {
        setChecked(!checked)
    }

    const history = useHistory();

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

    var id_n = localStorage.getItem('semester_class_id');
    var semester_class_id: number = 0;
    if (id_n !== null) {
        semester_class_id = parseInt(id_n);
    }

    var id_nx = localStorage.getItem('status');
    var status: string = '';
    if (id_nx !== null) {
        status = id_nx;
    }

    function handleRegister() {
        const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch(postRegisterTeachSemester({
            teacher_id: id,
            semester_classes_id: semester_class_id
        }, idx, routeHome))
        console.log({
            teacher_id: id,
            semester_classes_id: semester_class_id
        })
        
    }

    function routeHome() {
        let path = '/courses';
        history.push(path)
    }

    return (
        <Fragment>
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

                        </div>
                    </div>
                    {
                        function() {
                            if (status == "Not register") {
                                return (
                                    <div className="row text-center justify-content-center" id="btn-register-course">
                                        <button className="btn btn-success btn-green" id="btn-create-register-course" onClick={() => handleRegister()}>
                                            <i className="fas fa fa-plus"></i>
                                            Đăng kí ngay
                                        </button>
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

export default CourseTeacherDetail;
