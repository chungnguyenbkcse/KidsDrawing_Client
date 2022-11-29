import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/student_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacherLeaveByTeacher } from "./GetTeacherLeaveByTeacher";

export function deleteTeacherLeave(id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem('id');
    var idxx: number = 0;
    if (id_x !== null) {
        idxx = parseInt(id_x);
    }

    var id_y = localStorage.getItem('class_id');

    let class_id = 0;

    if (id_y !== null) {
        class_id = parseInt(id_y);
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-leave/${id}`, {
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
                        dispatch(deleteTeacherLeave(id, idx))
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
                getTeacherLeaveByTeacher(dispatch, idxx)
                toast.update(idx, { render: "Hủy yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Hủy yêu cầu không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
    };
}