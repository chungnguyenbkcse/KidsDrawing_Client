import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeExerciseNotSubmitAll, removeExerciseSubmittedAll, addExerciseNotSubmit, addExerciseSubmitted } from "../../../store/actions/exercise_student.action";
interface exercise {
    id: number;
    name: string;
    description: string;
    section_id: number;
    level_id: number;
    level_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}
export function getExerciseForClassStudent(class_id: any, student_id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercises/class-student/${class_id}/${student_id}`, {
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
                dispatch(removeExerciseNotSubmitAll())
                dispatch(removeExerciseSubmittedAll())
                console.log(data.body.exercise_not_submit)
                console.log(data.body.exercise_submitted)
                data.body.exercise_not_submit.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        section_id: ele.section_id,
                        level_id: ele.level_id,
                        level_name: ele.level_name,
                        section_name: ele.section_name,
                        create_time: strDate_1.substring(0, 5),
                        update_time: strDate_2.substring(0, 5)
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addExerciseNotSubmit(exercise))
                })

                data.body.exercise_submitted.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        section_id: ele.section_id,
                        level_id: ele.level_id,
                        level_name: ele.level_name,
                        section_name: ele.section_name,
                        create_time: strDate_1.substring(0, 5),
                        update_time: strDate_2.substring(0, 5)
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addExerciseSubmitted(exercise))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}