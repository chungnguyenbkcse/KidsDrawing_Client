import { fetchDataRequest, fetchDataError, removeNotifyAll, initialNotify } from "../../../store/actions/notify.action";
import { INotify } from "../../../store/models/notify.interface";
import { postRefreshToken } from "../Aut/RefreshToken";
export function getNotify() {
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
                        dispatch(getNotify())
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
                dispatch(removeNotifyAll())
                console.log(data.body.notifications)
                data.body.notifications.map((ele: any, index: any) => {
                    let notification: INotify = {
                        idx: ele.id,
                        name: ele.name,
                        description: ele.description,
                        time: ele.time
                    }
                    console.log(ele)
                    return dispatch(initialNotify(notification))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}