import { toast } from "react-toastify";
import { addNotification } from "../../../store/actions/notifications.action";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, addLeaves } from "../../../store/actions/teacher_leave.action";
import { UserModificationStatus } from "../../../store/models/user.interface";
import { postRefreshToken } from "../Aut/RefreshToken";

export function putTeacherLeaveStatus(id: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-leave/admin/${id}`, {
                    method: "POST",
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
                toast.update(idx, { render: "Yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
    };
}