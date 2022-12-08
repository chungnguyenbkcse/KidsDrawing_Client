import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getSectionById } from "../../common/service/Section/GetSectionById";
import { logout } from "../../store/actions/account.actions";
import { IClassesStudentState, IExerciseStudentState, IExerciseSubmissionState, ISectionState, IStateType } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { getExerciseForSectionStudent } from "../../common/service/ExerciseStudent/GetExerciseBySectionStudent";
import { IExerciseStudent } from "../../store/models/exercise_student.interface";
import { getExerciseSubmissionBySectionAndStudent } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionBySectionAndStudent";
import { IExerciseSubmission } from "../../store/models/exercise_submission.interface";
import { getAttendanceBySectionAndStudent } from "../../common/service/Attendance/GetUserAttendaceBySectionAndStudent";
import { BsFillTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import { deleteExerciseSubmission } from "../../common/service/ExerciseSubmission/DeleteExerciseSubmissionById";
import { getAttendanceBySectionAndParent } from "../../common/service/Attendance/GetAttendanceBySectionAndParent";

const DetailSectionParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const exercise_student: IExerciseStudentState = useSelector((state: IStateType) => state.exercise_students);
    const class_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);

    const { promiseInProgress } = usePromiseTracker();


    var id_y = localStorage.getItem('section_id');

    let section_id = 0;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }


    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }


    var id_z = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_z !== null) {
        class_id = parseInt(id_z);
    }

    var id_t = localStorage.getItem('is_active');
    var is_active = "";
    if (id_t !== null) {
        is_active = id_t;
    }

    var id_tt = localStorage.getItem('link_record');
    var link_record = "";
    if (id_tt !== null) {
        link_record = id_tt;
    }

    var id_j = localStorage.getItem('is_attendance_parent');
    var is_attendance_parent = "";
    if (id_j !== null) {
        is_attendance_parent = id_j;
    }

    var id_jx = localStorage.getItem('student_leave');
    var student_leave = "";
    if (id_jx !== null) {
        student_leave = id_jx;
    }

    const [popup2, setPopup2] = useState(false);
    const [requestId, setRequestId] = useState(0);
    const [studentId, setStudentId] = useState(0);




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
                    trackPromise(getAttendanceBySectionAndParent(dispatch, section_id, id))
                    trackPromise(getSectionById(dispatch, section_id))
                    trackPromise(getExerciseSubmissionBySectionAndStudent(dispatch, section_id, id))
                    trackPromise(getExerciseForSectionStudent(dispatch, section_id, id))
                }
            }
            else {
                trackPromise(getAttendanceBySectionAndParent(dispatch, section_id, id))
                trackPromise(getSectionById(dispatch, section_id))
                trackPromise(getExerciseSubmissionBySectionAndStudent(dispatch, section_id, id))
                trackPromise(getExerciseForSectionStudent(dispatch, section_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, section_id, id]);

    const history = useHistory();
    const routeChange2 = () => {
        let path = "/section/view";
        history.push({
            pathname: path,
            state: { section_id: section_id }
        });
    }


    const routeChange2x = (exercise_student: IExerciseSubmission) => {
        let path = '/exercise/detail';
        
        localStorage.removeItem('time_submit');
        localStorage.setItem('time_submit', exercise_student.update_time.toString())
        localStorage.removeItem('description');
        localStorage.setItem('exercise_description', exercise_student.exercise_description);
        localStorage.setItem('description', exercise_student.exercise_description.toString())
        localStorage.removeItem('deadline');
        localStorage.setItem('deadline', exercise_student.exercise_deadline);

        localStorage.setItem('exercise_name', exercise_student.exercise_name);
        localStorage.setItem('exercise_id', exercise_student.exercise_id.toString());
        history.push({
            pathname: path
        });
    }

    const routeChange1 = (exercise_student: IExerciseStudent) => {
        localStorage.removeItem('exercise_description');
        localStorage.removeItem('exercise_name');
        localStorage.removeItem('exercise_level_name');
        localStorage.removeItem('exercise_id');
        localStorage.removeItem('deadline');
        localStorage.setItem('exercise_description', exercise_student.description);
        localStorage.setItem('exercise_name', exercise_student.name);
        localStorage.setItem('exercise_id', exercise_student.id.toString());
        localStorage.setItem('deadline', exercise_student.deadline);
        let path = '/exercise/submit';
        history.push({
            pathname: path
        });
    }

    function routeChangeVIewExerciseSubmission(exercise_student: IExerciseSubmission) {
        let path = '/exercise-submission/view';
        
        localStorage.removeItem('time_submit');
        localStorage.setItem('time_submit', exercise_student.update_time.toString())
        localStorage.removeItem('description');
        localStorage.setItem('exercise_description', exercise_student.exercise_description);
        localStorage.setItem('description', exercise_student.exercise_description.toString())
        localStorage.removeItem('deadline');
        localStorage.setItem('deadline', exercise_student.exercise_deadline);
        localStorage.setItem('exercise_name', exercise_student.exercise_name);
        localStorage.setItem('exercise_id', exercise_student.exercise_id.toString());
        history.push({
            pathname: path
        });
    }

    const routeChange5 = (description: string, name: string, id: any) => {
        let path = '/exercise/submit';
        localStorage.removeItem('exercise_description');
        localStorage.removeItem('exercise_name');
        localStorage.removeItem('exercise_level_name');
        localStorage.removeItem('exercise_id');
        localStorage.setItem('exercise_description', description);
        localStorage.setItem('exercise_name', name);
        localStorage.setItem('exercise_id', id.toString());
        history.push({
            pathname: path
        });
    }

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                <ToastContainer />
                {
                    function () {
                        if (requestId !== 0) {
                            return (
                                <Popup
                                    open={popup2}
                                    onClose={() => setPopup2(false)}
                                    closeOnDocumentClick
                                >
                                    <div className="popup-modal" id="popup-modal">
                                        <div className="popup-title">
                                            Bạn có chắc chắn muốn xóa?
                                        </div>
                                        <div className="popup-content">
                                            <button type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    if (requestId === 0) {
                                                        return;
                                                    }
                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                        position: toast.POSITION.TOP_CENTER
                                                    });
                                                    dispatch(deleteExerciseSubmission(requestId, studentId, idx))
                                                    setPopup2(false);
                                                }}>Remove
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            )
                        }
                    }()
                }
                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className="col-xl-12 col-md-12 mb-2">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Thông tin buổi học</h4>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Tên: {
                                                    function () {
                                                        if (sections.sections.length <= 0) {
                                                            return ""
                                                        }
                                                        else {
                                                            return sections.sections[0].name;
                                                        }
                                                    }()
                                                }</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Hình thức:
                                                    {
                                                        function () {
                                                            if (sections.sections.length <= 0) {
                                                                return ""
                                                            }
                                                            else {
                                                                if (sections.sections[0].teach_form === true) {
                                                                    return "Dạy bằng jitsi";
                                                                }
                                                                else {
                                                                    return "Dạy bằng giáo trình";
                                                                }
                                                            }
                                                        }()
                                                    }
                                                </p>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    {
                                                        function () {
                                                            if (sections.sections.length <= 0) {
                                                                return ""
                                                            }
                                                            else {
                                                                if (sections.sections[0].teach_form === false) {
                                                                    if (is_active === "not_active" || is_active === "active_now" || is_active === "pre_active_now") {
                                                                        return (
                                                                            <button
                                                                                className="btn btn-success ml-2"
                                                                                id="btn-view-tutorial"
                                                                                onClick={routeChange2}
                                                                            >
                                                                                Xem nội dung
                                                                            </button>
                                                                        )
                                                                    }
                                
                                                                }
                                                            }
                                                        }()
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Bài tập</h4>
                                            <div className="table-responsive portlet  exercise-list">
                                                <table className="table">
                                                    <thead className="thead-light">
                                                        <tr>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            exercise_student.exercise_not_submit.map((ele, index) => {
                                                                return (
                                                                    <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                        <div className="row section-ele row-section mb-2 ml-2 mr-2" onClick={() => { routeChange5(ele.description, ele.name, ele.id) }}>
                                                                            <div className="col-xl-3 col-md-3 avatar-x">
                                                                                <img className="img-exam" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667399202/ersndjmp6ppmvohvekpr.png" alt="" />
                                                                            </div>
                                                                            <div className="col-xl-9 col-md-9 mt-2">
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        Tên:
                                                                                    </div>
                                                                                    <div className="col-md-7">
                                                                                        {ele.name}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        Hạn nộp:
                                                                                    </div>
                                                                                    <div className="col-md-7">
                                                                                        {ele.deadline.replaceAll("T", " ").substring(0, 16)}
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                <div className="row mb-2">
                                                                                    <div className="col-md-5">
                                                                                        Trạng thái:
                                                                                    </div>
                                                                                    <div className="col-md-7 status-score">
                                                                                        Chưa nộp bài
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                        {

                                                            exercise_submissions.exercise_gradeds.map((ele, index) => {
                                                                return (
                                                                    <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                        <div className="row section-ele row-section-1 mb-4 ml-2 mr-2" onClick={() => { routeChange2x(ele) }}>
                                                                            <div className="col-xl-3 col-md-3 avatar-x">
                                                                                <img className="img-exam" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667399202/ersndjmp6ppmvohvekpr.png" alt="" />
                                                                            </div>
                                                                            <div className="col-xl-9 col-md-9 mt-2">
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        Tên:
                                                                                    </div>
                                                                                    <div className="col-md-7">
                                                                                        {ele.exercise_name}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        Nộp lúc:
                                                                                    </div>
                                                                                    <div className="col-md-7">
                                                                                        {ele.update_time.replaceAll("T", " ").substring(0, 16)}
                                                                                    </div>
                                                                                </div>
                                                                                

                                                                                <div className="row mb-2">
                                                                                    <div className="col-md-5">
                                                                                        Trạng thái:
                                                                                    </div>
                                                                                    <div className="col-md-7 status-score">
                                                                                        Đã có điểm
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                        {
                                                            exercise_submissions.exercise_not_gradeds.map((ele, index) => {
                                                                return (
                                                                    <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                        <div className="row section-ele row-section mb-4 ml-2 mr-2" onClick={() => { routeChangeVIewExerciseSubmission(ele) }}>
                                                                            <div className="col-xl-3 col-md-3 avatar-x">
                                                                                <img className="img-exam" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667399202/ersndjmp6ppmvohvekpr.png" alt="" />
                                                                            </div>
                                                                            <div className="col-xl-9 col-md-9 mt-2">
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        Tên:
                                                                                    </div>
                                                                                    <div className="col-md-7">
                                                                                    <div className="row">
                                                                                        <div className="col-md-9">
                                                                                            {ele.exercise_name}
                                                                                        </div>
                                                                                        <div className="col-md-3">
                                                                                            <BsFillTrashFill color="#dc3545" onClick={(e) => {
                                                                                                e.stopPropagation(); 
                                                                                                setRequestId(ele.exercise_id);
                                                                                                setStudentId(ele.student_id)
                                                                                                setPopup2(true)
                                                                                            }}/>
                                                                                        </div>
                                                                                    </div> 
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        Nộp lúc:
                                                                                    </div>
                                                                                    <div className="col-md-7">
                                                                                        {ele.update_time.replaceAll("T", " ").substring(0, 16)}
                                                                                    </div>
                                                                                </div>
                                                                                

                                                                                <div className="row mb-2">
                                                                                    <div className="col-md-5">
                                                                                        Trạng thái:
                                                                                    </div>
                                                                                    <div className="col-md-7 status-score">
                                                                                        Chưa có điểm
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    function () {
                        if (is_active === 'not_active') {
                            return (
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 mb-4">
                                        {
                                            function () {
                                                if (sections.sections.length <= 0) {
                                                    return ""
                                                }
                                                else {
                                                    if (sections.sections[0].teach_form === true) {
                                                        if ((is_active === "not_active" && is_attendance_parent === "true") || (is_attendance_parent === "false" && student_leave === "true")) {
                                                            return (
                                                                <>
                                                                    <h4 id="full-name">Recording</h4>
                                                                    <iframe width="100%" height="500" src={link_record} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                                </>
                                                            )
                                                        }
                                                    }
                                                }
                                            }()
                                        }
                                    </div>
                                </div>
                            )
                        }
                    }()
                }

            </Fragment>
    );
};

export default DetailSectionParent;
