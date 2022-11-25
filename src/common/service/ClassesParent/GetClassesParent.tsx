import { fetchDataSuccess, fetchDataError, removeDoinglClassAll, removeDoneClassAll, initialDoinglClass, initialDoneClass,  addDoinglClass, addDoneClass } from "../../../store/actions/classes_parent.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ClassesParent {
    id: any;
    name: string;
    link_url: string;
    student_id: number;
    student_name: string;
    teacher_name: string;
    teacher_id: number;
    course_id: number;
    url_image_course: string;
    semester_class_id: number;
    semester_class_name: string;
    user_register_teach_semester: number;
    security_code: string;
    total_section_studied: number;
    total_student: number;
    total_section: number;
    schedule_section_next: string;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_type_id: number;
    art_level_id: number;
    art_age_id: number;
    art_age_name: string;
}
export function getClassesParent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/classes/parent/${id}`, {
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
                        dispatch(getClassesParent(dispatch, id))
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
                    var classes_parent: ClassesParent = {
                        id: ele.id,
                        name: ele.name,
                        semester_class_name: ele.semester_class_name,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_class_id: ele.semester_class_id,
                        url_image_course: ele.url_image_course,
                        user_register_teach_semester: ele.user_register_teach_semester,
                        security_code: ele.security_code,
                        schedule_section_next: ele.schedule_section_next,
                        total_student: ele.total_student,
                        total_section: ele.total_section,
                        total_section_studied: ele.total_section_studied,
                        link_url: ele.link_url,
                        art_age_id: ele.art_age_id,
                        art_level_id: ele.art_level_id,
                        art_type_id: ele.art_type_id,
                        course_name: ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name
                    }
                    console.log(classes_parent)
                    if (index === 0){
                        return dispatch(initialDoneClass(classes_parent));
                    }
                    else{
                        return dispatch(addDoneClass(classes_parent))
                    }
                })

                data.body.classes_doing.map((ele: any, index: any) => {
                    var classes_parent: ClassesParent = {
                        id: ele.id,
                        name: ele.name,
                        student_id: ele.student_id,
                        semester_class_name: ele.semester_class_name,
                        student_name: ele.student_name,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        schedule_section_next: ele.schedule_section_next,
                        semester_name: ele.semester_name,
                        semester_class_id: ele.semester_class_id,
                        user_register_teach_semester: ele.user_register_teach_semester,
                        security_code: ele.security_code,
                        total_student: ele.total_student,
                        total_section_studied: ele.total_section_studied,
                        total_section: ele.total_section,
                        link_url: ele.link_url,
                        url_image_course: ele.url_image_course,
                        art_age_id: ele.art_age_id,
                        art_level_id: ele.art_level_id,
                        art_type_id: ele.art_type_id,
                        course_name: ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name
                    }
                    console.log(classes_parent)
                    if (index === 0){
                        return dispatch(initialDoinglClass(classes_parent));
                    }
                    else{
                        return dispatch(addDoinglClass(classes_parent))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}