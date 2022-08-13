import { fetchDataRequest, fetchDataError } from "../../../store/actions/schedule.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postScheduleItem } from "../ScheduleItem/PostScheduleItem";
import { getSchedule } from "./GetSchedule";

export function postSchedule(date_of_weeks: any[], lesson_times: any[],data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/schedule`, {
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
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postSchedule(date_of_weeks, lesson_times, data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (data => {
                console.log(data)
                dispatch(getSchedule())
                for (let idx = 0; idx < date_of_weeks.length; idx++) {
                    for (let index = 0; index < lesson_times.length; index++) {
                        if (date_of_weeks[idx].key === lesson_times[index].key){
                            dispatch(postScheduleItem({
                                schedule_id: data.id,
                                lesson_time: lesson_times[index].value,
                                date_of_week: date_of_weeks[idx].value
                            }))
                            break
                        }
                    }
                }
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}