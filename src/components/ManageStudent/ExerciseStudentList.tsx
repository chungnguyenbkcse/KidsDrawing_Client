import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import ExerciseSectionList from "./ExerciseSectionList";
import "./ManageStudent.css"

const ExerciseStudentList: React.FC = () => {
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

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="row">
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
                    <div> 

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4" id="topcard-user">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài kiểm tra buổi 1</h6>
                        </div>
                        <div className="card-body">
                            <ExerciseSectionList />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default ExerciseStudentList;
