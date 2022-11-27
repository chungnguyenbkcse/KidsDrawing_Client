import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getExerciseForClassStudent } from "../../common/service/ExerciseStudent/GetExerciseForClassStudent";
import { getParentById } from "../../common/service/Parent/GetParentById";
import { getStudentLeaveByClassAndStudent } from "../../common/service/StudentLeave/GetStudentLeaveByClassStudent";
import { getUserById } from "../../common/service/User/GetUserById";
import { getUserGradeExerciseByStudentAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassStudent";
import { logout } from "../../store/actions/account.actions";
import { IExerciseStudentState, ILessonState, IRootPageStateType, IStateType, IStudentLeaveState, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";
import "./ManageClasses.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { FcFeedback } from "react-icons/fc";
import { setModificationState } from "../../store/actions/lesson.action";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import Popup from "reactjs-popup";
import FormReviewClass from "./FormReviewClass";
import { ToastContainer } from "react-toastify";
import { getInfoFinalCourse } from "../../common/service/FinalCourse/GetInfoFinalCourse";
import { getInforClassHasRegisterJoinSemester } from "../../common/service/ClassHasRegisterJoinSemester/GetInfoClassHasRegisterJoinSemester";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { CircularProgressbar } from "react-circular-progressbar";

const ManageClassesDone: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const exercise_students: IExerciseStudentState = useSelector((state: IStateType) => state.exercise_students);
    const student_leave: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const user_grade_exercise_submission: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const numberSubmittedCount: number = exercise_students.exercise_submitted_not_grade.length + exercise_students.exercise_submitted_graded.length;
    const numberNotSubmitNowCount: number = exercise_students.exercise_not_submit.length;
    const numberStudentLeaveCount: number = student_leave.acceptLeaves.length;
    const { promiseInProgress } = usePromiseTracker();


    var id_z = localStorage.getItem('teacher_id');
    var teacher_id: number = 0;
    if (id_z !== null) {
        teacher_id = parseInt(id_z);
    }

    var id_ix = localStorage.getItem('student_ids');
    let student_ids: number[] = [];
    if (id_ix !== null) {
        student_ids = JSON.parse(id_ix);
    }

    var id_iy = localStorage.getItem('student_names');
    let student_names: string[] = [];
    if (id_iy !== null) {
        student_names = JSON.parse(id_iy);
    }

    var id_t = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_t !== null) {
        class_id = parseInt(id_t);
    }

    var id_x = localStorage.getItem("final_grade");
    let final_grade = 0;
    if (id_x !== null) {
        final_grade = parseFloat(id_x);
    }

    var id_k = localStorage.getItem("course_name");
    let course_name = "";
    if (id_k !== null) {
        course_name = id_k;
    }

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath(course_name, "Tổng kết"));
    }, [path.area, dispatch, course_name]);

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
                    if (student_ids.length === 1) {
                        trackPromise(getUserById(dispatch, student_ids[0]))
                        trackPromise(getExerciseForClassStudent(dispatch, class_id, student_ids[0]))
                        trackPromise(getStudentLeaveByClassAndStudent(dispatch, class_id, student_ids[0]))
                        trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id, student_ids[0]))
                        trackPromise(getInfoFinalCourse(dispatch, student_ids[0], class_id))
                        trackPromise(getInforClassHasRegisterJoinSemester(dispatch, class_id, student_ids[0]))
                    }
                    trackPromise(getParentById(dispatch, teacher_id))
                }
            }
            else {
                if (student_ids.length === 1) {
                    trackPromise(getUserById(dispatch, student_ids[0]))
                    trackPromise(getExerciseForClassStudent(dispatch, class_id, student_ids[0]))
                    trackPromise(getStudentLeaveByClassAndStudent(dispatch, class_id, student_ids[0]))
                    trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id, student_ids[0]))
                    trackPromise(getInfoFinalCourse(dispatch, student_ids[0], class_id))
                    trackPromise(getInforClassHasRegisterJoinSemester(dispatch, class_id, student_ids[0]))
                }
                trackPromise(getParentById(dispatch, teacher_id))
            }
        }
    }, [dispatch, access_token, refresh_token, teacher_id, class_id]);

    let list_score_user_grade_exercise: number[] = [];
    let list_name_user_grade_exercise: string[] = [];
    user_grade_exercise_submission.user_grade_exercise_submissions.map((ele, idx) => {
        list_score_user_grade_exercise.push(ele.score)
        list_name_user_grade_exercise.push(ele.exercise_name)
        return ele
    })


    const labels = list_name_user_grade_exercise;
    const data = {
        labels,
        datasets: [
            {
                label: 'Điểm kiểm tra',
                data: list_score_user_grade_exercise,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);

    const history = useHistory();
    const routeChange = () => {
        if (student_ids.length === 1) {
            localStorage.removeItem('student_id');
            localStorage.setItem('student_id', student_ids[0].toString())
            let path = '/class/exercise-student';
            history.push({
                pathname: path,
            });
        }
        else {
            localStorage.removeItem('student_id');
            localStorage.setItem('student_id', filter.toString())
            let path = '/class/exercise-student';
            history.push({
                pathname: path,
            });
        }
    }

    const [popup, setPopup] = useState(false);

    function onLessonRemove() {
        setPopup(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    let percentage = final_grade * 10;

    const [filter, setFilter] = useState(0)
    const [text, setText] = useState("")



    function handleChange(e: any) {
        setFilter(e.target.value)
        let index = e.nativeEvent.target.selectedIndex;
        setText(e.nativeEvent.target[index].text)
    }

    function handleFilter() {
        trackPromise(getUserById(dispatch, filter))
        trackPromise(getExerciseForClassStudent(dispatch, class_id, filter))
        trackPromise(getStudentLeaveByClassAndStudent(dispatch, class_id, filter))
        trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id, filter))
        trackPromise(getInfoFinalCourse(dispatch, filter, class_id))
        trackPromise(getInforClassHasRegisterJoinSemester(dispatch, class_id, filter))
    }

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
                <ToastContainer />
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
                {
                    student_ids.length > 1 ? <div className="row">
                    <div className="col-md-12">
                        <div className="right-sort float-right">
                            <div className="sort-by ml-4">
                                <span className="mr-1">Vui lòng chọn học sinh:</span>

                                <select name="cars" id="cars"
                                    value={filter}
                                    onChange={handleChange}
                                >
                                    <option value={0} selected>Choose</option>
                                    {
                                        student_ids.map((ele, idx) => {
                                            return (
                                                <option value={ele}>{student_names[idx]}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button" onClick={() => handleFilter()}>Lọc&nbsp;<i className="fa fa-flask"></i></button>
                            </div>
                        </div>
                    </div>
                </div> : ""
                }
                <Popup
                    open={popup}
                    onClose={() => setPopup(false)}
                    closeOnDocumentClick
                >
                    <>
                        {
                            function () {
                                if ((lessons.modificationState === LessonModificationStatus.Create) || ((lessons.selectedLesson) && (lessons.modificationState === LessonModificationStatus.Edit))) {
                                    return <FormReviewClass isCheck={onRemovePopup} />
                                }
                            }()
                        }
                    </>
                </Popup>
                <div className="row">
                    <div className="col-xl-4 col-md-4 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Điểm tổng kết</h3>
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <CircularProgressbar value={percentage} text={`${percentage}`} />;
                            </div>
                        </div>
                        {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                    </div>
                    <div className="col-xl-8 col-md-8 mb-4">
                        <div className="row">
                            <h3 className=" mb-2" id="level-teacher">Thống kê điểm</h3>
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters">
                                            <ChartLine data={data} />
                                        </div>
                                        <div className="row justify-content-center">
                                            <button
                                                className="btn btn-success btn-green"
                                                id="btn-into-class-student"
                                                onClick={() => { routeChange() }}
                                            >
                                                Xem chi tiết
                                                <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className="row justify-content-center">
                                    <button
                                        className="btn btn-success btn-green"
                                        id="btn-into-class-review"
                                        onClick={() => {
                                            dispatch(setModificationState(LessonModificationStatus.Create))
                                            onLessonRemove()
                                        }}
                                    >
                                        Nhận xét
                                        <FcFeedback />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Thông tin giáo viên</h3>
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className={`card shadow h-100 py-2`} id="topcard-user">
                                <div className="card-body">
                                    <div className="row no-gutters justify-content-center">
                                        <h4 id="full-name">Tên : {users.parents.length > 0 ? users.parents[0].username : ""}</h4>
                                    </div>
                                    <div className="row no-gutters justify-content-center">
                                        <p id="username-teacher">Giới tính: {users.parents.length > 0 ? users.parents[0].sex : ""}</p>
                                    </div>
                                    <div className="row no-gutters">
                                        <i className={`fas fa-phone fa-2x`} id="icon-phone"></i>
                                        <p id="phone">Số điện thoại: {users.parents.length > 0 ? users.parents[0].phone : ""}</p>
                                    </div>

                                    <div className="row no-gutters">
                                        <i className={`fas fa-calendar fa-2x`} id="icon-phone"></i>
                                        <p id="phone">Ngày sinh: {users.parents.length > 0 ? users.parents[0].dateOfBirth : ""}</p>
                                    </div>

                                    <div className="row no-gutters">
                                        <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                        <p id="phone">Email: {users.parents.length > 0 ? users.parents[0].email : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
    );
};

export default ManageClassesDone;
