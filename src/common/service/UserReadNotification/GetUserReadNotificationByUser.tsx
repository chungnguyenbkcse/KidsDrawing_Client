import { fetchDataRequest, fetchDataSuccess, fetchDataError, addUserNotReadedNotification, removeUserNotReadedNotificationAll, addUserReadedNotification, removeUserReadedNotificationAll} from "../../../store/actions/user_read_notification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface UserReadNotification {
    notification_id: string;
    user_id: string;
    is_read: boolean;
}
export function getUserReadNotification(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-read-notification/user/${id}`, {
                    method: "GET",
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
                        dispatch(getUserReadNotification(id))
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
                dispatch(fetchDataSuccess(data))
                dispatch(removeUserNotReadedNotificationAll())
                dispatch(removeUserReadedNotificationAll())
                console.log(data.body.UserReadNotification)
                data.body.UserReadNotification.map((ele: any, index: any) => {
                    var userReadNotification: UserReadNotification = {
                        notification_id: ele.notification_id,
                        user_id: ele.user_id,
                        is_read: ele.is_read
                    }
                    if (userReadNotification.is_read === true){
                        return dispatch(addUserReadedNotification(userReadNotification))
                    }
                    else {
                        return dispatch(addUserNotReadedNotification(userReadNotification))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}