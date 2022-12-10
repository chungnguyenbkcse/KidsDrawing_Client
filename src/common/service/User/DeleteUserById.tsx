import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getInforChildByParent } from "../Childs/GetInforChildByParent";

export function deleteUserChild(id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem('id');
    var idxx: number = 0;
    if (id_x !== null) {
        idxx = parseInt(id_x);
    }

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/user/${id}`, {
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
                        dispatch(deleteUserChild(id, idx))
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
                getInforChildByParent(dispatch, idxx)
                toast.update(idx, { render: "Xóa tài khoản thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER , autoClose: 1000});
            })
            .catch(error => {
                toast.update(idx, { render: "Xóa tài khoản không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}