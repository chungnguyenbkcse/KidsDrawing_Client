import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getExerciseLevel } from "../../common/service/ExerciseLevel/GetExerciseLevel";
import { getSectionById } from "../../common/service/Section/GetSectionById";
import { logout } from "../../store/actions/account.actions";
import { IClassesStudentState, IExerciseStudentState, ISectionState, IStateType } from "../../store/models/root.interface";
import "./SectionStudent.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getClassesStudent } from "../../common/service/ClassesStudent/GetClassesStudentByStudent";
import { getExerciseForSectionStudent } from "../../common/service/ExerciseStudent/GetExerciseBySectionStudent";

const SectionStudent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const sections: ISectionState = useSelector((state: IStateType) => state.sections);
    const exercise_student: IExerciseStudentState = useSelector((state: IStateType) => state.exercise_students);
    const class_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);


    const { promiseInProgress } = usePromiseTracker();


    var id_y = localStorage.getItem('section_id');

    let section_id = 1;

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

    let link_jisti = "";
    if (class_students.classes_doing.length > 0) {
        class_students.classes_doing.map((ele, idx) => {
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
                    trackPromise(getClassesStudent(dispatch, id))
                    trackPromise(getSectionById(dispatch, section_id))
                    trackPromise(getExerciseForSectionStudent(dispatch, section_id, id))
                    trackPromise(getExerciseLevel(dispatch))
                }
            }
            else {
                trackPromise(getClassesStudent(dispatch, id))
                trackPromise(getSectionById(dispatch, section_id))
                trackPromise(getExerciseForSectionStudent(dispatch, section_id, id))
                trackPromise(getExerciseLevel(dispatch))
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


    const routeChange3 = (description: string, name: string, level_name: string, id: number) => {
        let path = '/exercise/detail';
        localStorage.removeItem('exercise_description');
        localStorage.removeItem('exercise_name');
        localStorage.removeItem('exercise_level_name');
        localStorage.removeItem('exercise_id');
        localStorage.setItem('exercise_description', description);
        localStorage.setItem('exercise_name', name);
        localStorage.setItem('exercise_level_name', level_name);
        localStorage.setItem('exercise_id', id.toString());
        history.push({
            pathname: path
        });
    }

    const routeChange5 = (description: string, name: string, level_name: string, id: number) => {
        let path = '/exercise/submit';
        localStorage.removeItem('exercise_description');
        localStorage.removeItem('exercise_name');
        localStorage.removeItem('exercise_level_name');
        localStorage.removeItem('exercise_id');
        localStorage.setItem('exercise_description', description);
        localStorage.setItem('exercise_name', name);
        localStorage.setItem('exercise_level_name', level_name);
        localStorage.setItem('exercise_id', id.toString());
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
                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className="col-xl-12 col-md-12 mb-4">
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
                                                                if (sections.sections[0].teach_form === true) {
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
                                                                else {
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
                                                                exercise_student.exercise_not_submit.sort((a, b) => a.id - b.id).map((ele, index) => {
                                                                    return (
                                                                        <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                            <div className="row row-section mb-4 ml-2 mr-2 row-not-submit" onClick={() => { routeChange5(ele.description, ele.name, ele.level_name, ele.id) }}>
                                                                                <div className="col-xl-4 col-md-4 mb-4">
                                                                                    <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="" />
                                                                                </div>
                                                                                <div className="col-xl-8 col-md-8 mb-4">
                                                                                    <h3 className=" mb-2" id="level-student">{ele.name}</h3>
                                                                                    <h4 className=" mb-2" id="level-student">Phần trăm đánh giá: {ele.level_name}</h4>
                                                                                    <p>Chưa nộp</p>
                                                                                </div>
                                                                            </div>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }

                                                            {
                                                                exercise_student.exercise_submitted_graded.sort((a, b) => a.id - b.id).map((ele, index) => {
                                                                    return (
                                                                        <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                            <div className="row row-section-1 mb-4 ml-2 mr-2" onClick={() => { routeChange3(ele.description, ele.name, ele.level_name, ele.id) }}>
                                                                                <div className="col-xl-4 col-md-4 mb-4">
                                                                                    <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="" />
                                                                                </div>
                                                                                <div className="col-xl-8 col-md-8 mb-4">
                                                                                    <h3 className=" mb-2" id="level-student">{ele.name}</h3>
                                                                                    <h4 className=" mb-2" id="level-student">Phần trăm đánh giá: {ele.level_name}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }

{
                                                                exercise_student.exercise_submitted_not_grade.sort((a, b) => a.id - b.id).map((ele, index) => {
                                                                    return (
                                                                        <tr className={`table-row`} key={`semester_class_${index}`}>
                                                                            <div className="row row-section mb-4 ml-2 mr-2" onClick={() => { routeChange3(ele.description, ele.name, ele.level_name, ele.id) }}>
                                                                                <div className="col-xl-4 col-md-4 mb-4">
                                                                                    <img className="card-img" src="https://res.cloudinary.com/djtmwajiu/image/upload/v1661088297/teacher_hfstak.png" alt="" />
                                                                                </div>
                                                                                <div className="col-xl-8 col-md-8 mb-4">
                                                                                    <h3 className=" mb-2" id="level-student">{ele.name}</h3>
                                                                                    <h4 className=" mb-2" id="level-student">Phần trăm đánh giá: {ele.level_name}</h4>
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

            </Fragment>
    );
};

export default SectionStudent;
