import { fetchDataRequest, fetchDataError, removeScheduleItem } from "../../../store/actions/schedule_item.action";

export function deleteScheduleItem(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/schedule-item/${id}`, {
                method: "DELETE",
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
            .then (data => {
                console.log(data)
                dispatch(removeScheduleItem(id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}