import { toast } from "react-toastify";
import { fetchDataError } from "../../../store/actions/my_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getMyClass } from "./GetMyClass";

export function putMyClass(dispatch: any, id: number, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/classes/${id}`, {
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
                        dispatch(putMyClass(dispatch, id, data, idx))
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
                getMyClass(dispatch)
                toast.update(idx, { render: "Chỉnh lớp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Chỉnh lớp không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                dispatch(fetchDataError(error));
                console.log("error")
            });
}