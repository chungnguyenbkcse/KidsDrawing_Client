import { toast } from "react-toastify";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getAttendanceBySection } from "./GetAttendanceBySection";

export function putAttendance1(dispatch: any, data: any, id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_y = localStorage.getItem('section_id');
    let section_id = 0;
    if (id_y !== null) {
        section_id = parseInt(id_y)
    }
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-attendance/${id}`, {
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
                        dispatch(putAttendance1(dispatch,data, id, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (xx => {
                toast.update(idx, { render: "Gửi điểm danh thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                getAttendanceBySection(dispatch, section_id)
            })
            .catch(error => {
                toast.update(idx, { render: "Gửi điểm danh không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
}