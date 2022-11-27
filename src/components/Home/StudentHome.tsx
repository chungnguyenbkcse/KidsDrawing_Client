import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { IRootPageStateType, IScheduleTimeClassState, IStateType, IUserState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import "./ParentHome.css"
import { ScheduleComponent, Day, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getTotalCourseForStudent } from "../../common/service/Course/GetTotalCourseForStudent";
import { getTotalContestForStudent } from "../../common/service/Contest/GetTotalContestForStudent";
import { getUserById } from "../../common/service/User/GetUserById";


const StudentHome: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    let total_contest_student: number = 0;
    let total_course_student: number = 0;
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('total_contest_student');
    if (id_y !== null) {
        total_contest_student = parseInt(id_y)
    }

    var id_z = localStorage.getItem('total_course_student');
    if (id_z !== null) {
        total_course_student = parseInt(id_z)
    }

    console.log(schedule_time_classes.schedule_time_classes)

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
                    trackPromise(getUserById(dispatch, id))
                    trackPromise(getTotalContestForStudent(dispatch, id))
                    trackPromise(getTotalCourseForStudent(dispatch, id))
                }
            }
            else {
                trackPromise(getUserById(dispatch, id))
                trackPromise(getTotalContestForStudent(dispatch, id))
                trackPromise(getTotalCourseForStudent(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    
    useEffect(() => {
        dispatch(updateCurrentPath("Trang chủ", ""));
    }, [path.area, dispatch]);

    let data: object[] = []

    schedule_time_classes.schedule_time_classes.map((ele, index) => {
        if (ele !== undefined) {
            return data.push({
                Id: index,
                Subject: ele.class_name !== undefined && ele.class_name !== null ? ele.class_name : "",
                StartTime: new Date(ele.start_time),
                EndTime: new Date(ele.end_time),
                IsAllDay: false
            })
        }
        return 1
    })

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
                    <TopCard title="KHÓA HỌC" text={`${total_course_student}`} icon="book" class="primary" />
                    <TopCard title="CUỘC THI" text={`${total_contest_student}`} icon="book" class="primary" />
                </div>

                <div className="row mx-auto">
                    <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Thông tin cá nhân</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <div className="row text-center text-center justify-content-center">
                                    <i className={`fas fa-user fa-10x`} id="icon-user"></i>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <h4 id="full-name">{users.teachers.length === 0 ? "" : (users.teachers[0].firstName + " "+ users.teachers[0].lastName)}</h4>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <p id="username-teacher">{users.teachers.length === 0 ? "" : users.teachers[0].username}</p>
                                </div>
                                <div className="row no-gutters">
                                    <p id="phone pl-2">Giới tính: {users.teachers.length === 0 ? "" : users.teachers[0].sex}</p>
                                </div>

                                <div className="row no-gutters mt-2">
                                    <p id="phone pl-2">Ngày sinh: {users.teachers.length === 0 || users.teachers[0].dateOfBirth == undefined || users.teachers[0].dateOfBirth == null ? "" : users.teachers[0].dateOfBirth.replaceAll("T", " ").substring(0,16)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>



            </Fragment>
    );
};

export default StudentHome;
