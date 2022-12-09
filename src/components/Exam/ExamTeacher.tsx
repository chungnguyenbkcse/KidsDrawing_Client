import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { getExerciseSubmissionByExercise } from "../../common/service/ExerciseSubmission/GetExerciseSubmissionByExeercise";
import { logout } from "../../store/actions/account.actions";
import { IExerciseSubmissionState, IRootPageStateType, IStateType } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { updateCurrentPath } from "../../store/actions/root.actions";

const ExamTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const exercise_submissions: IExerciseSubmissionState = useSelector((state: IStateType) => state.exercise_submissions);
    const numberApprovedCount: number = exercise_submissions.exercise_gradeds.length;
    const numberNotApprovedNowCount: number = exercise_submissions.exercise_not_gradeds.length;
    const numberGradedCount: number = exercise_submissions.exercise_gradeds.length;

    const { promiseInProgress } = usePromiseTracker();

    var exercise_description = localStorage.getItem('exercise_description');
    var exercise_description_: string = "";
    if (exercise_description !== null) {
        exercise_description_ = exercise_description;
    }

    var exercise_name = localStorage.getItem('exercise_name');
    var exercise_name_: string = "";
    if (exercise_name !== null) {
        exercise_name_ = exercise_name;
    }

    var id_y = localStorage.getItem('deadline');
    var deadline: string = "";
    if (id_y !== null) {
        deadline = id_y;
    }

    var exercise_level_name = localStorage.getItem('exercise_level_name');
    var exercise_level_name_: string = "";
    if (exercise_level_name !== null) {
        exercise_level_name_ = exercise_level_name;
    }

    var id_y = localStorage.getItem('exercise_id');
    let exercise_id = 0;

    if (id_y !== null) {
        exercise_id = parseInt(id_y);
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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getExerciseSubmissionByExercise(dispatch, exercise_id))
                }
            }
            else {
                trackPromise(getExerciseSubmissionByExercise(dispatch, exercise_id))
            }
        }
    }, [dispatch, access_token, refresh_token, exercise_id]);

    

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/exercise/grade'; 
        history.push({
            pathname: path
        });
    }

    const routeChange1 = () => {
        let path = '/exercise/result-grade';
        history.push({
            pathname: path,
        });
    }

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    
    useEffect(() => {
        dispatch(updateCurrentPath("Bài tập", "Chấm bài"));
    }, [path.area, dispatch])
    
    return (
        promiseInProgress ?
      <div className="loader"></div> : <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="SỐ BÀI ĐÃ CHẤM" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="CHƯA CHẤM" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
            </div>
            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-left">
                                            <h4 id="full-name">Đề bài</h4>
                                        </div>
                                        <div className="row no-gutters">
                                            <p id="phone">{exercise_name_}</p>
                                        </div>
                                        <div className="row no-gutters" dangerouslySetInnerHTML={{ __html: exercise_description_ }}></div>
                                        
                                        <div className="row mt-4">
                                            <p className="col-xl-6 col-md-6 col-xs-6" ><span className="header-card-course-teacher">Hạn nộp:</span> <span className="header-card-course-value-teacher">{deadline.replaceAll("T", " ").substring(0,16)}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>

            {
                function () {
                    if (numberGradedCount > 0) {
                        return (
                            <div className="row justify-content-center mb-4">
                                <button 
                                    className="btn btn-success btn-green" 
                                    id="btn-into-view-score"
                                    onClick={() => {routeChange1()}}
                                >
                                    Xem điểm
                                    <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                </button>
                            </div>
                        )
                    }
                }()
            }

            {
                function () {
                    if (numberNotApprovedNowCount > 0) {
                        return (
                            <div className="row justify-content-center mb-4">
                                <button 
                                    className="btn btn-success btn-green" 
                                    id="btn-into-class-student"
                                    onClick={() => {routeChange()}}
                                >
                                    Chấm bài
                                    <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                </button>
                            </div>
                        )
                    }
                }()
            }

        </Fragment>
    );
};

export default ExamTeacher;
