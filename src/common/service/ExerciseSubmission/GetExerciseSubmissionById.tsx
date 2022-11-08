import { fetchDataSuccess, fetchDataError, removeExerciseGradedAll, removeExerciseNotGradedAll, addExerciseNotGraded } from "../../../store/actions/exercise_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ExerciseSubmission {
    id: any;
    student_id: number;
    exercise_id: number;
    student_name: string;
    exercise_name: string;
    image_url: string;
    create_time: string;
    update_time: string;
}
export function getExerciseSubmissionById(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/exercise-submission/${id}`, {
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
                        dispatch(getExerciseSubmissionById(dispatch, id))
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
                    var strDate_1 = data.create_time;
                    var strDate_2 = data.update_time;
                    var exercise_submission: ExerciseSubmission = {
                        id: data.id,
                        student_id: data.student_id,
                        student_name: data.student_name,
                        exercise_id: data.exercise_id,
                        exercise_name: data.exercise_name,
                        image_url: data.image_url,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    return dispatch(addExerciseNotGraded(exercise_submission));
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}