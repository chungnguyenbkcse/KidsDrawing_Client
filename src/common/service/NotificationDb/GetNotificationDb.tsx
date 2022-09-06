import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeNotificationDbAll, initialNotificationDb, addNotificationDb } from "../../../store/actions/notification_db.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface NotificationDb {
    id: number;
    name: string;
    description: string;
    time: string;
}
export function getNotificationDb() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/notification-database`, {
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
                        dispatch(getNotificationDb())
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
                dispatch(removeNotificationDbAll())
                console.log(data.body.notifications)
                data.body.notifications.map((ele: any, index: any) => {
                    var NotificationDb: NotificationDb = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        time: ele.time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialNotificationDb(NotificationDb));
                    }
                    else{
                        return dispatch(addNotificationDb(NotificationDb))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}