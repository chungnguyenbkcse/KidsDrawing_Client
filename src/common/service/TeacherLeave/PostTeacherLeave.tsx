import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/teacher_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacherLeaveByClass } from "./GetTeacherLeaveByClass";

export function postTeacherLeave(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    var id_y = localStorage.getItem('class_id');

    let class_id = 0;

    if (id_y !== null) {
        class_id = parseInt(id_y);
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-leave`, {
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
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postTeacherLeave(data, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (val => {
                toast.update(idx, { render: "Yêu cầu nghỉ dạy đã được gửi thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log(val)
                getTeacherLeaveByClass(dispatch, class_id)
            })
            .catch(error => {
                toast.update(idx, { render: "Yêu cầu nghỉ dạy đã được gửi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
            });
    };
}