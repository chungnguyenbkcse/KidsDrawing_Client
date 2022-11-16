import { fetchDataSuccess, fetchDataError, removeSemesterClassStudentNotPayedAll, removeSemesterClassStudentNotPayedNowAll, removeSemesterClassStudentPayedAll, addSemesterClassStudentNotPayed, addSemesterClassStudentNotPayedNow, addSemesterClassStudentPayed } from "../../../store/actions/semester_class_student.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface SemesterClassStudent {
    id: any;
    name: string;
    course_name: string;
    course_id: number;
    semester_class_id: number;
    description: string;
    max_participant: number;
    num_of_section: number;
    registration_expiration_time: string;
    start_date: string;
    price: number;
    semester_name: string;
    semester_id: number;
    status: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    registration_deadline: string;
}
export function getSemesterClassStudent(dispatch: any, student_id: number, course_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
                `${process.env.REACT_APP_API_URL}/semester-class/student-course/${student_id}/${course_id}`, {
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
                        dispatch(getSemesterClassStudent(dispatch, student_id, course_id))
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
                dispatch(removeSemesterClassStudentNotPayedAll())
                dispatch(removeSemesterClassStudentNotPayedNowAll())
                dispatch(removeSemesterClassStudentPayedAll())
                console.log(data.body.semester_classes)
                data.body.semester_classes.map((ele: any, index: any) => {
                    var val: SemesterClassStudent = {
                        id: ele.id,
                        name: ele.name,
                        course_name: ele.course_name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_class_id: ele.semster_class_id,
                        description: ele.description,
                        registration_expiration_time: ele.registration_expiration_time,
                        start_date: ele.start_date,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        image_url: ele.image_url,
                        art_type_name: ele.art_type_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        schedule: ele.schedule,
                        semester_id: ele.semester_id,
                        status: ele.status,
                        registration_deadline: ele.registration_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (ele.status === "Registed") {
                        dispatch(addSemesterClassStudentPayed(val))
                    }
                    else if (ele.status === "Not register") {
                        dispatch(addSemesterClassStudentNotPayed(val))
                    }
                    else {
                        dispatch(addSemesterClassStudentNotPayedNow(val))
                    }
                    return 1
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}