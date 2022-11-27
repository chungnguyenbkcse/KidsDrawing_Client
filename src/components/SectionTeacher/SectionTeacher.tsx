import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Popup from "reactjs-popup";
import { getExerciseBySection } from "../../common/service/Exercise/GetExerciseBySection";
import { getExerciseLevel } from "../../common/service/ExerciseLevel/GetExerciseLevel";
import { getSectionById } from "../../common/service/Section/GetSectionById";
import { logout } from "../../store/actions/account.actions";
import { setModificationState } from "../../store/actions/exercise.action";
import { ExerciseModificationStatus, IExercise } from "../../store/models/exercise.interface";
import { IClassTeacherState, IExerciseState, IExerciseTeacherState, ILessonState, ISectionState, IStateType, ITutorialPageState, ITutorialState, IUserRegisterTutorialState, IUserState } from "../../store/models/root.interface";
import ExerciseForm from "../Exercise/ExerciseForm";
import "./SectionTeacher.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getClassTeacher } from "../../common/service/ClassTeacher/GetClassTeacher";
import { getTutorialPageBySection } from "../../common/service/TutorialPage/GetTutorialPageBySection";
import { getTutorialBySection } from "../../common/service/Tutorial/GetTutorialBySection";
import SubmitRecordForm from "./SubmitRecordForm";
import { getExerciseTeacherBySection } from "../../common/service/Exercise/GetExerciseTeacherBySection";
import { IUserRegisterTutorial } from "../../store/models/user_register_tutorial.interface";
import { getUserRegisterTutorialBySection } from "../../common/service/UserRegisterTutorial/GetUserRegisterTutorialBySection";
import { BsFillTrashFill } from "react-icons/bs";
import { LessonModificationStatus } from "../../store/models/lesson.interface";
import { deleteUserRegisterTutorial } from "../../common/service/UserRegisterTutorial/DeleteUserRegisterTutorial";

const SectionTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const lessons: ILessonState = useSelector((state: IStateType) => state.lessons);
    const user_register_tutorials: IUserRegisterTutorialState = useSelector((state: IStateType) => state.user_register_tutorials);
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const exercises: IExerciseState = useSelector((state: IStateType) => state.exercises);
    const exercise_teachers: IExerciseTeacherState = useSelector((state: IStateType) => state.exercise_teachers);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const tutorial_pages: ITutorialPageState | null = useSelector((state: IStateType) => state.tutorial_pages);
    const tutorials: ITutorialState | null = useSelector((state: IStateType) => state.tutorials);
    const class_teachers: IClassTeacherState = useSelector((state: IStateType) => state.class_teachers);
    console.log(users.teachers)

    const [popup, setPopup] = useState(false);
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);
    const [requestId, setRequestId] = useState(0);

    const { promiseInProgress } = usePromiseTracker();

    function onExerciseRemove() {
        setPopup(true);
    }

    function onRecordRemove() {
        setPopup1(true);
    }

    function onRemovePopup(value: boolean) {
        setPopup(false);
    }

    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    function onRemovePopup2(value: boolean) {
        setPopup2(false);
    }

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

    var id_k = localStorage.getItem('is_active');
    var is_active = "";
    if (id_k !== null) {
        is_active = (id_k);
    }

    let link_jisti = "";
    if (class_teachers.class_doing.length > 0) {
        class_teachers.class_doing.map((ele, idx) => {
            if (ele.id === class_id) {
                link_jisti = ele.link_url;
            }
            return ele
        })
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
                    trackPromise(getClassTeacher(dispatch, id))
                    trackPromise(getSectionById(dispatch, section_id))
                    trackPromise(getExerciseTeacherBySection(dispatch, section_id))
                    trackPromise(getUserRegisterTutorialBySection(dispatch, section_id))
                    trackPromise(getExerciseLevel(dispatch))
                    trackPromise(getTutorialPageBySection(dispatch, section_id))
                    trackPromise(getTutorialBySection(dispatch, section_id))
                }
            }
            else {
                trackPromise(getClassTeacher(dispatch, id))
                trackPromise(getSectionById(dispatch, section_id))
                trackPromise(getUserRegisterTutorialBySection(dispatch, section_id))
                trackPromise(getExerciseTeacherBySection(dispatch, section_id))
                trackPromise(getExerciseLevel(dispatch))
                trackPromise(getTutorialPageBySection(dispatch, section_id))
                trackPromise(getTutorialBySection(dispatch, section_id))
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

    const routeChange4 = () => {
        if (link_jisti !== null) {
            window.open(link_jisti, '_blank');
        }
    }

    const routeChange5 = () => {
        let path = "/attendance";
        history.push({
            pathname: path
        });
    }

    const onChangeRoute1 = () => {
        localStorage.removeItem('description_tutorial_page_list')
        localStorage.setItem('description_tutorial_page_list', JSON.stringify(tutorial_pages.tutorialPages.sort((a, b) => a.number - b.number)))
        let path = "/section/edit";
        if (tutorials !== null && tutorials.tutorials.length > 0) {
            localStorage.setItem('tutorial_name', tutorials.tutorials[0].name);
            localStorage.setItem('tutorial_id', tutorials.tutorials[0].id.toString())
        }
        history.push({
            pathname: path,
            state: { section_id: section_id }
        })
    }

    const routeChange3 = (exercise: IExercise) => {
        let path = '/exercise';
        localStorage.removeItem('exercise_description');
        localStorage.removeItem('exercise_name');
        localStorage.removeItem('exercise_level_name');
        localStorage.removeItem('exercise_id');
        localStorage.setItem('exercise_description', exercise.description);
        localStorage.setItem('exercise_name', exercise.name);
        localStorage.setItem('exercise_level_name', exercise.level_name);
        localStorage.setItem('exercise_id', exercise.id.toString());
        localStorage.removeItem('deadline');
        localStorage.setItem('deadline', exercise.deadline);
        history.push({
            pathname: path
        });
    }

    function handleView(ele: IUserRegisterTutorial) {
        localStorage.removeItem('user_register_tutorial_id')
        localStorage.setItem('user_register_tutorial_id', ele.id.toString())
        localStorage.removeItem('section_id')
        localStorage.setItem('section_id', ele.section_id.toString())
        localStorage.removeItem('section_number')
        localStorage.setItem('section_number', ele.section_number.toString())
        localStorage.removeItem('user_register_tutorial_name')
        localStorage.setItem('user_register_tutorial_name', ele.name.toString())
        let path = "/user-register-tutorial/edit";
        history.push({
            pathname: path
        });
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
                {
                    function () {
                        if (sections.sections.length <= 0) {
                            return ""
                        }
                        else {
                            if (is_active === "not_active_now" || is_active === "pre_active_now") {
                                return <div className="row mb-2">
                                    <div className="col-xl-4 col-md-4 col-xs-4 md-4 ">
                                        <button
                                            className="btn btn-success ml-3"
                                            id="btn-edit-tutorial"
                                            onClick={onChangeRoute1}
                                        >
                                            <i className="fas fa-edit"></i>
                                            Chỉnh giáo án
                                        </button>
                                    </div>

                                    <div className="col-xl-4 col-md-4 col-xs-4 md-4">
                                        <button
                                            className="btn btn-success ml-3"
                                            id="btn-add-exercise"
                                            onClick={() => {
                                                dispatch(setModificationState(ExerciseModificationStatus.Create))
                                                onExerciseRemove()
                                            }}
                                        >
                                            <i className="fas fa fa-plus"></i>
                                            Thêm bài tập
                                        </button>
                                    </div>
                                </div>;
                            }
                            else if (is_active === "active_now") {
                                return <div className="row mb-2">

                                    <div className="col-xl-4 col-md-4 col-xs-4 md-4">
                                        <button
                                            className="btn btn-success ml-3"
                                            id="btn-add-exercise"
                                            onClick={() => {
                                                dispatch(setModificationState(ExerciseModificationStatus.Create))
                                                onExerciseRemove()
                                            }}
                                        >
                                            <i className="fas fa fa-plus"></i>
                                            Thêm bài tập
                                        </button>
                                    </div>
                                </div>;
                            }
                            else {
                                return <div className="row mb-2">
                                    <div className="col-xl-6 col-md-6 col-xs-6 md-4">
                                        <button
                                            className="btn btn-success ml-3"
                                            id="btn-add-exercise"
                                            onClick={() => {
                                                dispatch(setModificationState(ExerciseModificationStatus.Create))
                                                onExerciseRemove()
                                            }}
                                        >
                                            <i className="fas fa fa-plus"></i>
                                            Thêm bài tập
                                        </button>
                                    </div>

                                </div>;
                            }
                        }
                    }()
                }

                <Popup
                    open={popup}
                    onClose={() => setPopup(false)}
                    closeOnDocumentClick
                >
                    <>
                        {
                            function () {
                                if ((exercises.modificationState === ExerciseModificationStatus.Create) || (exercises.modificationState === ExerciseModificationStatus.Edit)) {
                                    return <ExerciseForm isCheck={onRemovePopup} />
                                }
                            }()
                        }
                    </>
                </Popup>

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
                                                    dispatch(deleteUserRegisterTutorial(requestId, idx))
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

                <Popup
                    open={popup1}
                    onClose={() => setPopup1(false)}
                    closeOnDocumentClick
                >
                    <>
                        {
                            function () {
                                if ((exercises.modificationState === ExerciseModificationStatus.Create1)) {
                                    return <SubmitRecordForm isCheck={onRemovePopup1} />
                                }
                            }()
                        }
                    </>
                </Popup>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className="col-xl-12 col-md-12 mb-4">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Thông tin chung</h4>
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
                                                <p id="phone">Nội dung: </p>
                                            </div>

                                            <div className="row  justify-content-center">
                                                <button
                                                    className="btn btn-success ml-2"
                                                    id="btn-view-tutorial"
                                                    onClick={routeChange2}
                                                >
                                                    Xem nội dung
                                                </button>
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
                                                                    return " Dạy bằng jitsi";
                                                                }
                                                                else {
                                                                    return " Dạy bằng giáo trình";
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
                                                                if (sections.sections[0].teach_form === true && (is_active === "not_active_now" || is_active === "pre_active_now" || is_active === "active_now")) {
                                                                    return (
                                                                        <button
                                                                            className="btn btn-success ml-2"
                                                                            id="btn-into-room"
                                                                            onClick={routeChange4}
                                                                        >
                                                                            Vào metting room
                                                                        </button>
                                                                    )
                                                                }
                                                            }
                                                        }()
                                                    }
                                                </div>
                                                <div className="col-xl-6 col-md-6 col-xs-6">
                                                    {
                                                        function () {
                                                            if (sections.sections.length <= 0) {
                                                                return ""
                                                            }
                                                            else {
                                                                if (sections.sections[0].teach_form === true && (is_active === "pre_active_now" || is_active === "active_now")) {
                                                                    return (
                                                                        <button
                                                                            className="btn btn-success ml-2"
                                                                            id="btn-into-attendance"
                                                                            onClick={routeChange5}
                                                                        >
                                                                            Điểm danh
                                                                        </button>
                                                                    )
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

                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className="col-xl-12 col-md-12 mb-4">
                                    <div className={`card shadow h-100 py-2`} >
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Bài tập</h4>
                                                <div className="table-responsive portlet">
                                                    <table className="table">
                                                        <thead className="thead-light">
                                                            <tr>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                exercise_teachers.exercise_no_submissions.map((ele, index) => {
                                                                    return (
                                                                        <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                            <div className="row section-ele row-section mb-4 ml-2 mr-2" onClick={() => { routeChange3(ele) }}>
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
                                                                                            Tỉ lệ đánh giá:
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            {ele.level_name} %
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row mb-2">
                                                                                        <div className="col-md-5">
                                                                                            Trạng thái:
                                                                                        </div>
                                                                                        <div className="col-md-7 status-score">
                                                                                            Chưa có bài nộp
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }

                                                            {
                                                                exercise_teachers.exercise_scoring.map((ele, index) => {
                                                                    return (
                                                                        <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                            <div className="row section-ele row-section-2 mb-4 ml-2 mr-2" onClick={() => { routeChange3(ele) }}>
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
                                                                                            Tỉ lệ đánh giá:
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            {ele.level_name} %
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row mb-2">
                                                                                        <div className="col-md-5">
                                                                                            Trạng thái:
                                                                                        </div>
                                                                                        <div className="col-md-7 status-score">
                                                                                            Đang chấm
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }


                                                            {
                                                                exercise_teachers.exercise_scroring_done.map((ele, index) => {
                                                                    return (
                                                                        <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                            <div className="row section-ele row-section-1 mb-4 ml-2 mr-2" onClick={() => { routeChange3(ele) }}>
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
                                                                                            Tỉ lệ đánh giá:
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            {ele.level_name} %
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row mb-2">
                                                                                        <div className="col-md-5">
                                                                                            Trạng thái:
                                                                                        </div>
                                                                                        <div className="col-md-7 status-score">
                                                                                            Đã chấm xong
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
                </div>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className={`card shadow h-100 py-2`} >
                                <div className="card-body">
                                    <div className="row no-gutters justify-content-left">
                                        <h4 id="full-name">Danh sách yêu cầu giáo án</h4>
                                        <div className="table-responsive portlet">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        user_register_tutorials.user_register_tutorial_not_approved_nows.map((ele, index) => {
                                                            return (
                                                                <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                            <div className="row section-ele row-section mb-4 ml-2 mr-2" onClick={() => { handleView(ele) }}>
                                                                                <div className="col-xl-3 col-md-3 avatar-x">
                                                                                    <img className="img-exam" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1669576857/videos_pfdoe3.png" alt="" />
                                                                                </div>
                                                                                <div className="col-xl-9 col-md-9 mt-2">
                                                                                    <div className="row">
                                                                                        <div className="col-md-3">
                                                                                            Tên:
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            {ele.name}
                                                                                        </div>
                                                                                        <div className="col-md-2">
                                                                                            <BsFillTrashFill color="#dc3545" onClick={(e) => {
                                                                                                e.stopPropagation(); 
                                                                                                setRequestId(ele.id);
                                                                                                setPopup2(true)
                                                                                            }}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-3">
                                                                                            Gửi lúc:
                                                                                        </div>
                                                                                        <div className="col-md-7">
                                                                                            {ele.update_time.replaceAll("T", " ").substring(0, 16)}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row mb-2">
                                                                                        <div className="col-md-3">
                                                                                            
                                                                                        </div>
                                                                                        <div className="col-md-7 status-score">
                                                                                            Chưa được duyệt
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

            </Fragment>
    );
};

export default SectionTeacher;
