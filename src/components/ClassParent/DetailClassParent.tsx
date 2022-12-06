import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { getSectionByClass } from "../../common/service/Section/GetSectionByClass";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IChildsClassState, IExerciseParentState, IExerciseSubmissionState, IRootPageStateType, ISectionState, ISectionTeacherState, IStateType, IStudentLeaveState, ITimeScheduleState, ITutorialPageState, ITutorialState, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";
import RequestOffSectionForm from "./RequestOffSectionForm";
import { ISection } from "../../store/models/section.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { IExerciseParent } from "../../store/models/exercise_parent.interface";
import { toast, ToastContainer } from "react-toastify";
import { IExerciseSubmission } from "../../store/models/exercise_submission.interface";
import { IStudentLeave } from "../../store/models/student_leave.interface";
import { ChartLine } from "../../common/components/CharLine";
import { getStudentLeaveByClassAndParent } from "../../common/service/StudentLeave/GetStudentLeaveByClassAndParent";
import { getExerciseSubmissionByClassAndParent } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByClassAndParent";
import { getExerciseForClassAndParent } from "../../common/service/ExerciseParent/GetExerciseByClassAndParent";
import { getParentById } from "../../common/service/Parent/GetParentById";
import { getUserGradeExerciseByClassAndParent } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassParent";
import { getChildsClassByClassAndParent } from "../../common/service/ChildsClass/GetChildsInClassByClassAndParent";
import { getUserGradeExerciseByStudentAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassStudent";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteStudentLeaveByParent } from "../../common/service/StudentLeave/DeleteStudentLeaveByParent";
import { deleteExerciseSubmissionParent } from "../../common/service/ExerciseSubmission/DeleteExerciseSubmissionByParent";


const DetailClassParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionTeacherState = useSelector((state: IStateType) => state.section_teachers);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);
    const tutorials: ITutorialState = useSelector((state: IStateType) => state.tutorials);
    const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);
    const tutorial_pages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const exercise_students: IExerciseParentState = useSelector((state: IStateType) => state.exercise_parents);
    const student_leave: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const user_grade_exercise_submission: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const numberSubmittedCount: number = exercise_students.exercise_submitted_graded.length + exercise_students.exercise_submitted_not_grade.length;
    const numberStudentLeaveCount: number = student_leave.acceptLeaves.length;
    const { promiseInProgress } = usePromiseTracker();
    const childs_classes: IChildsClassState = useSelector((state: IStateType) => state.childs_classes);
    let list_score_user_grade_exercise : number[] = [];
    let list_name_user_grade_exercise : string[] = [];
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


    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberSectionCount: number = sections.sections.length;
    const numberNotSubmitNowCount: number = exercise_students.exercise_not_submit.length;
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('class_id');

    let class_id = 0;

    if (id_y !== null) {
        class_id = parseInt(id_y);
    }

    var id_z = localStorage.getItem('teacher_id');
    var teacher_id: number = 0;
    if (id_z !== null) {
        teacher_id = parseInt(id_z);
    }

    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    const [popup3, setPopup3] = useState(false);
    const [requestId1, setRequestId1] = useState(0);

    const [popup2, setPopup2] = useState(false);
    const [requestId, setRequestId] = useState(0);

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
                    trackPromise(getInfoMyClass(dispatch, class_id))
                    trackPromise(getChildsClassByClassAndParent(dispatch, class_id, id))
                    trackPromise(getParentById(dispatch, teacher_id))
                    trackPromise(getSectionByClass(dispatch, class_id))
                    trackPromise(getStudentLeaveByClassAndParent(dispatch, class_id, id))
                    trackPromise(getExerciseSubmissionByClassAndParent(dispatch, class_id, id))
                    trackPromise(getExerciseForClassAndParent(dispatch, class_id, id))
                    trackPromise(getUserGradeExerciseByClassAndParent(dispatch, class_id,id))
                }
            }
            else {
                trackPromise(getInfoMyClass(dispatch, class_id))
                trackPromise(getChildsClassByClassAndParent(dispatch, class_id, id))
                trackPromise(getParentById(dispatch, teacher_id))
                trackPromise(getSectionByClass(dispatch, class_id))
                trackPromise(getStudentLeaveByClassAndParent(dispatch, class_id, id))
                trackPromise(getExerciseSubmissionByClassAndParent(dispatch, class_id, id))
                trackPromise(getExerciseForClassAndParent(dispatch, class_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id, id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp học", "Chi tiết"));
    }, [path.area, dispatch]);

    const [popup1, setPopup1] = useState(false);

    const [filter, setFilter] = useState(0)


    function handleChange(e: any) {
        setFilter(e.target.value)
    }

    function onAnonymousNotificationRemove() {
        setPopup1(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    const history = useHistory();

    const routeChange2 = (exercise_student: IExerciseSubmission) => {
        let path = '/exercise/detail';
        localStorage.removeItem('exercise_submission_id');
        localStorage.setItem('exercise_submission_id', exercise_student.id.toString())
        localStorage.removeItem('time_submit');
        localStorage.setItem('time_submit', exercise_student.update_time.toString())
        localStorage.removeItem('description');
        localStorage.setItem('exercise_description', exercise_student.exercise_description);
        localStorage.setItem('description', exercise_student.exercise_description.toString())
        localStorage.removeItem('deadline');
        localStorage.setItem('deadline', exercise_student.exercise_deadline);
        localStorage.setItem('student_id', exercise_student.student_id.toString());
        localStorage.setItem('student_name', exercise_student.student_name.toString());
        localStorage.setItem('exercise_name', exercise_student.exercise_name);
        localStorage.setItem('exercise_id', exercise_student.exercise_id.toString());
        history.push({
            pathname: path
        });
    }

    const routeChange1 = (exercise_student: IExerciseParent) => {
        localStorage.removeItem('exercise_description');
        localStorage.removeItem('exercise_name');
        localStorage.removeItem('exercise_level_name');
        localStorage.removeItem('exercise_id');
        localStorage.removeItem('deadline');
        localStorage.setItem('student_id', exercise_student.student_id.toString());
        localStorage.setItem('student_name', exercise_student.student_name.toString());
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
        localStorage.removeItem('exercise_submission_id');
        localStorage.setItem('exercise_submission_id', exercise_student.id.toString())
        localStorage.removeItem('time_submit');
        localStorage.setItem('time_submit', exercise_student.update_time.toString())
        localStorage.removeItem('description');
        localStorage.setItem('exercise_description', exercise_student.exercise_description);
        localStorage.setItem('description', exercise_student.exercise_description.toString())
        localStorage.removeItem('deadline');
        localStorage.setItem('deadline', exercise_student.exercise_deadline);
        localStorage.setItem('student_id', exercise_student.student_id.toString());
        localStorage.setItem('student_name', exercise_student.student_name.toString());
        localStorage.setItem('exercise_name', exercise_student.exercise_name);
        localStorage.setItem('exercise_id', exercise_student.exercise_id.toString());
        history.push({
            pathname: path
        });
    }

    const onChangeRoute = (section: ISection, is_active: string, link_record: string) => {
        let path = "/classes/section";
        localStorage.removeItem('section_id')
        localStorage.setItem('section_id', section.id.toString())
        localStorage.removeItem('section_number')
        localStorage.setItem('section_number', section.number.toString())
        let tutorial_page_list: any[] = []
        localStorage.removeItem('tutorial_name')
        localStorage.removeItem('tutorial_id')
        localStorage.setItem('is_active', is_active)
        localStorage.removeItem('link_record')
        localStorage.setItem('link_record', link_record)
        tutorials.tutorials.map(ele => {
            if (ele.section_id === section.id) {
                localStorage.setItem('tutorial_id', ele.id.toString())
                localStorage.setItem('tutorial_name', ele.name.toString())
                tutorial_pages.tutorialPages.map(element => {
                    if (element.tutorial_id === ele.id) {
                        tutorial_page_list.push({
                            description: element.description,
                            id: element.id,
                            name: element.name,
                            tutorial_id: element.tutorial_id,
                            number: element.number
                        })
                    }
                    return null
                })
            }
            return null
        })
        console.log(tutorial_page_list)
        localStorage.removeItem('description_tutorial_page_list')
        localStorage.setItem('description_tutorial_page_list', JSON.stringify(tutorial_page_list.sort((a, b) => a.number - b.number)))
        history.push({
            pathname: path
        })
    }

    const routeChange = () =>{ 
        let path = '/class/exercise-student'; 
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', filter.toString());
        localStorage.removeItem('class_id');
        localStorage.setItem('class_id', class_id.toString());
        history.push({
            pathname: path,
        });
    }

    function handleRequestOff(student_leave: IStudentLeave) {
        localStorage.setItem('section_id', student_leave.section_id.toString())
        localStorage.setItem('section_number', student_leave.section_number.toString())
        localStorage.setItem('student_leave_id', student_leave.id.toString())
        localStorage.setItem('resson', student_leave.description)
        localStorage.setItem('student_id', student_leave.student_id.toString())
        localStorage.setItem('student_name', student_leave.student_name)
        dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Edit))
        onAnonymousNotificationRemove()
    }

    function handleRequestOffEnd(student_leave: IStudentLeave) {
        localStorage.setItem('section_id', student_leave.section_id.toString())
        localStorage.setItem('section_number', student_leave.section_number.toString())
        localStorage.setItem('student_leave_id', student_leave.id.toString())
        localStorage.setItem('resson', student_leave.description)
        localStorage.setItem('student_id', student_leave.student_id.toString())
        localStorage.setItem('student_name', student_leave.student_name)
        dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Remove))
        onAnonymousNotificationRemove()
    }


    let datas: string[] = []
    let list_link_record: string[] = []
    let total_time = "";
    let check_active: string[] = [];

    if (time_schedules.timeSchedules.length > 1 && promiseInProgress === false) {
        if (time_schedules.timeSchedules[0] !== undefined && time_schedules.timeSchedules[0] !== null) {
            var start_time_0 = time_schedules.timeSchedules[0].start_time.split("T");
            var end_time_0 = time_schedules.timeSchedules[0].end_time.split("T");
            var hour_start = parseInt(start_time_0[1].substring(0, 2));
            var minus_tart = parseInt(start_time_0[1].substring(3, 5));
            var sercon_start = parseInt(start_time_0[1].substring(6, 8));
            var hour_end = parseInt(end_time_0[1].substring(0, 2));
            var minus_end = parseInt(end_time_0[1].substring(3, 5));
            var sercon_end = parseInt(end_time_0[1].substring(6, 8));

            total_time = (hour_end - hour_start).toString() + " giờ " + (minus_end - minus_tart).toString() + " phút " + (sercon_end - sercon_start).toString() + " giây";
            time_schedules.timeSchedules.map((ele, index) => {
                var start_date = new Date(ele.start_time);
                var end_date = new Date(ele.end_time);
                const link = "https://recording-jitsi-chung.s3.ap-southeast-1.amazonaws.com/recording/"
                const class_id = 1;
                const days = ele.end_time;
                let str = link + class_id.toString() + "_" + days.slice(0, 10) + ".mp4";
                list_link_record.push(str);
                // Do your operations
                var date_now = new Date();

                if ((start_date.getTime() - date_now.getTime()) / 1000 > 86400) {
                    check_active.push('Chưa diễn ra');
                }
                else if ((start_date.getTime() - date_now.getTime()) / 1000 < 86400 && (date_now.getTime() - start_date.getTime()) / 1000 < 0) {
                    check_active.push('Chuẩn bị diễn ra');
                }
                else if ((date_now.getTime() - start_date.getTime()) / 1000 > 0 && (end_date.getTime() - date_now.getTime()) / 1000 > 0) {
                    check_active.push('Đang diễn ra');
                }
                else {
                    check_active.push('Đã diễn ra');
                }

                var start_time = ele.start_time.split("T");
                var end_time = ele.end_time.split("T");
                return datas.push("Từ " + start_time[0] + " " + start_time[1] + " -> " + end_time[0] + " " + end_time[1])
            })
        }

        let total_section_end = check_active.filter(x => x === 'Đã diễn ra' || x === 'Đang diễn ra').length
        localStorage.setItem('total_section_end', total_section_end.toString())
    }

    function handleFilter() {
        trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id,filter))
    }

    function handleChangeToSection() {
        let path = '/classes/section'; 
        localStorage.removeItem('class_id');
        localStorage.setItem('class_id', class_id.toString());
        history.push({
            pathname: path,
        });
    }


    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-student">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
                <ToastContainer />

                {
                    function () {
                        if (requestId1 !== 0) {
                            return (
                                <Popup
                                    open={popup3}
                                    onClose={() => setPopup3(false)}
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
                                                    if (requestId1 === 0) {
                                                        return;
                                                    }
                                                    const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                        position: toast.POSITION.TOP_CENTER
                                                    });
                                                    dispatch(deleteStudentLeaveByParent(requestId1, idx))
                                                    setPopup3(false);
                                                }}>Remove
                                            </button>
                                        </div>
                                    </div>
                                </Popup>
                            )
                        }
                    }()
                }

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
                                                    dispatch(deleteExerciseSubmissionParent(requestId, idx))
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
                    <TopCard title="SỐ BUỔI ĐÃ HỌC" text={`${check_active.filter((ele, index) => ele === "Đã diễn ra").length}/${sections.sections.length}`} icon="book" class="primary" />
                    <TopCard title="SỐ BÀI KIỂM TRA CHƯA LÀM" text={`${numberNotSubmitNowCount}`} icon="book" class="danger" />
                    <TopCard title="NGHỈ HỌC" text={`${student_leaves.leaves.length}`} icon="book" class="danger" />
                    <div className="col-xl-3 col-md-3 mb-4" id="content-button-create-teacher-level">
                        <button
                            className="btn btn-success btn-green"
                            id="btn-create-teacher-level"
                            onClick={() => {
                                dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Create))
                                onAnonymousNotificationRemove()
                            }}
                        >
                            <i className="fas fa fa-plus"></i>
                            Đăng kí nghỉ học
                        </button>
                    </div>
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
                        }}>Thống kê</h6>

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
                            }}>Bài tập</h6>
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
                            }}>Nghỉ học</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                </div>

                <Popup
                    open={popup1}
                    onClose={() => setPopup1(false)}
                    closeOnDocumentClick
                >
                    <>
                        {
                            function () {
                                if ((anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Create || anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Edit || anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Remove)) {
                                    return <RequestOffSectionForm isCheck={onRemovePopup1} />
                                }
                            }()
                        }
                    </>
                </Popup>

                {
                    function () {
                        if (checked1 === true) {
                            return (
                                <>
                                    <div className="row">
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
                                            <div className="row justify-content-center">
                                                <button
                                                    className="btn btn-success btn-green"
                                                    id="btn-into-class-student"
                                                    onClick={() => { handleChangeToSection() }}
                                                >
                                                    Buổi học
                                                    <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-md-6 mb-4">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="right-sort float-right">
                                                        <div className="sort-by mr-3">
                                                            <span className="ml-1 mr-1">Học sinh:</span>

                                                            <select name="cars" id="cars"
                                                                value={filter}
                                                                onChange={handleChange}
                                                            >
                                                                <option value={0} selected>Choose</option>
                                                                {
                                                                    childs_classes.childs_class.map((ele, idx) => {
                                                                        return (
                                                                            <option value={ele.student_id}>{ele.student_name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            <button className="btn btn-outline-dark btn-sm ml-3 filter" type="button" onClick={() => handleFilter()}>Lọc&nbsp;<i className="fa fa-flask"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        else if (checked2 === true) {
                            return (
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Bài kiểm tra cần làm</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        exercise_students.exercise_not_submit.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row section-ele row-section mb-4 ml-2 mr-2" onClick={() => { routeChange1(ele) }}>
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
                                                                            

                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Học sinh:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.student_name} 
                                                                                </div>
                                                                            </div>

                                                                            <div className="row mb-2">
                                                                                <div className="col-md-5">
                                                                                    Trạng thái:
                                                                                </div>
                                                                                <div className="col-md-7 status-score">
                                                                                    Chưa nộp
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

                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Bài kiểm tra đã nộp</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        exercise_submissions.exercise_gradeds.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row section-ele row-section-1 mb-4 ml-2 mr-2" onClick={() => { routeChange2(ele) }}>
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
                                                                            

                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Học sinh:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.student_name} 
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
                                                                                                setRequestId(ele.id);
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
                                                                            

                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Học sinh:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.student_name} 
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
                            )
                        }
                        else if (checked3 === true) {
                            return (
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Chưa duyệt</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light ">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        student_leaves.leaves.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row section-ele row-section mb-4 ml-2 mr-2" onClick={() => { handleRequestOff(ele) }}>
                                                                        <div className="col-xl-3 col-md-3 avatar-x">
                                                                            <img className="img-exam" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1669002056/1497835_nexeoq.png" alt="" />
                                                                        </div>
                                                                        <div className="col-xl-9 col-md-9 mt-2">
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Buổi nghỉ:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    <div className="row">
                                                                                        <div className="col-md-9">
                                                                                            {ele.section_number}
                                                                                        </div>
                                                                                        <div className="col-md-3">
                                                                                            <BsFillTrashFill color="#dc3545" onClick={(e) => {
                                                                                                e.stopPropagation(); 
                                                                                                setRequestId1(ele.id);
                                                                                                setPopup3(true)
                                                                                            }}/>
                                                                                        </div>
                                                                                    </div> 
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Học sinh:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.student_name}
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Thời gian gửi:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.update_time.replaceAll("T", " ").substring(0, 16)}
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

                                    <div className="col-xl-6 col-md-6 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Đã duyệt</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light ">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        student_leaves.acceptLeaves.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row section-ele row-section-1 mb-4 ml-2 mr-2" onClick={() => { handleRequestOffEnd(ele) }}>
                                                                        <div className="col-xl-3 col-md-3 avatar-x">
                                                                            <img className="img-exam" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1669002056/1497835_nexeoq.png" alt="" />
                                                                        </div>
                                                                        <div className="col-xl-9 col-md-9 mt-2">
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Buổi nghỉ:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.section_number}
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Học sinh:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.student_name}
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Thời gian gửi:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.update_time.replaceAll("T", " ").substring(0,16)}
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
                            )
                        }
                    }()
                }
            </Fragment>
    );
};

export default DetailClassParent;
