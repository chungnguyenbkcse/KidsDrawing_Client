import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import { logout } from "../../store/actions/account.actions";
import { IClassHasRegisterJoinSemesterState, IRootPageStateType, IStateType, IUserGradeExerciseSubmissionState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getInfoFinalCourse } from "../../common/service/FinalCourse/GetInfoFinalCourse";
import { CircularProgressbar } from "react-circular-progressbar";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getInforClassHasRegisterJoinSemester } from "../../common/service/ClassHasRegisterJoinSemester/GetInfoClassHasRegisterJoinSemester";

const ReivewClassDone: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_grade_exercise_submission: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const class_has_register_join_semester: IClassHasRegisterJoinSemesterState = useSelector((state: IStateType) => state.class_has_register_join_semesters);
    const { promiseInProgress } = usePromiseTracker();

    var id_y = localStorage.getItem('id');
    var student_id: number= 0;
    if (id_y !== null) {
        student_id = parseInt(id_y);
    }

    var id_t = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_t !== null) {
        class_id = parseInt(id_t);
    }

    var id_x = localStorage.getItem("final_grade");
    let final_grade = 0;
    if (id_x !== null) {
        final_grade = parseFloat(id_x);
    }

    var id_k = localStorage.getItem("course_name");
    let course_name = "";
    if (id_k !== null) {
        course_name = id_k;
    }

    let percentage = final_grade*10;
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
                    trackPromise(getInfoFinalCourse(dispatch, student_id, class_id))
                    trackPromise(getInforClassHasRegisterJoinSemester(dispatch, class_id, student_id))
                }
            }
            else {
                trackPromise(getInfoFinalCourse(dispatch, student_id, class_id))
                trackPromise(getInforClassHasRegisterJoinSemester(dispatch, class_id, student_id))
            }
        }
    }, [dispatch, access_token, refresh_token, student_id, class_id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    
    useEffect(() => {
        dispatch(updateCurrentPath(course_name, "Tổng kết"));
    }, [path.area, dispatch, course_name]);

    let list_score_user_grade_exercise: number[] = [];
    let list_name_user_grade_exercise: string[] = [];
    user_grade_exercise_submission.user_grade_exercise_submissions.map((ele, idx) => {
        list_score_user_grade_exercise.push(ele.score)
        list_name_user_grade_exercise.push(ele.exercise_name)
        return ele
    })

    const routeChangeReivewStart = () => {
        let path = "/classes/form-review";
        history.push({
          pathname: path,
      });
      }


    const labels = list_name_user_grade_exercise;
    const data = {
        labels,
        datasets: [
            {
                label: 'Điểm kiểm tra',
                data: list_score_user_grade_exercise,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const history = useHistory();
    const routeChange = () => {
        let path = '/class/exercise-student';
        localStorage.removeItem('student_id');
        localStorage.setItem('student_id', student_id.toString())
        history.push({
            pathname: path,
        });
    }

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                <div className="row">
                    <div className="col-xl-8 col-md-8 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <div className="row no-gutters">
                                    <ChartLine data={data} />
                                </div>
                                <div className="row justify-content-center">
                                    <button
                                        className="btn btn-success btn-green"
                                        id="btn-into-class-student"
                                        onClick={() => { routeChange() }}
                                    >
                                        Xem chi tiết
                                        <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-4"> 
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Điểm tổng kết</h6>
                            </div>
                            <div className="card-body">
                                <CircularProgressbar value={percentage} text={`${percentage}`} />;
                            </div>
                        </div>
                    </div>

                </div>

            <div className="row">
                <div className="col-xl-12 col-md-12 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green"  id="level-teacher">Nhận xét</h6>
                        </div>
                        <div className="card-body"> 
                            {
                                class_has_register_join_semester.class_has_register_join_semesters.map((ele, idx) => {
                                    return (
                                        <p dangerouslySetInnerHTML={{__html: ele.teacher_feedback}}></p>
                                    )
                                })
                            }
                        </div> 
                    </div>
                </div>
            </div>

            {
                function () {
                    if (class_has_register_join_semester.class_has_register_join_semesters.length > 0) {
                        class_has_register_join_semester.class_has_register_join_semesters.map((ele, idx) => {
                            if (ele !== undefined) {
                                if (ele.review_star !== 0) {
                                    return (
                                        <div className="row">
                                            <div className="card-body">
                                                <div className="row justify-content-center"> 
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-success" 
                                                        onClick={() => {routeChangeReivewStart()}}
                                                    >
                                                        Nhận xét giáo viên
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            return (<> </>)
                        })
                    }
                }()
            }

            </Fragment>
    );
};

export default ReivewClassDone;
