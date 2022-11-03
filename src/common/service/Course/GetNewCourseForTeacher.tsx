import { logout } from "../../../store/actions/account.actions";
import { fetchDataSuccess, fetchDataError, removeCourseAll, initialCourse, addCourse } from "../../../store/actions/course.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Course {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    creator_id: any;
    art_type_id: any;
    art_level_id: any;
    art_age_id: any;
    art_age_name: string;
    checked_tutoral: boolean;
    art_type_name: string;
    art_level_name: string;
    create_time: string;
    update_time: string;
}
export function getCourseNewForTeacher(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/course/teacher-new/${id}`, {
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
                        dispatch(getCourseNewForTeacher(dispatch, id))
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
                dispatch(removeCourseAll())
                console.log(data.body.courses)
                data.body.courses.map((ele: any, index: any) => {
                    var course: Course = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        num_of_section: ele.num_of_section,
                        price: ele.price,
                        image_url: ele.image_url,
                        is_enabled: ele.is_enabled,
                        creator_id: ele.creator_id,
                        art_type_id: "",
                        art_level_id: "",
                        art_age_id: "",
                        art_age_name: "", 
                        art_level_name: "",
                        art_type_name: "",
                        checked_tutoral: false,
                        create_time: ele.create_time,
                        update_time: ele.update_time

                    }
                    console.log(course)
                    if (index === 0){
                        return dispatch(initialCourse(course));
                    }
                    else{
                        return dispatch(addCourse(course))
                    }
                })
                dispatch(logout())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}