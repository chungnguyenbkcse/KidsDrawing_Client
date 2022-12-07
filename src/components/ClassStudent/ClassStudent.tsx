import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { changeSelectedDoinglClass, setModificationState } from "../../store/actions/classes_student.action";
import { IClassesStudentState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { IClassesStudent, ClassesStudentModificationStatus } from "../../store/models/classes_student.interface";
import "./ClassStudent.css"
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getClassesStudent } from "../../common/service/ClassesStudent/GetClassesStudentByStudent";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import ClassDoneList1 from "./ClassDoneList1";
import ClassDoingList1 from "./ClassDoingList1";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";

const ClassStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberClassDoingCount: number = classes_students.classes_doing.length;
    const numberClassDoneCount: number = classes_students.classes_done.length;
    var id_x = localStorage.getItem('id');
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getClassesStudent(dispatch, id))
                    trackPromise(getArtType(dispatch))
                    trackPromise(getArtAge(dispatch))
                    trackPromise(getArtLevel(dispatch))
                }
            }
            else {
                trackPromise(getClassesStudent(dispatch, id))
                trackPromise(getArtType(dispatch))
                trackPromise(getArtAge(dispatch))
                trackPromise(getArtLevel(dispatch))
            }
        }
    }, [dispatch, id, access_token, refresh_token]);

    useEffect(() => {
        dispatch(updateCurrentPath("Khóa học", ""));
    }, [path.area, dispatch])

    function onClassesStudentSelect(classes_student: IClassesStudent): void {
        dispatch(changeSelectedDoinglClass(classes_student));
        dispatch(setModificationState(ClassesStudentModificationStatus.None));
    }

    const [checked, setChecked] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}



                <div className="row" id="search-box">
                    <div className="col-xl-12 col-lg-12">
                        <div className="input-group" id="search-content">
                            <div className="form-outline">
                                <input type="text" id="form1" className="form-control" placeholder="Tìm kiếm" onChange={(event) => {
                                    setSearchTerm(event.target.value)
                                    console.log(searchTerm)
                                }} />
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
                        }}>Đang học</h6>
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
                            }}>Đã học</h6>
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
                                                <div className="card-body">
                                                    <ClassDoingList1
                                                        onSelect={onClassesStudentSelect} value={searchTerm}
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
                                                <div className="card-body">
                                                    <ClassDoneList1
                                                        onSelect={onClassesStudentSelect} value={searchTerm}
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

export default ClassStudent;
