import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeDoinglClassAll, removeDoneClassAll, initialDoinglClass, initialDoneClass,  addDoinglClass, addDoneClass } from "../../../store/actions/class_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ClassTeacher {
    id: number;
    name: string;
    course_id: number;
    semester_course_id: number;
    registration_id: number;
    security_code: string;
    total_student: number;
    num_of_section: number;
    course_name: string;
    semester_name: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    schedule: string;
}
export function getClassTeacher(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/classes/teacher/${id}`, {
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
                        dispatch(getClassTeacher(id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeDoinglClassAll())
                dispatch(removeDoneClassAll())
                console.log(data.body.classes_done)
                console.log(data.body.classes_doning)
                data.body.classes_done.map((ele: any, index: any) => {
                    var class_teacher: ClassTeacher = {
                        id: ele.id,
                        name: ele.name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_course_id: ele.semester_course_id,
                        registration_id: ele.registration_id,
                        security_code: ele.security_code,
                        total_student: ele.total_student,
                        num_of_section: ele.num_of_section,
                        schedule: ele.schedule,
                        course_name: ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name
                    }
                    console.log(class_teacher)
                    if (index === 0){
                        return dispatch(initialDoneClass(class_teacher));
                    }
                    else{
                        return dispatch(addDoneClass(class_teacher))
                    }
                })

                data.body.classes_doning.map((ele: any, index: any) => {
                    var class_teacher: ClassTeacher = {
                        id: ele.id,
                        name: ele.name,
                        course_id: ele.course_id,
                        semester_name: ele.semester_name,
                        semester_course_id: ele.semester_course_id,
                        registration_id: ele.registration_id,
                        security_code: ele.security_code,
                        total_student: ele.total_student,
                        num_of_section: ele.num_of_section,
                        schedule: ele.schedule,
                        course_name: ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name
                    }
                    console.log(class_teacher)
                    if (index === 0){
                        return dispatch(initialDoinglClass(class_teacher));
                    }
                    else{
                        return dispatch(addDoinglClass(class_teacher))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}