import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeScheduleItemAll, initialScheduleItem, addScheduleItem } from "../../../store/actions/schedule_item.action";
interface schedule_item {
    id: number;
    schedule_id: number;
    lesson_time: number;
    date_of_week: number;
}
export function getByIdScheduleItem(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/schedule_item/${id}`, {
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
                dispatch(removeScheduleItemAll())
                //console.log(data.body.lessons)
                data.body.schedule_items.map((ele: any, index: any) => {
                    var schedule_item: schedule_item = {
                        id: ele.id,
                        schedule_id: ele.schedule_id,
                        lesson_time: ele.lesson_time,
                        date_of_week: ele.date_of_week
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialScheduleItem(schedule_item));
                    }
                    else{
                        return dispatch(addScheduleItem(schedule_item))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}