import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_age.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function postNotificationByClass(id: any,data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/sendEmail/class/${id}`, {
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
                        dispatch(postNotificationByClass(id,data, idx))
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
                toast.update(idx, { render: "Thông báo gửi thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Thông báo gửi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}