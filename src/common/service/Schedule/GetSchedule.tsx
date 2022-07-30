import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeScheduleAll, initialSchedule, addSchedule } from "../../../store/actions/schedule.action";
interface schedule {
    id: number;
    name: string;
    create_time: string;
    update_time: string;
    creator_id: number;
}
export function getSchedule() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var creator_id: number = Number(localStorage.getItem("id"));
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/schedule?page=0&size=100`, {
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeScheduleAll())
                data.body.schedules.map((ele: any, index: any) => {
                    var schedule: schedule = {
                        id: ele.id,
                        name: ele.name,
                        create_time: ele.create_time,
                        update_time: ele.update_time,
                        creator_id: creator_id
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialSchedule(schedule));
                    }
                    else{
                        return dispatch(addSchedule(schedule))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}