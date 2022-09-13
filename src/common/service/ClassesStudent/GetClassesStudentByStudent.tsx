import { fetchDataSuccess, fetchDataError, addClassesStudent, removeClassesStudentAll } from "../../../store/actions/classes_student.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ClassesStudent {
    id: number;
    name: string;
    link_url: string;
    teacher_name: string;
    teacher_id: number;
    course_id: number;
    semester_class_id: number;
    user_register_teach_semester: number;
    security_code: string;
    total_student: number;
    total_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_type_id: number;
    art_level_id: number;
    art_age_id: number;
    art_age_name: string;
}
export function getClassesStudent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/classes/student/detail/${id}`, {
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
                        dispatch(getClassesStudent(dispatch, id))
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
                dispatch(removeClassesStudentAll())
                console.log(data.body.classes)
                data.body.classes.map((ele: any, index: any) => {
                    var class_teacher: ClassesStudent = {
                        id: ele.id,
                        name: ele.name,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_class_id: ele.semester_class_id,
                        user_register_teach_semester: ele.user_register_teach_semester,
                        security_code: ele.security_code,
                        total_student: ele.total_student,
                        total_section: ele.total_section,
                        link_url: ele.link_url,
                        art_age_id: ele.art_age_id,
                        art_level_id: ele.art_level_id,
                        art_type_id: ele.art_type_id,
                        course_name: ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name
                    }
                    console.log(class_teacher)
                    return dispatch(addClassesStudent(class_teacher))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}