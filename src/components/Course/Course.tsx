import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CourseNomalList from "./CourseNomalList";
import TopCard from "../../common/components/TopCard";
import "./Course.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ICourseState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    clearSelectedCourse, setModificationState,
    changeSelectedCourse,
    removeCourse
} from "../../store/actions/course.action";
import { CourseModificationStatus, ICourse } from "../../store/models/course.interface";
import { useHistory } from "react-router-dom";
import { ISemesterClass, SemesterClassModificationStatus } from "../../store/models/semester_class.interface";
import { changeSelectedSemesterClass, setModificationStateSemesterClass } from "../../store/actions/semester_class.action";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getArtType } from "../../common/service/ArtType/GetArtType";
import { getArtLevel } from "../../common/service/ArtLevel/GetArtLevel";
import { getArtAge } from "../../common/service/ArtAge/GetArtAge";
import { addNotification } from "../../store/actions/notifications.action";
import { deleteCourse } from "../../common/service/Course/DeleteCourse";
import { getSemester } from "../../common/service/semester/GetSemester";
import { getSectionTemplate } from "../../common/service/SectionTemplate/GetSectionTemplate";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";


const Course: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberCourseCount: number = courses.courses.length;
    const [popup1, setPopup1] = useState(false);
    const [popup2, setPopup2] = useState(false);

    console.log(courses)
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        dispatch(clearSelectedCourse());
        dispatch(updateCurrentPath("Khóa học", "danh sách"));
    }, [path.area, dispatch]);

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
                    dispatch(getCourse())
                    dispatch(getSemester())
                    dispatch(getArtType())
                    dispatch(getArtLevel())
                    dispatch(getArtAge())
                    dispatch(getSectionTemplate())
                }
            }
            else {
                dispatch(getCourse())
                dispatch(getSemester())
                dispatch(getArtType())
                dispatch(getArtLevel())
                dispatch(getArtAge())
                dispatch(getSectionTemplate())
            }
        }
    }, [dispatch])

    function onCourseSelect(course: ICourse): void {
        dispatch(changeSelectedCourse(course));
        onCourseRemove1()
        dispatch(setModificationState(CourseModificationStatus.None));
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
        history.push(
            {
                pathname: path,
                state: { course_value: null } // your data array of objects
            }
        );
    }

    console.log(courses.modificationState)


    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Khóa học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="KHÓA HỌC" text={`${numberCourseCount}`} icon="box" class="primary" />
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
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách khóa học</h6>
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

        </Fragment >
    );
};

export default Course;
