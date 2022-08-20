import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getMyClass } from "./GetMyClass";
import { postCalendar } from "./PostCalendar";

export function postScheduleClass(id: any, data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester/schedule-class/${id}`, {
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
                    throw Error(response.statusText);
                }
                return response
            })
            .then (val => {
                console.log(val)
                dispatch(fetchDataSuccess(id))
                dispatch(getMyClass())
                dispatch(postCalendar(id, data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}