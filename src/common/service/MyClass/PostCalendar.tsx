import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function postCalendar(id: any, holiday: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester/calender/${id}`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(holiday)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postCalendar(id, holiday))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (val => {
                console.log(val)
                dispatch(fetchDataSuccess(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}