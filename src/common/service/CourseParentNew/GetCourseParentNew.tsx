import { logout } from "../../../store/actions/account.actions";
import { fetchDataSuccess, fetchDataError, removeCourseParentNewAll, initialCourseParentNew, addCourseParentNew } from "../../../store/actions/course_parent_new.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface CourseParentNew {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    
    art_type_id: number;
    art_level_id: number;
    art_age_id: number;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    total: number;
    total_register: number;
    student_name: string;
    student_id: number;
    create_time: string;
    update_time: string;
}
export function getCourseParentNew(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/course/parent-new/${id}`, {
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
                        dispatch(getCourseParentNew(dispatch, id))
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
                dispatch(removeCourseParentNewAll())
                console.log(data.body.courses)
                data.body.courses.map((ele: any, index: any) => {
                    var course: CourseParentNew = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        image_url: ele.image_url,
                        is_enabled: ele.is_enabled,
                        
                        art_type_id: ele.art_type_id,
                        art_level_id: ele.art_level_id,
                        art_age_id: ele.art_age_id,
                        art_age_name: ele.art_age_name,
                        art_type_name: ele.art_type_name,
                        art_level_name: ele.art_level_name,
                        total: ele.total,
                        total_register: ele.total_register,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        create_time: ele.create_time,
                        update_time: ele.update_time

                    }
                    console.log(course)
                    if (index === 0){
                        return dispatch(initialCourseParentNew(course));
                    }
                    else{
                        return dispatch(addCourseParentNew(course))
                    }
                })
                dispatch(logout())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}