import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TopCard from "../../common/components/TopCardUser";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { getUserGradeExerciseByExerciseAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByExeerciseAndClass";
import { logout } from "../../store/actions/account.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IRootPageStateType, IStateType, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";
import ScoreExamList from "./ScoreExamList";

const ResultGradeExamTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const students: IUserState = useSelector((state: IStateType) => state.users);
    const user_grade_exercise_submissions: IUserGradeExerciseSubmissionState  = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const max = user_grade_exercise_submissions.user_grade_exercise_submissions.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = user_grade_exercise_submissions.user_grade_exercise_submissions.reduce((a, b) => Math.min(a, b.score), 0);
    var class_id = localStorage.getItem('class_id');
    var class_id_: number = 2;
    if (class_id !== null) {
        class_id_ = parseInt(class_id);
    }

    var id_y = localStorage.getItem('exercise_id');
    let exercise_id = 0;

    if (id_y !== null) {
        exercise_id = parseInt(id_y);
    }


    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {

        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
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
                    dispatch(getUserGradeExerciseByExerciseAndClass(exercise_id, class_id))
                }
            }
            else {     
                dispatch(getUserGradeExerciseByExerciseAndClass(exercise_id, class_id))
            }
        }
        dispatch(updateCurrentPath("Lớp", "Chi tiết"));
    }, [path.area, dispatch]);


    const history = useHistory();
    const onRouteChange = () =>{ 
        let path = '/exercise/result-analytis'; 
        history.push({
            pathname: path
        });
    }
    return (
        <Fragment>
            
            <div className="row">
                <TopCard title="ĐIỂM CAO NHẤT" text={`${max}`} icon="book" class="primary" />
                <TopCard title="ĐIỂM THẤP NHẤT" text={`${min}`} icon="book" class="danger" />
            </div>

            <div className="row">

                <div className="col-xl-8 col-md-8 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Danh sách học sinh</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <ScoreExamList />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-4 mb-4">
                    <div className="row justify-content-center">
                        <button className="btn btn-success btn-green" id="btn-into-class" onClick={() =>{
                        onRouteChange()}}>
                            Xem review
                            <i className="fas fa fa-arrow-right"></i>
                    </button>
                    </div>
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>
            </div>

        </Fragment>
    );
};

export default ResultGradeExamTeacher;
