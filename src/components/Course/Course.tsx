import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CourseNomalList from "./CourseNomalList";
import CourseSemesterList from "./CourseSemesterList";
import CourseSemesterForm from "./CourseSemesterForm";
import TopCard from "../../common/components/TopCard";
import "./Course.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ICourseState, IStateType, IRootPageStateType, ISemesterCourseState } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    clearSelectedCourse, setModificationState,
    changeSelectedCourse,
    removeCourse
} from "../../store/actions/course.action";
import { CourseModificationStatus, ICourse } from "../../store/models/course.interface";
import { useHistory } from "react-router-dom";
import { ISemesterCourse, SemesterCourseModificationStatus } from "../../store/models/semester_course.interface";
import { changeSelectedSemesterCourse, clearSelectedSemesterCourse, removeSemesterCourse, setModificationStateSemesterCourse } from "../../store/actions/semester_course.action";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { addNotification } from "../../store/actions/notifications.action";
import { deleteCourse } from "../../common/service/Course/DeleteCourse";
import { getSemester } from "../../common/service/semester/GetSemester";
import { getSchedule } from "../../common/service/Schedule/GetSchedule";
import { deleteSemesterCourse } from "../../common/service/SemesterCourse/DeleteSemesterCourse";
import { getSemesterCourse } from "../../common/service/SemesterCourse/GetSemesterCourse";


const Course: React.FC = () => {
    const [checked, setChecked] = useState(true);
    const dispatch: Dispatch<any> = useDispatch();
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const semester_courses: ISemesterCourseState = useSelector((state: IStateType) => state.semester_courses);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberCourseCount: number = courses.courses.length;
    const numberSemesterCourseCount: number = semester_courses.semesterCourses.length;
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);

    console.log(courses)

    useEffect(() => {
        dispatch(clearSelectedCourse());
        dispatch(updateCurrentPath("Khóa học", "danh sách"));
    }, [path.area, dispatch]);

    useEffect(() => {
        dispatch(getSemesterCourse())
        dispatch(getCourse())
        dispatch(getSemester())
        dispatch(getSchedule())
        dispatch(getArtType())
        dispatch(getArtLevel())
        dispatch(getArtAge())
    }, [dispatch])

    function onCourseSelect(course: ICourse): void {
        dispatch(changeSelectedCourse(course));
        onCourseRemove1()
        dispatch(setModificationState(CourseModificationStatus.None));
    }

    function onSemesterCourseSelect(course: ISemesterCourse): void {
        dispatch(changeSelectedSemesterCourse(course));
        onCourseRemove2()
        dispatch(setModificationStateSemesterCourse(SemesterCourseModificationStatus.None));
    }

    function onCourseRemove1() {
        setPopup1(true);
    }
    function onCourseRemove2() {
        setPopup2(true);
    }

    function onRemovePopup2(value: boolean) {
        setPopup2(value)
    }

    const history = useHistory();

    const routeChange = () => {
        let path = `/courses/create-course`; 
        const course: ICourse = { id: 0, name: "", description: "", max_participant: 0, num_of_section: 0, price: 0, image_url: "", is_enabled: false, creator_id: 0, art_age_id: 0, art_level_id: 0, art_type_id: 0, create_time: "", update_time: "" }
        history.push(
            {
                pathname: path,
                state: {course_value: null} // your data array of objects
            }
        );
    }

    console.log(courses.modificationState)


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Khóa học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="KHÓA HỌC CHUNG" text={`${numberCourseCount}`} icon="box" class="primary" />
                <TopCard title="KHÓA HỌC THEO KÌ" text={`${numberSemesterCourseCount}`} icon="box" class="primary" />
            </div>

            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                    <div className="input-group" id="search-content">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm" />
                        </div>
                        <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                    <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                        if (checked == false) {
                            setChecked(true)
                        }
                    }} style={{
                        color: checked ? "#F24E1E" : "#2F4F4F"
                    }}>Khóa học chung</h6>
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
                        if (checked == true) {
                            setChecked(false)
                        }
                    }}
                        style={{
                            color: checked ? "#2F4F4F" : "#F24E1E"
                        }}>Khóa học theo kì</h6>
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
                    if (checked == true) {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách khóa học chung</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationState(CourseModificationStatus.Create))
                                                        routeChange()
                                                        onCourseRemove1()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
                                                        Thêm khóa học
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <CourseNomalList
                                                    onSelect={onCourseSelect}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {
                                    function () {
                                        if ((courses.selectedCourse) && (courses.modificationState === CourseModificationStatus.Remove)) {
                                            return (
                                                <Popup
                                                    open={popup1}
                                                    onClose={() => setPopup1(false)}
                                                    closeOnDocumentClick
                                                >
                                                    <div className="popup-modal" id="popup-modal">
                                                        <div className="popup-title">
                                                            Are you sure?
                                                        </div>
                                                        <div className="popup-content">
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    if (!courses.selectedCourse) {
                                                                        return;
                                                                    }
                                                                    dispatch(deleteCourse(courses.selectedCourse.id))
                                                                    dispatch(addNotification("Khóa học ", `${courses.selectedCourse.id} đã được xóa`));
                                                                    dispatch(removeCourse(courses.selectedCourse.id));
                                                                    dispatch(clearSelectedCourse());
                                                                    setPopup1(false);
                                                                }}>Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Popup>
                                            )
                                        }
                                    }()
                                }
                            </Fragment>
                        )
                    }
                    else {
                        return (
                            <Fragment>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-green">Danh sách khóa học theo kì</h6>
                                                <div className="header-buttons">
                                                    <button className="btn btn-success btn-green" onClick={() => {
                                                        dispatch(setModificationStateSemesterCourse(SemesterCourseModificationStatus.Create))
                                                        onCourseRemove2()
                                                    }}>
                                                        <i className="fas fa fa-plus"></i>
                                                        Thêm khóa học
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <CourseSemesterList
                                                    onSelect={onSemesterCourseSelect}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Popup
                                    open={popup2}
                                    onClose={() => setPopup2(false)}
                                    closeOnDocumentClick
                                >
                                    <>
                                        {
                                            function () {
                                                if ((semester_courses.modificationState === SemesterCourseModificationStatus.Create) || ((semester_courses.selectedSemesterCourse) && (semester_courses.modificationState === SemesterCourseModificationStatus.Edit))) {
                                                    return <CourseSemesterForm isCheck={onRemovePopup2} />
                                                }
                                            }()
                                        }
                                    </>
                                </Popup>
                                {
                                    function () {
                                        if ((semester_courses.selectedSemesterCourse) && (semester_courses.modificationState === SemesterCourseModificationStatus.Remove)) {
                                            return (
                                                <Popup
                                                    open={popup2}
                                                    onClose={() => setPopup2(false)}
                                                    closeOnDocumentClick
                                                >
                                                    <div className="popup-modal" id="popup-modal">
                                                        <div className="popup-title">
                                                            Are you sure?
                                                        </div>
                                                        <div className="popup-content">
                                                            <button type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    if (!semester_courses.selectedSemesterCourse) {
                                                                        return;
                                                                    }
                                                                    dispatch(deleteSemesterCourse(semester_courses.selectedSemesterCourse.id))
                                                                    dispatch(addNotification("Khóa học theo kì ", `${semester_courses.selectedSemesterCourse.id} đã được xóa`));
                                                                    dispatch(removeSemesterCourse(semester_courses.selectedSemesterCourse.id));
                                                                    dispatch(clearSelectedSemesterCourse());
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
                            </Fragment>
                        )
                    }
                }()
            }

        </Fragment >
    );
};

export default Course;
