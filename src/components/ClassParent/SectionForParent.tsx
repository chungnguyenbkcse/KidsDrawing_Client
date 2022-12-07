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
import { IAnonymousNotificationState, IExerciseStudentState, IExerciseSubmissionState, IRootPageStateType, ISectionState, IStateType, IStudentLeaveState, ITimeScheduleState, ITutorialPageState, ITutorialState } from "../../store/models/root.interface";
import RequestOffSectionForm from "./RequestOffSectionForm";
import { ISection } from "../../store/models/section.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getStudentLeaveByClassAndStudent } from "../../common/service/StudentLeave/GetStudentLeaveByClassStudent";
import { getExerciseForClassStudent } from "../../common/service/ExerciseStudent/GetExerciseForClassStudent";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { IExerciseStudent } from "../../store/models/exercise_student.interface";
import { toast, ToastContainer } from "react-toastify";
import { getExerciseSubmissionByClassAndStudent } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByClassAndStudent";
import { IExerciseSubmission } from "../../store/models/exercise_submission.interface";
import { IStudentLeave } from "../../store/models/student_leave.interface";
import { getSectionByClassAndStudent } from "../../common/service/Section/GetSectionByClassAndStudent";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteExerciseSubmission } from "../../common/service/ExerciseSubmission/DeleteExerciseSubmissionById";
import { deleteStudentLeave } from "../../common/service/StudentLeave/DeleteStudentLeaveById";
import { getSectionByClassAndParent } from "../../common/service/Section/GetSectionByClassAndParent";


const SectionForParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);
    const tutorials: ITutorialState = useSelector((state: IStateType) => state.tutorials);
    const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);
    const tutorial_pages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    const student_leaves: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const exercise_students: IExerciseStudentState = useSelector((state: IStateType) => state.exercise_students);
    const { promiseInProgress } = usePromiseTracker();

    const [totalPage, setTotalPage] = useState(0)
    const [element, setElement] = useState<ISection[]>([])
    const [page, setPage] = useState(0)
    useEffect(() => {
        let x = (sections.sections.length - sections.sections.length % 6) / 6;
        if (x === 0) {
            setElement(sections.sections.sort((a, b) => a.number - b.number))
        }
        else {
            setElement(sections.sections.sort((a, b) => a.number - b.number).slice(0, 6))
        }

        setTotalPage((x + 1))
    }, [sections.sections])

    console.log((totalPage))

    function handlePagination(count: number) {
        console.log(count)
        setPage(count)
        if (count === totalPage) {
            setElement(sections.sections.sort((a, b) => a.number - b.number).slice(count * 6))
        }
        else {
            setElement(sections.sections.sort((a, b) => a.number - b.number).slice(count * 6, count * 6 + 6))
        }
    }

    var id_zz = localStorage.getItem('student_ids');
    let total: number[] = [];
    if (id_zz !== null) {
        total = JSON.parse(id_zz)
    }


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

    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

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
                    trackPromise(getInfoMyClass(dispatch, class_id))
                    trackPromise(getSectionByClassAndParent(dispatch, class_id, id, total.length))
                }
            }
            else {
                trackPromise(getInfoMyClass(dispatch, class_id))
                trackPromise(getSectionByClassAndParent(dispatch, class_id, id, total.length))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id, id, total.length]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp học", "Buổi học"));
    }, [path.area, dispatch]);

    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);
    const [requestId, setRequestId] = useState(0);
    const [popup3, setPopup3] = useState(false);
    const [requestId1, setRequestId1] = useState(0);

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
        localStorage.removeItem('exercise_submission_id');
        localStorage.setItem('exercise_submission_id', exercise_student.id.toString())
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

    const onChangeRoute = (section: ISection, is_active: string, link_record: string) => {
        let path = "/section/detail";
        localStorage.removeItem('section_id')
        localStorage.setItem('section_id', section.id.toString())
        localStorage.removeItem('section_number')
        localStorage.setItem('section_number', section.number.toString())
        let tutorial_page_list: any[] = []
        localStorage.removeItem('tutorial_name')
        localStorage.removeItem('section_id')
        localStorage.setItem('is_active', is_active)
        localStorage.removeItem('link_record')
        localStorage.setItem('link_record', link_record)
        tutorials.tutorials.map(ele => {
            if (ele.section_id === section.id) {
                localStorage.setItem('section_id', ele.id.toString())
                localStorage.setItem('tutorial_name', ele.name.toString())
                tutorial_pages.tutorialPages.map(element => {
                    if (element.section_id === ele.id) {
                        tutorial_page_list.push({
                            description: element.description,
                            id: element.id,
                            section_id: element.section_id,
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

    function handleRequestOff(student_leave: IStudentLeave) {
        localStorage.setItem('section_id', student_leave.section_id.toString())
        localStorage.setItem('section_number', student_leave.section_number.toString())
        localStorage.setItem('student_leave_id', student_leave.id.toString())
        localStorage.setItem('resson', student_leave.description)
        dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Edit))
        onAnonymousNotificationRemove()
    }

    function handleRequestOffEnd(student_leave: IStudentLeave) {
        localStorage.setItem('section_id', student_leave.section_id.toString())
        localStorage.setItem('section_number', student_leave.section_number.toString())
        localStorage.setItem('student_leave_id', student_leave.id.toString())
        localStorage.setItem('resson', student_leave.description)
        dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Remove))
        onAnonymousNotificationRemove()
    }


    let data: string[] = []
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
                return data.push("Từ " + start_time[0] + " " + start_time[1] + " -> " + end_time[0] + " " + end_time[1])
            })
        }

        let total_section_end = check_active.filter(x => x === 'Đã diễn ra' || x === 'Đang diễn ra').length
        localStorage.setItem('total_section_end', total_section_end.toString())
    }

    function checkActive(index: number) {
        if (check_active[index] === "Chưa diễn ra") {
            return "not_active_now";
        }
        else if (check_active[index] === "Chuẩn bị diễn ra") {
            return 'pre_active_now';
        }
        else if (check_active[index] === "Đang diễn ra") {
            return 'active_now';
        }
        else {
            return "not_active";
        }
    }


    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-student">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
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
                                                    dispatch(deleteExerciseSubmission(requestId, idx))
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
                    <TopCard title="SỐ BUỔI ĐÃ HỌC" text={`${check_active.filter((ele, index) => ele === "Đã diễn ra").length}/${numberSectionCount}`} icon="book" class="primary" />
                    <TopCard title="SỐ BÀI KIỂM TRA CHƯA LÀM" text={`${numberNotSubmitNowCount}`} icon="book" class="danger" />
                </div>




                <div className="row">
                    {
                        element.sort((a, b) => a.number - b.number).map((ele, index) => {
                            if (checkActive(page * 6 + index) === "not_active_now") {
                                return (
                                    <div className="col-xl-6 col-md-6 mb-4 pr-4 pl-4">
                                        <div className={`row section-ele row-section mb-2 ${checkActive(page * 6 + index)}`} onClick={() => { onChangeRoute(ele, checkActive(page * 6 + index), "") }}>
                                            <div className="col-xl-2 col-md-2 pt-4 pb-4 avatar-x">
                                                <img className="img-exam" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667395965/inl1eekblioz9s5iqed1.png" alt="" />
                                            </div>
                                            <div className="col-xl-10 col-md-10">
                                                <div className="row mt-2">
                                                    <div className="col-md-3">
                                                        Buổi {ele.number}
                                                    </div>
                                                    <div className="col-md-9 not-active-xx">
                                                        {ele.name}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Lịch học:
                                                    </div>
                                                    <div className="col-md-9 not-active-xx">
                                                        {data[index]}
                                                    </div>
                                                </div>
                    
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Hình thức:
                                                    </div>
                                                    <div className="col-md-9 not-active-xx">
                                                        {ele.teach_form === true ? "Dạy bằng jisti" : "Đọc hiểu giáo trình"}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Giáo viên:
                                                    </div>
                                                    <div className="col-md-9 not-active-xx">
                                                        {ele.teacher_name}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-3">

                                                    </div>
                                                    <div className="col-md-9 xs-centxxx">
                                                        Chưa diễn ra
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                            else if (checkActive(page * 6 + index) === "pre_active_now") {
                                return (
                                    <div className="col-xl-6 col-md-6 mb-4 pr-4 pl-4">
                                        <div className={`row section-ele row-section mb-2 ${checkActive(page * 6 + index)}`} onClick={() => { onChangeRoute(ele, checkActive(page * 6 + index), "") }}>
                                            <div className="col-xl-2 col-md-2 pt-4 pb-4 avatar-x">
                                                <img className="img-exam" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667395965/inl1eekblioz9s5iqed1.png" alt="" />
                                            </div>
                                            <div className="col-xl-10 col-md-10">
                                                <div className="row mt-2">
                                                    <div className="col-md-3">
                                                        Buổi {ele.number}
                                                    </div>
                                                    <div className="col-md-9">
                                                        {ele.name}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Lịch học:
                                                    </div>
                                                    <div className="col-md-9">
                                                        {data[index]}
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Hình thức:
                                                    </div>
                                                    <div className="col-md-9">
                                                        {ele.teach_form === true ? "Dạy bằng jisti" : "Đọc hiểu giáo trình"}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Giáo viên:
                                                    </div>
                                                    <div className="col-md-9">
                                                        {ele.teacher_name}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-3">

                                                    </div>
                                                    <div className="col-md-9 xs-centxx">
                                                        Chuẩn bị diễn ra
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                            else if (checkActive(page * 6 + index) === "active_now") {
                                return (
                                    <div className="col-xl-6 col-md-6 mb-4 pr-4 pl-4">
                                        <div className={`row section-ele row-section mb-2 ${checkActive(page * 6 + index)}`} onClick={() => { onChangeRoute(ele, checkActive(page * 6 + index), "") }}>
                                            <div className="col-xl-2 col-md-2 pt-4 pb-4 avatar-x">
                                                <img className="img-exam" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667395965/inl1eekblioz9s5iqed1.png" alt="" />
                                            </div>
                                            <div className="col-xl-10 col-md-10">
                                                <div className="row mt-2">
                                                    <div className="col-md-3">
                                                        Buổi {ele.number}
                                                    </div>
                                                    <div className="col-md-9">
                                                        {ele.name}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Lịch học:
                                                    </div>
                                                    <div className="col-md-9">
                                                        {data[index]}
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Hình thức:
                                                    </div>
                                                    <div className="col-md-9">
                                                        {ele.teach_form === true ? "Dạy bằng jisti" : "Đọc hiểu giáo trình"}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        Giáo viên:
                                                    </div>
                                                    <div className="col-md-9">
                                                        {ele.teacher_name}
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-3">

                                                    </div>
                                                    <div className="col-md-9 xs-centx">
                                                        Đang diễn ra
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                            return (
                                <div className="col-xl-6 col-md-6 mb-4 pr-4 pl-4">
                                    <div className={`row section-ele row-section mb-2 ${checkActive(page * 6 + index)}`} onClick={() => { onChangeRoute(ele, checkActive(page * 6 + index), list_link_record[index]) }}>
                                        <div className="col-xl-2 col-md-2 pt-4 pb-4 avatar-x">
                                            <img className="img-exam" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667395965/inl1eekblioz9s5iqed1.png" alt="" />
                                        </div>
                                        <div className="col-xl-10 col-md-10">
                                            <div className="row mt-2">
                                                <div className="col-md-3">
                                                    Buổi {ele.number}
                                                </div>
                                                <div className="col-md-9">
                                                    {ele.name}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    Lịch học:
                                                </div>
                                                <div className="col-md-9">
                                                    {data[index]}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-4" style={{ color: "#7A67C7", fontWeight: "bold" }}>
                                                    Bài chưa nộp:
                                                </div>
                                                <div className="col-sm-8 xs-cent" style={{ paddingRight: "200px" }}>
                                                    {ele.total_exercise_not_submit}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    Hình thức:
                                                </div>
                                                <div className="col-md-9">
                                                    {ele.teach_form === true ? "Dạy bằng jisti" : "Đọc hiểu giáo trình"}
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-3">
                                                    Giáo viên:
                                                </div>
                                                <div className="col-md-9">
                                                    {ele.teacher_name}
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-3">

                                                </div>
                                                <div className="col-md-9 xs-cent">
                                                    Đã kết thúc
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                    <div className="d-flex justify-content-end text-right mt-2 ml-4">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" aria-label="Previous" href="javascript:void(0);" onClick={(e) => e.preventDefault()}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {
                                    Array.from(Array((totalPage)).keys()).map((ele, idx) => {
                                        return (
                                            <li className="page-item"><a className="page-link" href="javascript:void(0);" onClick={(e) => {
                                                e.preventDefault()
                                                handlePagination(ele)
                                            }}>{ele + 1}</a></li>
                                        )
                                    })
                                }
                                <li className="page-item">
                                    <a className="page-link" aria-label="Next" href="javascript:void(0);" onClick={(e) => e.preventDefault()}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </Fragment>
    );
};

export default SectionForParent;
