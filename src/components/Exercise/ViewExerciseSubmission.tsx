import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IExerciseSubmissionState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import "./ManageStudent.css"
import 'react-circular-progressbar/dist/styles.css';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getExerciseSubmissionById } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionById";

const ViewExerciseSubmission: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);

    var id_y = localStorage.getItem('exercise_submission_id');
    var exercise_submission_id: string = "";
    if (id_y !== null) {
        exercise_submission_id = id_y;
    }

    var id_t = localStorage.getItem('description');
    var description: string = "";
    if (id_t !== null) {
        description = id_t;
    }

    const { promiseInProgress } = usePromiseTracker();

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
                    trackPromise(getExerciseSubmissionById(dispatch, exercise_submission_id))
                }
            }
            else {
                trackPromise(getExerciseSubmissionById(dispatch, exercise_submission_id))
            }
        }
    }, [dispatch, access_token, refresh_token, exercise_submission_id]);


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
                            <p dangerouslySetInnerHTML={{ __html: description }}>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Bài làm của bé</h6>
                    </div>
                    <img className="card-img-top" src={exercise_submissions.exercise_not_gradeds.length > 0 ? exercise_submissions.exercise_not_gradeds[0].image_url : ""} alt="" />
                </div>
            </div>

        </Fragment>
    );
};

export default ViewExerciseSubmission;
