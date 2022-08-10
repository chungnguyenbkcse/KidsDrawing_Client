import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCardLevel from "../../common/components/TopCardLevel";
import TopCard from "../../common/components/TopCardUser";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { changeSelectedTeacherRegisterQuatification, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import { IUser } from "../../store/models/user.interface";
import "./TeacherHome.css"
import TeacherRegisterQuantificationList from "./TeacherLevelList";

const TeacherHome: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = teacherRegisterQuantifications.teacherRegisterQuantifications.filter((ele) => ele.status === "Approved").length;
    const numberNotApprovedCount: number = teacherRegisterQuantifications.teacherRegisterQuantifications.filter((ele) => ele.status === "Not approved yet").length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    useEffect(() => {
        dispatch(clearSelectedTeacherRegisterQuatification());
        dispatch(getTeacherRegisterQuantificationByTeacherId(id))
        dispatch(getUserById(id))
        dispatch(getCourse())
    }, [path.area, dispatch]);

    let user: IUser = { id: 0, username: "", email: "", status: true, firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: [] };

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatification(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onTeacherRegisterQuantificationRemove() {
        if (teacherRegisterQuantifications.selectedTeacherRegisterQuantification) {
            setPopup(true);
        }
    }
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="TRÌNH ĐỘ CHƯA DUYỆT" text={`${numberNotApprovedCount}`} icon="book" class="danger" />
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
                    <h3 className=" mb-2" id="level-teacher">Trình độ đã duyệt</h3>
                    <TeacherRegisterQuantificationList
                        onSelect={onTeacherRegisterQuantificationSelect}
                    />
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Thông tin cá nhân</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <div className="row text-center text-center justify-content-center">
                                    <i className={`fas fa-user fa-10x`} id="icon-user"></i>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <h4 id="full-name">{users.teachers.length === 0 ? "" : (users.teachers[0].firstName + users.teachers[0].lastName)}</h4>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <p id="username-teacher">{users.teachers.length === 0 ? "" : users.teachers[0].username}</p>
                                </div>
                                <div className="row no-gutters">
                                    <i className={`fas fa-phone fa-2x`} id="icon-phone"></i>
                                    <p id="phone">{users.teachers.length === 0 ? "" : users.teachers[0].phone}</p>
                                </div>

                                <div className="row no-gutters">
                                    <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                    <p id="phone">{users.teachers.length === 0 ? "" : users.teachers[0].email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default TeacherHome;
