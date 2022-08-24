import { toast } from "react-toastify";
import { addNotification } from "../../../store/actions/notifications.action";
import { fetchDataRequest, fetchDataSuccess, editTeacher, fetchDataError, clearSelectedUser, setModificationState } from "../../../store/actions/users.action";
import { UserModificationStatus } from "../../../store/models/user.interface";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacher } from "./GetTeacher";

export function putTeacher(id: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user/${id}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then( response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then (val => {
                console.log(val)
                console.log(id)
                toast.update(idx, { render: "Chỉnh thông tin tài khoản thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
                dispatch(getTeacher())
            })
            .catch(error => {
                toast.update(id, { render: "Chỉnh thông tin tài khoản không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}