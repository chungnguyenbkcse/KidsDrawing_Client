import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/schedule.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function postResetPassword(email: string, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/password-reset-token/user/resetPassword/${email}`, {
                    method: "POST",
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
                        dispatch(postResetPassword(email, idx))
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
                localStorage.removeItem('token_reset_password') // Authorization
                localStorage.setItem('token_reset_password', data.token)
                toast.update(idx, { render: "Vui lòng đợi email!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Gửi yêu cầu không thành công!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}