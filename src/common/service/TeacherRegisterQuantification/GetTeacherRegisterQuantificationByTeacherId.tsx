import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTeacherRegisterQuatificationAll, initialTeacherRegisterQuatification, addTeacherRegisterQuatification } from "../../../store/actions/teacher_register_quantification.action";
interface TeacherRegisterQuantification {
    id: number;
    teacher_id: number;
    reviewer_id: number;
    course_id: number;
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
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeTeacherRegisterQuatificationAll())
                console.log(data.body.teacher_register_qualification)
                data.body.teacher_register_qualification.map((ele: any, index: any) => {
                    var TeacherRegisterQuantification: TeacherRegisterQuantification = {
                        id: ele.id,
                        teacher_id: ele.teacher_id,
                        reviewer_id: ele.reviewer_id,
                        course_id: ele.course_id,
                        degree_photo_url: ele.degree_photo_url,
                        status: ele.status
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTeacherRegisterQuatification(TeacherRegisterQuantification));
                    }
                    else{
                        return dispatch(addTeacherRegisterQuatification(TeacherRegisterQuantification))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}