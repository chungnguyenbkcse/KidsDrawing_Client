import { fetchDataSuccess, fetchDataError, removeExerciseNoSubmissionAll, removeExerciseScoringAll, removeExerciseScoringDoneAll, addExerciseNoSubmission, addExerciseScoring, addExerciseScoringDone } from "../../../store/actions/exercise_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface exercise {
    id: any;
    name: string;
    status: string;
    description: string;
    section_id: number;
    deadline: string;
    teacher_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}
export function getExerciseTeacherBySection(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/exercises/section-teacher/${id}`, {
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
                        dispatch(getExerciseTeacherBySection(dispatch,id))
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
                dispatch(removeExerciseNoSubmissionAll())
                dispatch(removeExerciseScoringAll())
                dispatch(removeExerciseScoringDoneAll())
                //console.log(data.body.exercises)
                data.body.Exercise.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        teacher_name: ele.teacher_name,
                        status: ele.status,
                        description: ele.description,
                        section_id: ele.section_id,
                        deadline: ele.deadline,
                        section_name: ele.section_name,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    //console.log(strDate.substring(0, 16))
                    if (ele.status === "No submissions") {
                        dispatch(addExerciseNoSubmission(exercise))
                    }
                    else if (ele.status === "Scoring") {
                        dispatch(addExerciseScoring(exercise))
                    }
                    else {
                        dispatch(addExerciseScoringDone(exercise))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}