import { fetchDataRequest, fetchDataError, removeNotifyDbAll, initialNotifyDb } from "../../../store/actions/notify_db.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface NotifyDb {
    id: any;
    name: string;
    description: string;
    time: string;
}
export function getNotifyDb() {
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
                        dispatch(getNotifyDb())
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
                dispatch(removeNotifyDbAll())
                console.log(data.body.notifications)
                data.body.notifications.map((ele: any, index: any) => {
                    let notificationDb: NotifyDb = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        time: ele.time
                    }
                    console.log(ele)
                    return dispatch(initialNotifyDb(notificationDb))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}