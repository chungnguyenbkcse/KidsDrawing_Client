import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getUserById } from "../../common/service/User/GetUserById";
import { changeSelectedDoinglClass, setModificationState } from "../../store/actions/class_teacher.action";
import { IClassTeacherState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { IClassTeacher, ClassTeacherModificationStatus } from "../../store/models/class_teacher.interface";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getClassTeacher } from "../../common/service/ClassTeacher/GetClassTeacher";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getSemester } from "../../common/service/semester/GetSemester";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import ClassEndList from "./ClassEndList";
import ClassDoingList from "./ClassDoingList";
import { getClassTeacher1 } from "../../common/service/ClassTeacher/GetClassTeacher1";

const ViewDetailTeacherForAdmin: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const class_teachers: IClassTeacherState = useSelector((state: IStateType) => state.class_teachers);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberClassDoingCount: number = class_teachers.class_doing.length;
    const numberClassDoneCount: number = class_teachers.class_done.length;
    var id_x = localStorage.getItem('teacher_id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
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
                    trackPromise(getClassTeacher1(dispatch, id))
                }
            }
            else {
                trackPromise(getClassTeacher1(dispatch,id))
            }
        }
    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [dispatch, path.area])

    function onClassTeacherSelect(class_teacher: IClassTeacher): void {
        dispatch(changeSelectedDoinglClass(class_teacher));
        dispatch(setModificationState(ClassTeacherModificationStatus.None));
    }

    const [checked, setChecked] = useState(true);
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
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách lớp</h6>
                                            </div>
                                            <div className="card-body">
                                                <ClassDoingList
                                                    onSelect={onClassTeacherSelect}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                    else {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách lớp</h6>
                                            </div>
                                            <div className="card-body">
                                                <ClassEndList
                                                    onSelect={onClassTeacherSelect}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    }
                }()
            }


        </Fragment>
    );
};

export default ViewDetailTeacherForAdmin;
