import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeExerciseGradedAll, removeExerciseNotGradedAll, addExerciseGraded, addExerciseNotGraded } from "../../../store/actions/exercise_submission.action";
interface ExerciseSubmission {
    id: number;
    student_id: number;
    exercise_id: number;
    student_name: string;
    exercise_name: string;
    image_url: string;
    create_time: string;
    update_time: string;
}
export function getExerciseSubmissionByClass(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercise-submission/class/${id}`, {
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
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
                        exercise_name: ele.exercise_name,
                        image_url: ele.image_url,
                        create_time: strDate_1.substring(0, 5),
                        update_time: strDate_2.substring(0, 5)
                    }
                    return dispatch(addExerciseGraded(exercise_submission));
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}