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
import { getCourse } from "../../common/service/Course/GetCourse";
import { addNotification } from "../../store/actions/notifications.action";
import { deleteCourse } from "../../common/service/Course/DeleteCourse";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";


const Course: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberCourseCount: number = courses.courses.length;
    const [popup1, setPopup1] = useState(false);
    const { promiseInProgress } = usePromiseTracker();

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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getCourse(dispatch))
                }
            }
            else {
                trackPromise(getCourse(dispatch))
            }
        }
    }, [dispatch, access_token, refresh_token])

    function onCourseSelect(course: ICourse): void {
        dispatch(changeSelectedCourse(course));
        onCourseRemove1()
        dispatch(setModificationState(CourseModificationStatus.None));
    }

    function onCourseRemove1() {
        setPopup1(true);
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
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            <ToastContainer />
            <h1 className="h3 mb-2 text-gray-800">Khóa học</h1>
            <p className="mb-4">Thông tin chung</p>
            <div className="row">
                <TopCard title="KHÓA HỌC" text={`${numberCourseCount}`} icon="box" class="primary" />
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
                                        Bạn có chắc chắn muốn xóa?
                                    </div>
                                    <div className="popup-content">
                                        <button type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                if (!courses.selectedCourse) {
                                                    return;
                                                }
                                                const idx = toast.loading("Đang xử lý. Vui lòng đợi giây lát...", {
                                                    position: toast.POSITION.TOP_CENTER
                                                });
                                                
                                                deleteCourse(dispatch, courses.selectedCourse.id, idx)
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
