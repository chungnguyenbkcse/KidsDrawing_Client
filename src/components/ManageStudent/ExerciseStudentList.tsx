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
import ExerciseStudentNotSubmitList from "./ExerciseStudentNotSubmit";

const ExerciseStudentList: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const exercise_submissions = useSelector((state: any) => state.exercise_submissions);
    const user_grade_exercise_submission = useSelector((state: any) => state.user_grade_exercise_submissions);
    const exercise_students: IExerciseStudentState = useSelector((state: IStateType) => state.exercise_students);
    const numberSubmittedNotGradeCount: number = exercise_submissions.exercise_not_gradeds.length;
    const numberNotSubmitNowCount: number = exercise_students.exercise_not_submit.length;
    const numberGradeCount: number = user_grade_exercise_submission.user_grade_exercise_submissions.length;

    var role = localStorage.getItem('role')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }

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
                    localStorage.removeItem('role')
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

    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    if (roleUser === "TEACHER") {
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
                        <TopCard title="BÀI TẬP ĐÃ CHẤM" text={`${numberGradeCount}`} icon="book" class="primary" />
                        <TopCard title="BÀI TẬP CHƯA CHẤM" text={`${numberSubmittedNotGradeCount}`} icon="book" class="primary" />
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
                        <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                            <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                                if (checked1 === false) {
                                    setChecked1(true)
                                    setChecked2(false)
                                    setChecked3(false)
                                }
                            }} style={{
                                color: checked1 ? "#F24E1E" : "#2F4F4F"
                            }}>Đã chấm</h6>

                            <div style={{
                                height: "5px",
                                textAlign: "center",
                                margin: "auto",
                                width: "30%",
                                backgroundColor: checked1 ? "#F24E1E" : "#ffffff"
                            }}></div>
                        </div>
                        <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                            <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                                if (checked2 === false) {
                                    setChecked2(true)
                                    setChecked1(false)
                                    setChecked3(false)
                                }
                            }}
                                style={{
                                    color: checked2 ? "#F24E1E" : "#2F4F4F"
                                }}>Chưa chấm</h6>
                            <div style={{
                                height: "5px",
                                textAlign: "center",
                                margin: "auto",
                                width: "30%",
                                backgroundColor: checked2 ? "#F24E1E" : "#ffffff"
                            }}></div>
                        </div>

                        <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                            <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                                if (checked3 === false) {
                                    setChecked3(true)
                                    setChecked1(false)
                                    setChecked2(false)
                                }
                            }}
                                style={{
                                    color: checked3 ? "#F24E1E" : "#2F4F4F"
                                }}>Chưa nộp</h6>
                            <div style={{
                                height: "5px",
                                textAlign: "center",
                                margin: "auto",
                                width: "30%",
                                backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                            }}></div>
                        </div>
                    </div>

                    {
                        function () {
                            if (checked1 === true) {
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
                            else if (checked2 === true) {
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
                            else {
                                return (
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12">
                                            <div className="card shadow mb-4" id="topcard-user">
                                                <div className="card-body">
                                                    <ExerciseStudentNotSubmitList />
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
    }

    else {
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
                        <TopCard title="BÀI TẬP ĐÃ CHẤM" text={`${numberGradeCount}`} icon="book" class="primary" />
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-4" id="topcard-user">
                                <div className="card-body">
                                    <ExerciseSectionList />
                                </div>
                            </div>
                        </div>
                    </div>



                </Fragment>
        );
    }


};

export default ExerciseStudentList;
