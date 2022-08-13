import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getUserById } from "../../common/service/User/GetUserById";
import { changeSelectedDoinglClass, clearSelectedDoinglClass, setModificationState } from "../../store/actions/class_teacher.action";
import { IClassTeacherState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { IClassTeacher, ClassTeacherModificationStatus } from "../../store/models/class_teacher.interface";
import { IUser } from "../../store/models/user.interface";
import "./ClassTeacher.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import ClassDoingList from "./ClassTeachingTeacherList";
import ClassDoneList from "./ClassDoneTeacherList";
import { getClassTeacher } from "../../common/service/ClassTeacher/GetClassTeacher";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";

const ClassTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const class_teachers: IClassTeacherState = useSelector((state: IStateType) => state.class_teachers);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberClassDoingCount: number = class_teachers.class_doing.length;
    const numberClassDoneCount: number = class_teachers.class_done.length;
    const [popup, setPopup] = useState(false);
    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
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
                    dispatch(clearSelectedDoinglClass());
                    dispatch(getUserById(id))
                    dispatch(getClassTeacher(id))
                }
            }
            else {
                dispatch(clearSelectedDoinglClass());
                dispatch(getUserById(id))
                dispatch(getClassTeacher(id))
            }
        }
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch]);

    let user: IUser = { id: 0, username: "", email: "", status: true, firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: [] };

    function onClassTeacherSelect(class_teacher: IClassTeacher): void {
        dispatch(changeSelectedDoinglClass(class_teacher));
        dispatch(setModificationState(ClassTeacherModificationStatus.None));
    }

    function onClassTeacherRemove() {
        if (class_teachers.selectedClassTeacher) {
            setPopup(true);
        }
    }

    const [checked, setChecked] = useState(true);
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="SỐ LỚP ĐANG DẠY" text={`${numberClassDoingCount}`} icon="book" class="primary" />
                <TopCard title="SỐ LỚP ĐÃ DẠY" text={`${numberClassDoneCount}`} icon="book" class="primary" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(ClassTeacherModificationStatus.Create))}>
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
                    }}>Đang dạy</h6>
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
                        }}>Đã dạy</h6>
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
                            <Fragment>
                                <div className="row">
                                    <ClassDoingList
                                        onSelect={onClassTeacherSelect}
                                    />


                                </div>

                            </Fragment>
                        )
                    }
                    else {
                        return (
                            <Fragment>
                                <div className="row">
                                    <ClassDoneList
                                        onSelect={onClassTeacherSelect}
                                    />
                                </div>

                            </Fragment>
                        )
                    }
                }()
            }


        </Fragment>
    );
};

export default ClassTeacher;