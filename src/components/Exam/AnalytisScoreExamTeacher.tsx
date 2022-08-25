import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getInfoMyClass } from "../../common/service/MyClass/GetInfoMyClass";
import { getUserGradeExerciseByExerciseAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByExeerciseAndClass";
import { logout } from "../../store/actions/account.actions";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { clearSelectedTeacherRegisterQuatification } from "../../store/actions/teacher_register_quantification.action";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import { IAnonymousNotificationState, IRootPageStateType, IStateType, ITeacherRegisterQuantificationState, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";

import NotificationClassTeacher from "../Class/NotificationClassTeacher";
import StudentList from "../Class/StudentForTeacherList";
import ScoreExamList from "./ScoreExamList";



const AnalytisResultGradeExamTeacher: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user_grade_exercise_submissions: IUserGradeExerciseSubmissionState  = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const max = user_grade_exercise_submissions.user_grade_exercise_submissions.reduce((a, b) => Math.max(a, b.score), -Infinity);
    const min = user_grade_exercise_submissions.user_grade_exercise_submissions.reduce((a, b) => Math.min(a, b.score), 0);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    let student: string[] = []
    let scores: number[] = []
    if (user_grade_exercise_submissions.user_grade_exercise_submissions.length > 0){
        user_grade_exercise_submissions.user_grade_exercise_submissions.map(ele => {
            student.push(ele.student_name)
            scores.push(ele.score)
        })
    }

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

    const labels = student;
    let data = {
        labels,
        datasets: [
            {
                label: 'Điêm',
                data: scores,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    var id_x = localStorage.getItem('id');
    var id: number = 2;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const { state } = useLocation<any>();

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


    const [popup1, setPopup1] = useState(false);

    function onAnonymousNotificationRemove() {
        setPopup1(true);
    }


    function onRemovePopup1(value: boolean) {
        setPopup1(false);
    }

    const history = useHistory();
    const onRouteChange = () =>{ 
        let path = '/classes/detail-student'; 
        history.push({
            pathname: path
        });
    }
    return (
        <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="ĐIỂM CAO NHẤT" text={`${max}`} icon="book" class="primary" />
                <TopCard title="ĐIỂM THẤP NHẤT" text={`${min}`} icon="book" class="danger" />
            </div>

            <div className="row">

                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Danh sách học sinh</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <ScoreExamList />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row justify-content-center">
                        <ChartLine data={data} />
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default AnalytisResultGradeExamTeacher;
function dispatch(arg0: (dispatch: any) => void) {
    throw new Error("Function not implemented.");
}

