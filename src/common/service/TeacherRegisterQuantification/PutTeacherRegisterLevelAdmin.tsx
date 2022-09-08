import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/teacher_register_quantification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacherRegisterQuantificationByTeacherId } from "./GetTeacherRegisterQuantificationByTeacherId";

export function putTeacherRegisterLevelAdmin(id: any, teacher_id: any, teacher_level: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-register-level/admin/${id}`, {
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
                        dispatch(putTeacherRegisterLevelAdmin(teacher_level,teacher_id, id, idx))
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
                toast.update(idx, { render: "Bạn đã xác nhận trình độ cho giáo viên thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataSuccess(teacher_level))
                dispatch(getTeacherRegisterQuantificationByTeacherId(dispatch, teacher_id))
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Bạn đã xác nhận trình độ cho giáo viên không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}