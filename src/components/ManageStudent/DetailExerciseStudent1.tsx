import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";
import "./ManageStudent.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getUserGradeExerciseByExerciseAndStudent } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByExerciseStudent";

const DetailExerciseStudent1: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const user_grade_exercise_submissions: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    console.log(users.teachers)
    console.log(teacherRegisterQuantifications)
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('id');
    var id: any = "";
    if (id_y !== null) {
        id = id_y;
    }

    var id_k = localStorage.getItem('exercise_id');
    var exercise_id: any = 0;
    if (id_k !== null) {
        exercise_id = id_k;
    }

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    let percentage = user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].score : 0;
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
                    trackPromise(getUserGradeExerciseByExerciseAndStudent(dispatch, exercise_id,id))
                }
            }
            else {
                trackPromise(getUserGradeExerciseByExerciseAndStudent(dispatch, exercise_id,id))
            }
        }
    }, [dispatch, access_token, refresh_token, exercise_id, id]);


    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chi tiết"));
    }, [path.area, dispatch]);


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

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4" id="topcard-user">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Đề tài</h6>
                        </div>
                        <div className="card-body">
                            <p dangerouslySetInnerHTML={{ __html: user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].description : "" }}>
                            </p>

                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Thời gian nộp: <span> {user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].time_submit : ""}</span></h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-8 col-lg-8">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài làm của bé</h6>
                    </div>
                    <img className="card-img-top" src={user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].image_url : ""} alt="" />
                </div>
                <div className="col-xl-4 col-lg-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Điểm của bé</h6>
                        </div>
                        <div className="card-body">
                            <CircularProgressbar value={percentage} text={`${percentage}`} />;
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Nhận xét</h6>
                        </div>
                        <div className="card-body">
                            {user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0 ? user_grade_exercise_submissions.user_grade_exercise_submissions[0].feedback : ""}
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default DetailExerciseStudent1;
