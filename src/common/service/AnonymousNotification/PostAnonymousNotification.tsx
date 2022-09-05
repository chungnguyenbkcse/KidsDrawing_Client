import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/art_age.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function postAnonymousNotification(recipient: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/sendEmail/${recipient}`, {
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
            .then(response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postAnonymousNotification(recipient,data, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then(data => {
                console.log(data)
                toast.update(idx, { render: "Gửi thông báo thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Gửi thông báo không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}