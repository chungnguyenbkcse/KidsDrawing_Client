import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getUserGradeExerciseByStudentAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassStudent";
import { logout } from "../../store/actions/account.actions";
import { IExerciseStudentState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./ManageStudent.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import ExerciseSectionList from "./ExerciseSectionList";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getExerciseForClassStudent } from "../../common/service/ExerciseStudent/GetExerciseForClassStudent";
import { getExerciseSubmissionByClassAndStudent } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByClassAndStudent";
import ExerciseStudentNotGradeList from "./ExerciseStudentNotGradeList";

const ExerciseStudentList: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const exercise_students: IExerciseStudentState = useSelector((state: IStateType) => state.exercise_students);
    const numberSubmittedCount: number = exercise_students.exercise_submitted_graded.length + exercise_students.exercise_submitted_not_grade.length;
    const numberNotSubmitNowCount: number = exercise_students.exercise_not_submit.length;
    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_y !== null) {
        student_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_z !== null) {
        class_id = parseInt(id_z);
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
                    dispatch(logout())
                    trackPromise(getExerciseForClassStudent(dispatch, class_id, student_id))
                    trackPromise(getExerciseSubmissionByClassAndStudent(dispatch, class_id, student_id))
                    trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id, student_id))
                }
            }
            else {
                trackPromise(getExerciseSubmissionByClassAndStudent(dispatch, class_id, student_id))
                trackPromise(getExerciseForClassStudent(dispatch, class_id, student_id))
                trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id, student_id))
            }
        }
    }, [dispatch, access_token, refresh_token, student_id, class_id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Thống kê", "Bài tập"));
    }, [dispatch, path.area])

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
                    <TopCard title="BÀI TẬP ĐÃ NÔP" text={`${numberSubmittedCount}`} icon="book" class="primary" />
                    <TopCard title="BÀI TẬP CHƯA NỘP" text={`${numberNotSubmitNowCount}`} icon="book" class="danger" />
                    {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
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
                        }}>Đã chấm</h6>
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
                            }}>Chưa chấm</h6>
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
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-body">
                                                <ExerciseSectionList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4" id="topcard-user">
                                            <div className="card-body">
                                                <ExerciseStudentNotGradeList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }

            </Fragment>
    );
};

export default ExerciseStudentList;
