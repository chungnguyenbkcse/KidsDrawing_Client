import { fetchDataError, removeClassHasRegisterJoinSemesterAll, addClassHasRegisterJoinSemester } from "../../../store/actions/class_has_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ClassHasRegisterJoinSemester {
    classes_id: number;
    student_id: number;
    student_name: string;
    review_star: number;
    student_feedback: string;
    teacher_feedback: string;
}
export function getClassHasRegisterJoinSemesterByClass(dispatch: any, classes_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/class-has-register-join-semester/classes/${classes_id}`, {
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
                        dispatch(getClassHasRegisterJoinSemesterByClass(dispatch, classes_id))
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
                console.log(data.body.class_has_register_join_semester_classs)
                data.body.class_has_register_join_semester_classs.map((ele: any, index: any) => {
                    var class_has_register_join_semester: ClassHasRegisterJoinSemester = {
                        classes_id: ele.classes_id,
                        student_feedback: ele.student_feedback,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        teacher_feedback: ele.teacher_feedback,
                        review_star: ele.review_star
                    }

                    dispatch(addClassHasRegisterJoinSemester(class_has_register_join_semester))
                })
                
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}