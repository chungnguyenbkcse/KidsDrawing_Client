import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import TopCard from "../../common/components/TopCardUser";
import { getExerciseSubmissionByClass } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByClass";
import { getSectionByClass } from "../../common/service/Section/GetSectionByClass";
import { getTeacherLeaveByTeacher } from "../../common/service/TeacherLeave/GetTeacherLeaveByTeacher";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IExerciseSubmissionState, IRootPageStateType, ISectionState, IStateType, ITeacherLeaveState, ITimeScheduleState, ITutorialPageState } from "../../store/models/root.interface";
import "./DetailClassTeacher.css"
import RequestOffSectionForm from "./RequestOffSectionForm";
import { ISection } from "../../store/models/section.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { IExerciseSubmission } from "../../store/models/exercise_submission.interface";
import { ITeacherLeave } from "../../store/models/teacher_leave.interface";


const DetailClassTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const time_schedules: ITimeScheduleState = useSelector((state: IStateType) => state.time_schedules);
    const tutorial_pages: ITutorialPageState = useSelector((state: IStateType) => state.tutorial_pages);
    const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
    const teacher_leaves: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);
    console.log(tutorial_pages)
    const { promiseInProgress } = usePromiseTracker();

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberNotApprovedNowCount: number = exercise_submissions.exercise_not_gradeds.length;
    var id_x = localStorage.getItem('id');
    var id: any = "";
    if (id_x !== null) {
        id = id_x;
    }

    var id_y = localStorage.getItem('class_id');

    let class_id: number = 0;

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
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getInfoMyClass(dispatch, class_id))
                    trackPromise(getSectionByClass(dispatch, class_id))
                    trackPromise(getTeacher(dispatch))
                    trackPromise(getExerciseSubmissionByClass(dispatch, class_id))
                    trackPromise(getTeacherLeaveByTeacher(dispatch, id))
                }
            }
            else {
                trackPromise(getInfoMyClass(dispatch, class_id))
                trackPromise(getSectionByClass(dispatch, class_id))
                trackPromise(getTeacher(dispatch))
                trackPromise(getExerciseSubmissionByClass(dispatch, class_id))
                trackPromise(getTeacherLeaveByTeacher(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, class_id, id]);

    useEffect(() => {
        dispatch(updateCurrentPath("Lớp học", "Buổi học"));
    }, [path.area, dispatch]);

    const [popup1, setPopup1] = useState(false);

    function onAnonymousNotificationRemove() {
        setPopup1(true);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    const history = useHistory();

    const routeChange1 = (exercise_submission: IExerciseSubmission) => {
        let path = '/exercise-grade';
        localStorage.setItem('student_name', exercise_submission.student_name);
        localStorage.setItem('student_id', exercise_submission.student_id.toString())
        localStorage.setItem('exercise_submission_id', exercise_submission.id.toString())
        localStorage.setItem('exercise_name', exercise_submission.exercise_name)
        localStorage.setItem('exercise_id', exercise_submission.exercise_id.toString())
        localStorage.setItem('image_url_exercise_submission', exercise_submission.image_url)
        localStorage.setItem('time_submit', exercise_submission.update_time)
        history.push({
            pathname: path
        });
    }

    const routeChange2 = (teacher_leave: ITeacherLeave) => {
        localStorage.setItem('section_name', teacher_leave.section_name);
        localStorage.setItem('section_number', teacher_leave.section_number.toString());
        localStorage.setItem('section_id', teacher_leave.section_id.toString());
        localStorage.setItem('teacher_name', teacher_leave.teacher_name.toString());
        localStorage.setItem('substitute_teacher_id', teacher_leave.substitute_teacher_id.toString());
        localStorage.setItem('substitute_teacher_name', teacher_leave.substitute_teacher_name.toString());
        localStorage.setItem('description', teacher_leave.description.toString());
        localStorage.setItem('update_time', teacher_leave.update_time);
        localStorage.setItem('class_name', teacher_leave.class_name);
        localStorage.setItem('teacher_leave_id', teacher_leave.id.toString())
        dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Edit))
        onAnonymousNotificationRemove()
    }

    const onChangeRoute = (section: ISection) => {
        let path = "/classes/section";
        localStorage.removeItem('section_id')
        localStorage.setItem('section_id', section.id.toString())
        localStorage.removeItem('section_number')
        localStorage.setItem('section_number', section.number.toString())
        localStorage.removeItem('recording')
        localStorage.setItem('recording', section.recording !== undefined ? section.recording : "")
        /* let tutorial_page_list: any[] = []
        localStorage.removeItem('tutorial_name')
        localStorage.removeItem('tutorial_id')
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
        localStorage.setItem('description_tutorial_page_list', JSON.stringify(tutorial_page_list.sort((a, b) => a.number - b.number))) */
        history.push({
            pathname: path
        })
    }

    let data: string[] = []
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
                // Do your operations
                var date_now = new Date();

                if ((date_now.getTime() - start_date.getTime()) / 1000 < 0) {
                    check_active.push('Chưa diễn ra');
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
    }

    function checkActive(index: number) {
        if (check_active[index] === "Chưa diễn ra") {
            return "not_active_now";
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
                    <TopCard title="SỐ BUỔI ĐÃ DẠY" text={`${check_active.filter((ele, index) => ele === "Đã diễn ra").length}`} icon="book" class="primary" />
                    <TopCard title="SỐ BÀI KIỂM TRA CHƯA CHẤM" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                    <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                        <button
                            className="btn btn-success btn-green"
                            id="btn-create-teacher-level"
                            onClick={() => {
                                dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Create))
                                onAnonymousNotificationRemove()
                            }}
                        >
                            <i className="fas fa fa-plus"></i>
                            Đăng kí nghỉ dạy
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
                        }}>Buổi học</h6>

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
                            }}>Bài tập chưa chấm</h6>
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
                            }}>Nghỉ dạy</h6>
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
                                if ((anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Create || anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Edit)) {
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
                                <div className="row">
                                    {
                                        sections.sections.sort((a, b) => a.number - b.number).map((ele, index) => {
                                            return (
                                                <div className="col-xl-6 col-md-6 mb-4 pr-4 pl-4">
                    

                                                    <div className={`row section-ele row-section mb-2 ${checkActive(index)}`} onClick={() => { onChangeRoute(ele) }}>
                                                        <div className="col-xl-2 col-md-2 avatar-x">
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
                                                                    Thời lượng:
                                                                </div>
                                                                <div className="col-md-9">
                                                                    {total_time}
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
                                                        </div>
                                                    </div>

                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            )
                        }
                        else if (checked2 === true) {
                            return (
                                <div className="row mb-4">
                                    <div className="col-xl-6 col-md-6">
                                        <h3 className=" mb-2" id="level-teacher">Bài kiểm tra cần chấm</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        exercise_submissions.exercise_not_gradeds.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row row-section mb-4 ml-2 mr-2" onClick={() => { routeChange1(ele) }}>
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
                                                                                    Học sinh:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.student_name}
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Thời gian nộp bài:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.update_time.replaceAll("T", " ")}
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
                                        <h3 className=" mb-2" id="level-teacher">Yêu cầu nghỉ dạy</h3>
                                        <div className="table-responsive portlet table-section">
                                            <table className="table">
                                                <thead className="thead-light ">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        teacher_leaves.leaves.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                    <div className="row row-section mb-4 ml-2 mr-2" onClick={() => { routeChange2(ele) }}>
                                                                        <div className="col-xl-3 col-md-3 avatar-x">
                                                                            <img className="img-exam mt-2 mb-2" src="http://res.cloudinary.com/djtmwajiu/image/upload/v1667399584/wazcmdgbmxy2amdmjjdv.png" alt="" />
                                                                        </div>
                                                                        <div className="col-xl-9 col-md-9 mt-2">
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Buổi:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.section_number}
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Giáo viên thay:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.substitute_teacher_name}
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    Trạng thái:
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                    {ele.status}
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

export default DetailClassTeacher;
