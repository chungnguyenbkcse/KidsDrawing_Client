import { fetchDataSuccess, fetchDataError, removeExerciseGradedAll, removeExerciseNotGradedAll, addExerciseGraded, addExerciseNotGraded } from "../../../store/actions/exercise_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ExerciseSubmission {
    id: any;
    student_id: number;
    exercise_id: number;
    student_name: string;
    exercise_name: string;
    image_url: string;
    exercise_description: string;
    exercise_level_name: string;
    exercise_deadline: string;
    create_time: string;
    update_time: string;
}
export function getExerciseSubmissionBySectionAndStudent(dispatch: any, section_id: number, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/exercise-submission/section-student/${section_id}/${student_id}`, {
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
                        dispatch(getExerciseSubmissionBySectionAndStudent(dispatch, section_id, student_id))
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
                dispatch(fetchDataSuccess(data))
                dispatch(removeExerciseGradedAll())
                dispatch(removeExerciseNotGradedAll())
                console.log(data.body.exercise_not_graded)
                data.body.exercise_not_graded.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise_submission: ExerciseSubmission = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        exercise_id: ele.exercise_id,
                        exercise_name: ele.exercise_name,
                        exercise_deadline: ele.exercise_deadline,
                        exercise_description: ele.exercise_description,
                        exercise_level_name: ele.exercise_level_name,
                        image_url: ele.image_url,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    return dispatch(addExerciseNotGraded(exercise_submission));
                })

                data.body.exercise_graded.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise_submission: ExerciseSubmission = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        exercise_id: ele.exercise_id,
                        exercise_deadline: ele.exercise_deadline,
                        exercise_description: ele.exercise_description,
                        exercise_level_name: ele.exercise_level_name,
                        exercise_name: ele.exercise_name,
                        image_url: ele.image_url,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    return dispatch(addExerciseGraded(exercise_submission));
                })

                
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}