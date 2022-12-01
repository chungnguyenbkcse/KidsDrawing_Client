import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/teacher_register_quantification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacherRegisterQuantificationByTeacherId } from "./GetTeacherRegisterQuantificationByTeacherId";

export function putTeacherRegisterLevel(id: any, teacher_level: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-register-level/${id}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(teacher_level)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(putTeacherRegisterLevel(id, teacher_level, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (data => {
                toast.update(idx, { render: "Gửi yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataSuccess(teacher_level))
                getTeacherRegisterQuantificationByTeacherId(dispatch, teacher_level.teacher_id)
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Gửi yêu cầu không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}