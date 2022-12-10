import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/teacher_register_quantification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postNotifyDb } from "../NotifyDb/PostNotifyDb";
import { getTeacherRegisterQuantificationByTeacherId } from "./GetTeacherRegisterQuantificationByTeacherId";

export function deleteTeacherLevel(id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    let id_x = localStorage.getItem('id');
    var idxx = 0;
    if (id_x !== null) {
        idxx = parseInt(id_x);
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-register-level/${id}`, {
                    method: "DELETE",
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
                        dispatch(deleteTeacherLevel(id, idx))
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
                dispatch(postNotifyDb({
                    name: `Xóa yêu cầu đăng kí trình độ!`,
                    description: `Giáo viên đã xóa yêu cầu đăng kí trình độ!`
                }, id))
                toast.update(idx, { render: "Xóa yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });           
                getTeacherRegisterQuantificationByTeacherId(dispatch, idxx)
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Xóa yêu cầu không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}