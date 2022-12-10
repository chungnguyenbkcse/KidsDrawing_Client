import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError, removeArtLevel } from "../../../store/actions/art_level.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function deleteArtLevel(id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/art-level/${id}`, {
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
                        dispatch(deleteArtLevel(id, idx))
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
                console.log(data)
                toast.update(idx, { render: "Xóa trình độ thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                dispatch(removeArtLevel(id))
            })
            .catch(error => {
                toast.update(idx, { render: "Xóa trình độ không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}