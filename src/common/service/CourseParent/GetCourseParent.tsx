import { fetchDataSuccess, fetchDataError, removeCourseRegistedAll, removeCourseNotRegistedNowAll, addCourseNotRegistedNow, addCourseRegisted } from "../../../store/actions/course_parent.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface CourseParent {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    creator_id: number;
    art_type_id: number;
    art_type_name: string;
    art_level_id: number;
    art_level_name: string;
    art_age_id: number;
    art_age_name: string;
    create_time: string;
    update_time: string;
}
export function getCourseParent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/course/parent/${id}`, {
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
                        dispatch(getCourseParent(dispatch, id))
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
                    var classes_parent: CourseParent = {
                        id: ele.id,
                        is_enabled: ele.is_enabled,
                        creator_id: ele.creator_id,
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
                    console.log(classes_parent)
                    return dispatch(addCourseRegisted(classes_parent))
                })

                data.body.courses_not_registed_now.map((ele: any, index: any) => {
                    var classes_parent: CourseParent = {
                        id: ele.id,
                        is_enabled: ele.is_enabled,
                        creator_id: ele.creator_id,
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
                    console.log(classes_parent)
                    return dispatch(addCourseNotRegistedNow(classes_parent))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}