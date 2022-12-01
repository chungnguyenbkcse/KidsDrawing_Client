import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getStudentByParent } from "../Student/GetStudentByParent";

export function postUser(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/registration`, {
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
                        dispatch(postUser(data, idx))
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
                getStudentByParent(dispatch, localStorage.getItem('id'))
                toast.update(idx, { render: "Thêm tài khoản con thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataSuccess(data))
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm tài khoản con không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}