import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IExerciseSubmissionState, IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import "./ManageStudent.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { getExerciseSubmissionByExerciseAndStudent } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByExerciseAndStudent";

const DetailExerciseParent: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const { promiseInProgress } = usePromiseTracker();

    var id_x = localStorage.getItem("exercise_description");
    let exercise_description: string = "";
    if (id_x !== null) {
        exercise_description = id_x;
    }

    var id_y = localStorage.getItem("student_id");
    let id: number = 0;
    if (id_y !== null) {
        id = parseInt(id_y);
    }

    console.log(id)

    var id_yx = localStorage.getItem('exercise_submission_id');
    var exercise_submission_id: number = 0;
    if (id_yx !== null) {
        exercise_submission_id = parseInt(id_yx);
    }

    var id_z = localStorage.getItem("exercise_id");
    let exercise_id: number = 0;
    if (id_z !== null) {
        exercise_id = parseInt(id_z);
    }

    console.log(exercise_id)

    var id_k = localStorage.getItem("exercise_name");
    let exercise_name = "";
    if (id_k !== null) {
        exercise_name = (id_k);
    }

    var id_h = localStorage.getItem("exercise_level_name");
    let exercise_level_name = "";
    if (id_h !== null) {
        exercise_level_name = (id_h);
    }

    var id_i = localStorage.getItem("deadline");
    let deadline = "";
    if (id_i !== null) {
        deadline = (id_i);
    }

    var id_t = localStorage.getItem("time_submit");
    let time_submit = "";
    if (id_t !== null) {
        time_submit = (id_t);
    }

    var id_j = localStorage.getItem("url_exercise_submission");
    let url_exercise_submission = "";
    if (id_j !== null) {
        url_exercise_submission = (id_j);
    }

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    let percentage = exercise_submissions.exercise_gradeds.length > 0 ? exercise_submissions.exercise_gradeds[0].score : 0;
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
                    trackPromise(getExerciseSubmissionByExerciseAndStudent(dispatch, exercise_id, id))
                }
            }
            else {
                trackPromise(getExerciseSubmissionByExerciseAndStudent(dispatch, exercise_id, id))
            }
        }
    }, [dispatch, access_token, refresh_token, exercise_id, id]);


    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);


    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className="col-xl-12 col-md-12 mb-2">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Thông tin bài tập</h4>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Tên: {exercise_name}</p>
                                            </div>
                                            <div className="row no-gutters">
                                                <p id="phone">Nội dung: <span dangerouslySetInnerHTML={{ __html: exercise_description }}></span></p>
                                            </div>

                                            

                                            <div className="row no-gutters">
                                                <p id="phone">Hạn nộp: {deadline.replaceAll("T", " ").substring(0, 16)}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Đã nộp lúc: {time_submit.replaceAll("T", " ").substring(0, 16)}</p>
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
                                            <h4 id="full-name">Bài làm của học sinh</h4>
                                        </div>
                                        <div className="row mx-auto">
                                        <PhotoProvider>
                                            <PhotoView src={exercise_submissions.exercise_gradeds.length > 0 ? exercise_submissions.exercise_gradeds[0].image_url : ""}>
                                                <img src={exercise_submissions.exercise_gradeds.length > 0 ? exercise_submissions.exercise_gradeds[0].image_url : ""} alt="" className="center-x" />
                                            </PhotoView>
                                        </PhotoProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                            <div className={`card shadow py-2`} >
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left exercise-list">
                                            <h4 id="full-name">Điểm</h4>
                                        </div>
                                        <div className="row mx-auto" style={{ width: 200, height: 200 }}>
                                                <CircularProgressbar value={percentage*10} text={`${percentage}`} />;
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
                                            <h4 id="full-name">Nhận xét</h4>
                                        </div>
                                        <div className="row mx-auto">
                                            {exercise_submissions.exercise_gradeds.length > 0 ? exercise_submissions.exercise_gradeds[0].feedback : ""}
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

export default DetailExerciseParent;
