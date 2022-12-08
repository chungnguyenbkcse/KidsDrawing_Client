import { fetchDataSuccess, fetchDataError, removeExerciseNotSubmitAll, removeExerciseSubmitGradedAll, addExerciseNotSubmit, removeExerciseSubmitNotGradeAll, addExerciseSubmitGraded, addExerciseSubmitNotGrade } from "../../../store/actions/exercise_student.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface exercise {
    id: any;
    name: string;
    description: string;
    section_id: number;
    teacher_name: string;
    time_submit: string;
    deadline: string;
    section_name: string;
    create_time: string;
    update_time: string;
}
export function getExerciseForSectionStudent(dispatch: any, section_id: number, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/exercises/section-student/${section_id}/${student_id}`, {
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
                        dispatch(getExerciseForSectionStudent(dispatch, section_id, student_id))
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
                dispatch(removeExerciseNotSubmitAll())
                dispatch(removeExerciseSubmitGradedAll())
                dispatch(removeExerciseSubmitNotGradeAll())
                console.log(data.body.exercise_not_submit)
                console.log(data.body.exercise_submitted_not_grade)
                console.log(data.body.exercise_submitted_graded)
                data.body.exercise_not_submit.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        teacher_name: ele.teacher_name,
                        time_submit: ele.time_submit,
                        
                        deadline: ele.deadline,
                        description: ele.description,
                        section_id: ele.section_id,
                        section_name: ele.section_name,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addExerciseNotSubmit(exercise))
                })

                data.body.exercise_submitted_not_grade.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        section_id: ele.section_id,
                        
                        teacher_name: ele.teacher_name,
                        time_submit: ele.time_submit,
                        deadline: ele.deadline,
                        section_name: ele.section_name,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addExerciseSubmitNotGrade(exercise))
                })

                data.body.exercise_submitted_graded.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        section_id: ele.section_id,
                        
                        teacher_name: ele.teacher_name,
                        time_submit: ele.time_submit,
                        deadline: ele.deadline,
                        section_name: ele.section_name,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addExerciseSubmitGraded(exercise))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}