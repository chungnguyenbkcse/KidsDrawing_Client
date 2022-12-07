import { fetchDataSuccess, fetchDataError, removeCourseRegistedAll, removeCourseNotRegistedNowAll, addCourseNotRegistedNow, addCourseRegisted } from "../../../store/actions/course_student.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface CourseStudent {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    
    art_type_id: number;
    art_type_name: string;
    art_level_id: number;
    art_level_name: string;
    art_age_id: number;
    art_age_name: string;
    create_time: string;
    update_time: string;
}
export function getCourseStudent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/course/student/${id}`, {
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
                        dispatch(getCourseStudent(dispatch, id))
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
                dispatch(removeCourseNotRegistedNowAll())
                dispatch(removeCourseRegistedAll())
                console.log(data.body.courses_registed)
                console.log(data.body.courses_not_registed_now)
                data.body.courses_registed.map((ele: any, index: any) => {
                    var classes_student: CourseStudent = {
                        id: ele.id,
                        is_enabled: ele.is_enabled,
                        
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        image_url: ele.image_url,
                        art_age_id: ele.art_age_id,
                        art_level_id: ele.art_level_id,
                        art_type_id: ele.art_type_id,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(classes_student)
                    return dispatch(addCourseRegisted(classes_student))
                })

                data.body.courses_not_registed_now.map((ele: any, index: any) => {
                    var classes_student: CourseStudent = {
                        id: ele.id,
                        is_enabled: ele.is_enabled,
                        
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        image_url: ele.image_url,
                        art_age_id: ele.art_age_id,
                        art_level_id: ele.art_level_id,
                        art_type_id: ele.art_type_id,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(classes_student)
                    return dispatch(addCourseNotRegistedNow(classes_student))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}