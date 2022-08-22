import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getParent } from "../../common/service/Parent/GetParent";
import { getParentById } from "../../common/service/Parent/GetParentById";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./ManageStudent.css"

const ManageStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
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

    
    var id_z = localStorage.getItem('parent_id');
    var parent_id: number = 0;
    if (id_z !== null) {
        parent_id = parseInt(id_z);
    }
    var id_y = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_y !== null) {
        student_id = parseInt(id_y);
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
                    dispatch(getUserById(student_id))
                    dispatch(getParentById(parent_id))
                }
            }
            else {
                dispatch(clearSelectedTeacherRegisterQuatification());
                dispatch(getUserById(student_id))
                dispatch(getParentById(parent_id))
            }
        }
    }, [dispatch, access_token, refresh_token]);

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onTeacherRegisterQuantificationRemove() {
        if (teacherRegisterQuantifications.selectedTeacherRegisterQuantification) {
            setPopup(true);
        }
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
    
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="BÀI TẬP ĐÃ NỘP" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="BÀI TẬP CHƯA NỘP" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                <TopCard title="SỐ BUỔI NGHỈ" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Thông tin học sinh</h3>
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-center">
                                            <h4 id="full-name">Tên : {users.teachers.length > 0 ? users.teachers[0].username : ""}</h4>
                                        </div>
                                        <div className="row no-gutters justify-content-center">
                                            <p id="username-teacher">Giới tính: {users.teachers.length > 0 ? users.teachers[0].sex : ""}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <i className={`fas fa-phone fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Số điện thoại: {users.teachers.length > 0 ? users.teachers[0].phone : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Ngày sinh: {users.teachers.length > 0 ? users.teachers[0].dateOfBirth : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Email: {users.teachers.length > 0 ? users.teachers[0].email : ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Trình độ phụ huynh</h3>
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-center">
                                            <h4 id="full-name">Tên : {users.parents.length > 0 ? users.parents[0].username : ""}</h4>
                                        </div>
                                        <div className="row no-gutters justify-content-center">
                                            <p id="username-teacher">Giới tính: {users.parents.length > 0 ? users.parents[0].sex : ""}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <i className={`fas fa-phone fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Số điện thoại: {users.parents.length > 0 ? users.parents[0].phone : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-calendar fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Ngày sinh: {users.parents.length > 0 ? users.parents[0].dateOfBirth : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Email: {users.parents.length > 0 ? users.parents[0].email : ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Thống kê điểm</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <div className="row no-gutters">
                                    <ChartLine data={data} />
                                </div>
                                <div className="row justify-content-center">
                                    <button 
                                        className="btn btn-success btn-green" 
                                        id="btn-into-class-student"
                                        onClick={() => {routeChange()}}
                                    >
                                        Xem chi tiết
                                        <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default ManageStudent;
