import { fetchDataError, removeClassHasRegisterJoinSemesterAll, addClassHasRegisterJoinSemester } from "../../../store/actions/class_has_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ClassHasRegisterJoinSemester {
    classes_id: number;
    user_register_join_semester_id: number;
    review_star: number;
    student_feedback: string;
    teacher_feedback: string;
}
export function getInforClassHasRegisterJoinSemester(dispatch: any, classes_id: number, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/class-has-register-join-semester/${classes_id}/${student_id}`, {
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
                        dispatch(getInforClassHasRegisterJoinSemester(dispatch, classes_id, student_id))
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
                dispatch(removeClassHasRegisterJoinSemesterAll())
                var class_has_register_join_semester: ClassHasRegisterJoinSemester = {
                    classes_id: data.classes_id,
                    student_feedback: data.student_feedback,
                    user_register_join_semester_id: data.user_register_join_semester_id,
                    teacher_feedback: data.teacher_feedback,
                    review_star: data.review_star
                }
                dispatch(addClassHasRegisterJoinSemester(class_has_register_join_semester))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}