import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function putAttendanceByUserAndSection( section_id: any, student_id: any,idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-attendance/section-student/${section_id}/${student_id}`, {
                    method: "PUT",
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
                        dispatch(putAttendanceByUserAndSection(section_id,student_id,  idx))
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
                toast.update(idx, { render: "Điểm danh thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Điểm danh không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}