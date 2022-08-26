import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { ICourseTeacherState, IRootPageStateType, IStateType, IStudentLeaveState, ITeacherLeaveState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./RequestTeacher.css"
import { getCourseTeacher } from "../../common/service/CourseTeacher/GetCourseTeacherByTeacher";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import ExerciseSectionList from "../ManageStudent/ExerciseSectionList";
import StudentLeaveList from "./StudentLeaveList";
import TeacherLeaveList from "./TeacherLeaveList";
import { getStudentLeave } from "../../common/service/StudentLeave/GetStudentLeaveByClass";

const RequestTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
    console.log(student_leaves)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberTeacherRegisterSuccessfullCount: number = student_leaves.leaves.length;
    const numberTeacherNotRegisterCount: number = teacher_leaves.leaves.length;
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_y !== null) {
        class_id = parseInt(id_y);
    }
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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    dispatch(getStudentLeave(class_id))
                }
            }
            else {
                dispatch(getStudentLeave(class_id))
            }
        }
        dispatch(clearSelectedTeacherRegisterQuatification());
        dispatch(updateCurrentPath("Lớp theo kì", ""));
    }, [path.area, dispatch]);

    
    const [checked, setChecked] = useState(true);
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="SỐ YÊU CẦU NGHỈ HỌC" text={`${numberTeacherRegisterSuccessfullCount}`} icon="book" class="primary" />
                <TopCard title="SỐ YÊU CẦU DẠY THAY" text={`${numberTeacherNotRegisterCount}`} icon="book" class="primary" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" />
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked === false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Học sinh yêu cầu nghỉ học</h6>
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
                        }}>Giáo viên yêu cầu dạy thay</h6>
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
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4" id="topcard-user">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách yêu cầu nghỉ học</h6>
                                        </div>
                                        <div className="card-body">
                                            <StudentLeaveList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4" id="topcard-user">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách yêu cầu dạy thay</h6>
                                        </div>
                                        <div className="card-body">
                                            <TeacherLeaveList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }()
            }


        </Fragment>
    );
};

export default RequestTeacher;
