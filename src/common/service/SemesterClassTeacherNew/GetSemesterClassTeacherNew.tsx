import { fetchDataSuccess, fetchDataError, removeSemesterClassTeacherAll, addSemesterClassTeacher } from "../../../store/actions/semester_class_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface SemesterClassTeacher {
    id: any;
    name: string;
    course_name: string;
    course_id: number;
    semester_class_id: number;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    semester_name: string;
    total_register: number;
    semester_id: number;
    status: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    registration_deadline: string;
}
export function getSemesterClassNewByTeacherCourse(dispatch: any, teacher_id: number, course_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
                `${process.env.REACT_APP_API_URL}/semester-class/teacher-course/${teacher_id}/${course_id}`, {
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
                        dispatch(getSemesterClassNewByTeacherCourse(dispatch, teacher_id, course_id))
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
                dispatch(removeSemesterClassTeacherAll())
                console.log(data.body.semester_classes)
                data.body.semester_classes.map((ele: any, index: any) => {
                    var val: SemesterClassTeacher = {
                        id: ele.id,
                        name: ele.name,
                        course_name: ele.course_name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_class_id: ele.semster_class_id,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        total_register: ele.total_register,
                        image_url: ele.image_url,
                        art_type_name: ele.art_type_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        schedule: ele.schedule,
                        semester_id: ele.semester_id,
                        status: ele.status,
                        registration_deadline: ele.registration_deadline
                    }
                
                    dispatch(addSemesterClassTeacher(val))
                    return 1
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}