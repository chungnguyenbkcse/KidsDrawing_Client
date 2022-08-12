import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { changeSelectedTeacherRegisterQuatificationApproved, clearSelectedTeacherRegisterQuatification, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import { IUser } from "../../store/models/user.interface";
import "./TeacherLevel.css"
import TeacherLevelForm from "./TeacherLevelForm";
import TeacherLevelList from "./TeacherLevelList";
import TeacherLevelNotApprovedNowList from "./TeacherLevelNotApprovedNowList";

const TeacherLevel: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberApprovedCount: number = teacherRegisterQuantifications.approveds.length;
    const numberNotApprovedNowCount: number = teacherRegisterQuantifications.not_approved_now.length;
    const numberNotApprovedCount: number = teacherRegisterQuantifications.not_approves.length;
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
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    function onTeacherRegisterQuantificationRemove() {
        if (teacherRegisterQuantifications.selectedTeacherRegisterQuantification) {
            setPopup(true);
        }
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    function onTeacherLevelRemove() {
        setPopup(true);
    }

    useEffect(() => {
        if (teacherRegisterQuantifications.modificationState === TeacherRegisterQuantificationModificationStatus.Edit){
            setPopup(true)
        }
    }, [teacherRegisterQuantifications.modificationState, popup])

    console.log(teacherRegisterQuantifications.modificationState)
    console.log(popup)

    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="TRÌNH ĐỘ CHƯA DUYỆT" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                <TopCard title="TRÌNH ĐỘ KHÔNG ĐƯỢC DUYỆT" text={`${numberNotApprovedCount}`} icon="book" class="danger" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12 mb-4">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() => 
                        {
                            dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))
                            onTeacherLevelRemove()
                        }}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Trình độ đã duyệt</h3>
                    <TeacherLevelList
                        onSelect={onTeacherRegisterQuantificationSelect}
                    />
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Trình độ chưa được duyệt</h3>
                    <TeacherLevelNotApprovedNowList
                        onSelect={onTeacherRegisterQuantificationSelect}
                    />
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>
            </div>

            <Popup
                open={popup}
                onClose={() => {
                    setPopup(false)
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None))
                }}
                closeOnDocumentClick
            >
                <>
                    {
                        function () {
                            if ((teacherRegisterQuantifications.modificationState === TeacherRegisterQuantificationModificationStatus.Create) || ( teacherRegisterQuantifications.modificationState === TeacherRegisterQuantificationModificationStatus.Edit)) {
                                return <TeacherLevelForm isCheck={onRemovePopup}/>
                            }
                        }()
                    }
                </>
            </Popup>

        </Fragment>
    );
};

export default TeacherLevel;
