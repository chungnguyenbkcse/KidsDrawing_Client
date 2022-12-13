import { fetchDataSuccess, fetchDataError, removeChildsClassAll, addChildsClass } from "../../../store/actions/childs_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getExerciseSubmissionByClassAndStudent } from "../ExerciseSubmission/GetExerciseSubmissionByClassAndStudent";
interface user {
    student_id: number,
    student_name: string,
    dateOfBirth: string,
    sex: string,
}
export function getChildsClassByClassAndParent(dispatch: any, class_id: number, parent_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/classes/class-parent/childs/${class_id}/${parent_id}`, {
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
                        postRefreshToken()
                        getChildsClassByClassAndParent(dispatch, class_id, parent_id)
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
                dispatch(removeChildsClassAll())
                console.log(data.body.students)
                let student_names: string[] = [];
                let student_ids: number[] = []
                data.body.students.map ((ele: any) => {
                    var user: user = {
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        dateOfBirth: ele.dateOfBirth,
                        sex: ele.sex
                    }
                    student_names.push(ele.student_name);
                    student_ids.push(ele.student_id);
                    return dispatch(addChildsClass(user));
                })

                localStorage.removeItem('student_names');
                localStorage.setItem('student_names', JSON.stringify(student_names))
                localStorage.removeItem('student_ids');
                localStorage.setItem('student_ids', JSON.stringify(student_ids))

                if (data.body.students.length == 1) {
                    getExerciseSubmissionByClassAndStudent(dispatch, class_id,data.body.students[0])
                }
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}