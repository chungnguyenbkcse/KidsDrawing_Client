import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IClassesStudentState, IContestTeacherState, IStateType, IUserState } from "../../store/models/root.interface";
import "./ManageChild.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getUserById } from "../../common/service/User/GetUserById";
import { getContestByStudent } from "../../common/service/Contest/GetContestByStudent";
import { getClassesStudent } from "../../common/service/ClassesStudent/GetClassesStudentByStudent";
import { getScheduleTimeByChild } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByStudent";
import TopCard from "../../common/components/TopCard";
import ManageStudyChild from "./ManageStudyChild";
import ScheduleForChild from "./ScheduleForChild";
import { getUserGradeContestSubmissionByStudent } from "../../common/service/UserGradeContestSubmission/GetUserGradeContestSubmissionByStudent";
import { getFinalScoreChild } from "../../common/service/FinalScoreChild/GetFinalScoreChild";


const ManageChild: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const [checked, setChecked] = useState<Boolean>(true);
    const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);
    const numberApprovedCount: number = classes_students.classes_done.length + classes_students.classes_doing.length;
    const numberNotApprovedNowCount: number = contest_teachers.contest_end.length + contest_teachers.contest_not_open_now.length + contest_teachers.contest_opening.length;
    var id_x = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_x !== null) {
        student_id = parseInt(id_x);
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
                    trackPromise(getUserById(dispatch, student_id))
                    trackPromise(getScheduleTimeByChild(dispatch, student_id))
                    trackPromise(getContestByStudent(dispatch, student_id))
                    trackPromise(getClassesStudent(dispatch, student_id))
                    trackPromise(getUserGradeContestSubmissionByStudent(dispatch, student_id))
                    trackPromise(getFinalScoreChild(dispatch, student_id))
                }
            }
            else {
                trackPromise(getUserById(dispatch, student_id))
                trackPromise(getScheduleTimeByChild(dispatch, student_id))
                trackPromise(getContestByStudent(dispatch, student_id))
                trackPromise(getClassesStudent(dispatch, student_id))
                trackPromise(getUserGradeContestSubmissionByStudent(dispatch, student_id))
                trackPromise(getFinalScoreChild(dispatch, student_id))
            }
        }
    }, [dispatch, access_token, refresh_token, student_id]);


    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                <div className="row">
                    <TopCard title="KHÓA HỌC" text={`${numberApprovedCount}`} icon="book" class="primary" />
                    <TopCard title="CUỘC THI" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                </div>

                <div className="row">
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked === false) {
                                setChecked(true)
                            }
                        }} style={{
                            color: checked ? "#F24E1E" : "#2F4F4F"
                        }}>Học tập</h6>
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
                            }}>Thời khóa biểu</h6>
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
                                <ManageStudyChild />
                            )
                        }
                        else {
                            return (
                                <ScheduleForChild />
                            )
                        }
                    }()
                }

            </Fragment>
    );
};

export default ManageChild;
