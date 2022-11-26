import { fetchDataSuccess, fetchDataError, removeSemesterClassParentNotPayedAll, removeSemesterClassParentNotPayedNowAll, removeSemesterClassParentPayedAll, addSemesterClassParentNotPayed, addSemesterClassParentNotPayedNow, addSemesterClassParentPayed } from "../../../store/actions/semester_class_parent.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface SemesterClassParent {
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
    semester_id: number;
    status: string;
    image_url: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
    start_date: string;
    registration_expiration_time: string;
    registration_deadline: string;
    student_name: string;
    student_id: number;
}
export function getSemesterClassByParentCourse(dispatch: any, parent_id: number, course_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
                `${process.env.REACT_APP_API_URL}/semester-class/parent-course/${parent_id}/${course_id}`, {
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
                        dispatch(getSemesterClassByParentCourse(dispatch, parent_id, course_id))
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
                dispatch(removeSemesterClassParentNotPayedAll())
                dispatch(removeSemesterClassParentNotPayedNowAll())
                dispatch(removeSemesterClassParentPayedAll())
                console.log(data.body.semester_classes)
                data.body.semester_classes.map((ele: any, index: any) => {
                    var val: SemesterClassParent = {
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
                        image_url: ele.image_url,
                        start_date: ele.start_date,
                        registration_expiration_time: ele.registration_expiration_time,
                        art_type_name: ele.art_type_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        schedule: ele.schedule,
                        semester_id: ele.semester_id,
                        status: ele.status,
                        registration_deadline: ele.registration_time,
                        student_id: ele.student_id,
                        student_name: ele.student_name
                    }
                    //console.log(strDate.substring(0, 16))
                    if (ele.status === "Payed") {
                        dispatch(addSemesterClassParentPayed(val))
                    }
                    else if (ele.status === "Not Payed") {
                        dispatch(addSemesterClassParentNotPayed(val))
                    }
                    else {
                        dispatch(addSemesterClassParentNotPayedNow(val))
                    }
                    return 1
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}