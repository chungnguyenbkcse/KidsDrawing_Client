import { fetchDataSuccess, fetchDataError, removeDoinglClassAll, removeDoneClassAll, initialDoinglClass, initialDoneClass,  addDoinglClass, addDoneClass } from "../../../store/actions/classes_student.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ClassesStudent {
    id: string;
    name: string;
    link_url: string;
    student_id: string;
    student_name: string;
    user_register_join_semester_id: string;
    teacher_name: string;
    teacher_id: string;
    course_id: string;
    semester_class_id: string;
    semester_class_name: string;
    user_register_teach_semester: number;
    security_code: string;
    total_student: number;
    total_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_type_id: string;
    art_level_id: string;
    art_age_id: string;
    art_age_name: string;
}
export function getClassesStudent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/classes/student/${id}`, {
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
                dispatch(removeDoinglClassAll())
                dispatch(removeDoneClassAll())
                console.log(data.body.classes_done)
                console.log(data.body.classes_doing)
                data.body.classes_done.map((ele: any, index: any) => {
                    var classes_student: ClassesStudent = {
                        id: ele.id,
                        name: ele.name,
                        semester_class_name: ele.semester_class_name,
                        student_id: ele.student_id,
                        user_register_join_semester_id: ele.user_register_join_semester_id,
                        student_name: ele.student_name,
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
                    console.log(classes_student)
                    if (index === 0){
                        return dispatch(initialDoneClass(classes_student));
                    }
                    else{
                        return dispatch(addDoneClass(classes_student))
                    }
                })

                data.body.classes_doing.map((ele: any, index: any) => {
                    var classes_student: ClassesStudent = {
                        id: ele.id,
                        name: ele.name,
                        student_id: ele.student_id,
                        semester_class_name: ele.semester_class_name,
                        student_name: ele.student_name,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_class_id: ele.semester_class_id,
                        user_register_teach_semester: ele.user_register_teach_semester,
                        security_code: ele.security_code,
                        user_register_join_semester_id: ele.user_register_join_semester_id,
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
                    console.log(classes_student)
                    if (index === 0){
                        return dispatch(initialDoinglClass(classes_student));
                    }
                    else{
                        return dispatch(addDoinglClass(classes_student))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}