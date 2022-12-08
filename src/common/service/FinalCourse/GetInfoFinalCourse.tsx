import { fetchDataSuccess, fetchDataError, addExerciseGraded, addExerciseNotGraded, removeExerciseGradedAll, removeExerciseNotGraded, removeExerciseNotGradedAll} from "../../../store/actions/exercise_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_grade_contest {
    id: any;
    student_id: number;
    exercise_id: number;
    student_name: string;
    exercise_name: string;
    image_url: string;
    exercise_description: string;
    exercise_deadline: string;
    create_time: string;
    update_time: string;
    score: number;
    time: string;
    feedback: string;
}
export function getInfoFinalCourse(dispatch: any, student_id: number, classes_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/final-course/${student_id}/${classes_id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    }
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(getInfoFinalCourse(dispatch, student_id, classes_id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeExerciseGradedAll())
                dispatch(removeExerciseNotGradedAll())
                console.log(data.body.UserGradeExerciseSubmission)
                localStorage.removeItem("final_grade");
                localStorage.setItem("final_grade", data.body.final_grade)
                data.body.UserGradeExerciseSubmission.map((ele: any, index: any) => {
                    var user_grade_contest: user_grade_contest = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        exercise_id: ele.exercise_id,
                        exercise_name: ele.exercise_name,
                        exercise_deadline: ele.exercise_deadline,
                        exercise_description: ele.exercise_description,
                        image_url: ele.image_url,
                        create_time: ele.create_time,
                        update_time: ele.update_time,
                        score: ele.score,
                        time: ele.time,
                        feedback: ele.feedback
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addExerciseGraded(user_grade_contest))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}