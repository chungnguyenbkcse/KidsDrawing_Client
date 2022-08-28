import { fetchDataRequest, fetchDataSuccess, fetchDataError, 
    removeTeacherRegisterQuatificationApprovedAll, initialTeacherRegisterQuatificationApproved, addTeacherRegisterQuatificationApproved,
    removeTeacherRegisterQuatificationNotApprovedAll, initialTeacherRegisterQuatificationNotApproved, addTeacherRegisterQuatificationNotApproved,
    removeTeacherRegisterQuatificationNotApprovedNowAll, initialTeacherRegisterQuatificationNotApprovedNow, addTeacherRegisterQuatificationNotApprovedNow
} from "../../../store/actions/teacher_register_quantification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TeacherRegisterQuantification {
    id: number;
    teacher_id: number;
    teacher_name: string;
    reviewer_id: number;
    course_id: number;
    course_name: string;
    art_age_name: string;
    art_type_name: string;
    art_level_name: string;
    degree_photo_url: string;
    status: string;
}
export function getTeacherRegisterQuantificationByTeacherId(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-register-level/teacher/${id}`, {
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
                console.log(response)
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(getTeacherRegisterQuantificationByTeacherId(id))
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
                console.log(data)
                dispatch(fetchDataSuccess(data))
                dispatch(removeTeacherRegisterQuatificationApprovedAll())
                console.log(data.body.approved)
                console.log(data.body.not_approved)
                console.log(data.body.not_approved_now)
                data.body.approved.map((ele: any, index: any) => {
                    var TeacherRegisterQuantification: TeacherRegisterQuantification = {
                        id: ele.id,
                        teacher_id: ele.teacher_id,
                        reviewer_id: ele.reviewer_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        course_name:ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name,
                        degree_photo_url: ele.degree_photo_url,
                        status: ele.status
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTeacherRegisterQuatificationApproved(TeacherRegisterQuantification));
                    }
                    else{
                        return dispatch(addTeacherRegisterQuatificationApproved(TeacherRegisterQuantification))
                    }
                })

                dispatch(removeTeacherRegisterQuatificationNotApprovedAll())
                
                data.body.not_approved.map((ele: any, index: any) => {
                    var TeacherRegisterQuantification: TeacherRegisterQuantification = {
                        id: ele.id,
                        teacher_id: ele.teacher_id,
                        reviewer_id: ele.reviewer_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        course_name:ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name,
                        degree_photo_url: ele.degree_photo_url,
                        status: ele.status
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTeacherRegisterQuatificationNotApproved(TeacherRegisterQuantification));
                    }
                    else{
                        return dispatch(addTeacherRegisterQuatificationNotApproved(TeacherRegisterQuantification))
                    }
                })

                dispatch(removeTeacherRegisterQuatificationNotApprovedNowAll())
                data.body.not_approved_now.map((ele: any, index: any) => {
                    var TeacherRegisterQuantification: TeacherRegisterQuantification = {
                        id: ele.id,
                        teacher_id: ele.teacher_id,
                        reviewer_id: ele.reviewer_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        course_name:ele.course_name,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name,
                        degree_photo_url: ele.degree_photo_url,
                        status: ele.status
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTeacherRegisterQuatificationNotApprovedNow(TeacherRegisterQuantification));
                    }
                    else{
                        return dispatch(addTeacherRegisterQuatificationNotApprovedNow(TeacherRegisterQuantification))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}