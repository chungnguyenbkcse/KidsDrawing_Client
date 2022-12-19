import { fetchDataSuccess, fetchDataError, removeTeacherRegisterQuatificationApprovedAll, initialTeacherRegisterQuatificationApproved, addTeacherRegisterQuatificationApproved, removeTeacherRegisterQuatificationNotApprovedNowAll, removeTeacherRegisterQuatificationNotApprovedAll, initialTeacherRegisterQuatificationNotApproved, addTeacherRegisterQuatificationNotApproved, initialTeacherRegisterQuatificationNotApprovedNow, addTeacherRegisterQuatificationNotApprovedNow } from "../../../store/actions/teacher_register_quantification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TeacherRegisterQuantification {
    id: any;
    teacher_id: number;
    teacher_name: string;
    reviewer_id: number;
    course_id: number;
    course_name: string;
    art_age_name: string;
    time_approved: string;
    art_type_name: string;
    art_level_name: string;
    degree_photo_url: string;
    status: string;
}
export function getTeacherRegisterQuantification(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
                `${process.env.REACT_APP_API_URL}/teacher-register-level`, {
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
                        dispatch(getTeacherRegisterQuantification(dispatch))
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
                dispatch(removeTeacherRegisterQuatificationApprovedAll())
                dispatch(removeTeacherRegisterQuatificationNotApprovedNowAll())
                dispatch(removeTeacherRegisterQuatificationNotApprovedAll())
                console.log(data.body.teacher_register_qualification)
                data.body.teacher_register_qualification.map((ele: any, index: any) => {
                    var TeacherRegisterQuantification: TeacherRegisterQuantification = {
                        id: ele.id,
                        teacher_id: ele.teacher_id,
                        reviewer_id: ele.reviewer_id,
                        teacher_name: ele.teacher_name,
                        course_id: ele.course_id,
                        course_name:ele.course_name,
                        time_approved: ele.time_approved,
                        art_age_name: ele.art_age_name,
                        art_level_name: ele.art_level_name,
                        art_type_name: ele.art_type_name,
                        degree_photo_url: ele.degree_photo_url,
                        status: ele.status
                    }
                    //console.log(strDate.substring(0, 16))
                    if (ele.status === "Approved"){
                        if (index === 0){
                            return dispatch(initialTeacherRegisterQuatificationApproved(TeacherRegisterQuantification));
                        }
                        else{
                            return dispatch(addTeacherRegisterQuatificationApproved(TeacherRegisterQuantification))
                        }
                    }
                    else if (ele.status === "Not approve now"){
                        if (index === 0){
                            return dispatch(initialTeacherRegisterQuatificationNotApprovedNow(TeacherRegisterQuantification));
                        }
                        else{
                            return dispatch(addTeacherRegisterQuatificationNotApprovedNow(TeacherRegisterQuantification))
                        }
                    }
                    else {
                        if (index === 0){
                            return dispatch(initialTeacherRegisterQuatificationNotApproved(TeacherRegisterQuantification));
                        }
                        else{
                            return dispatch(addTeacherRegisterQuatificationNotApproved(TeacherRegisterQuantification))
                        }
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}