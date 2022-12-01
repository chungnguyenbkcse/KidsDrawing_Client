import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/student_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getStudentLeave } from "./GetStudentLeave";
import { getStudentLeaveByTeacher } from "./GetStudentLeaveByTeacher";
export function putStudentLeaveStatus(id: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem('id');
    var idy: any = "";
    if (id_x !== null) {
        idy = id_x;
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/student-leave/admin/${id}`, {
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
                        dispatch(putStudentLeaveStatus(id, data, idx))
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
                getStudentLeaveByTeacher(dispatch, idy)
                toast.update(idx, { render: "Yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
            });
    };
}