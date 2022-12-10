import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSemester } from "../../../store/actions/semester.actions";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getSemester } from "./GetSemester";

export function deleteSemester(dispatch: any, id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
            `${process.env.REACT_APP_API_URL}/semester/${id}`, {
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
                        dispatch(deleteSemester(dispatch, id, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (data => {
                console.log(data)
                toast.update(idx, { render: "Xóa học kì thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                dispatch(fetchDataSuccess(data))
                dispatch(removeSemester(id))
                getSemester(dispatch)
            })
            .catch(error => {
                toast.update(idx, { render: "Xóa khóa học không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                dispatch(fetchDataError(error));
                console.log("error")
            });
}