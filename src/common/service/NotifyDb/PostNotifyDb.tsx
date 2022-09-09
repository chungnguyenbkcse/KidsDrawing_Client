import { fetchDataRequest, fetchDataError } from "../../../store/actions/art_age.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postUserReadNotification } from "../UserReadNotification/PostUserReadNotification";

export function postNotifyDb(data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/notification-database`, {
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
                        dispatch(postNotifyDb(data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then(xx => {
                console.log(xx)
                dispatch(postUserReadNotification({
                    notification_id: xx.id,
                    user_id: data.creator_id,
                    is_read: false
                }))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}