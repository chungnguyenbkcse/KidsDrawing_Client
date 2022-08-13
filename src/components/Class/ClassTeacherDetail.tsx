import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IInformationClass } from "../../store/models/information_class.interface";
import { IInformationClassState, IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import { IUser } from "../../store/models/user.interface";
import "./ClassTeacherDetail.css"
import StudentList from "./StudentForTeacherList";

const ClassTeacherDetail: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const students: IUserState = useSelector((state: IStateType) => state.users);
    const information_classes: IInformationClassState = useSelector((state: IStateType) => state.information_classes);
    const numberStudentsCount: number = students.students.length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const { state } = useLocation<any>();

    useEffect(() => {
        dispatch(clearSelectedTeacherRegisterQuatification());
        dispatch(updateCurrentPath("Lớp", "Chi tiết"));
        dispatch(getInfoMyClass(state.class_id))
    }, [path.area, dispatch]);

    let user: IUser = { id: 0, username: "", email: "", status: true, firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: [] };

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
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
                <TopCard title="SỐ BUỔI ĐÃ DẠY" text={`${numberStudentsCount}`} icon="book" class="primary" />
                <TopCard title="SỐ HỌC SINH" text={`${numberStudentsCount}`} icon="book" class="danger" />
                <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Gửi thông báo
                    </button>
                </div>
            </div>
            <div className="row">

                <div className="col-xl-8 col-md-8 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Danh sách học sinh</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <StudentList />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-4 mb-4">
                    <div className="row justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-into-class" onClick={() =>
                        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                            Vào lớp
                            <i className="fas fa fa-arrow-right"></i>
                    </button>
                    </div>
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>
            </div>

        </Fragment>
    );
};

export default ClassTeacherDetail;
