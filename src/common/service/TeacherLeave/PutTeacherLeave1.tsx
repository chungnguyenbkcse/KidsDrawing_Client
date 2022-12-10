import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/teacher_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postNotifyDb } from "../NotifyDb/PostNotifyDb";
import { getTeacherLeaveByClass } from "./GetTeacherLeaveByClass";

export function putTeacherLeave(dispatch: any, id: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_y = localStorage.getItem('class_id');

    let class_id = 0;

    if (id_y !== null) {
        class_id = parseInt(id_y);
    }
    return  fetch(
                `${process.env.REACT_APP_API_URL}/teacher-leave/${id}`, {
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
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(putTeacherLeave(dispatch, id, data, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (val => {
                console.log(val)
                getTeacherLeaveByClass(dispatch, class_id)
                toast.update(idx, { render: "Yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
            });
}