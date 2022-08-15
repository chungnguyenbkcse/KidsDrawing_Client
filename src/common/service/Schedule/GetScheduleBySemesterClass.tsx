import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeScheduleAll, initialSchedule, addSchedule } from "../../../store/actions/schedule.action";
interface schedule {
    id: number;
    lesson_time: number;
    lesson_time_name: string;
    semester_class_id: number;
    date_of_week: number;
}
export function getScheduleBySemesterClass(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var creator_id: number = Number(localStorage.getItem("id"));
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/schedule/semester-class/${id}`, {
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
                        lesson_time: ele.lesson_time_id,
                        lesson_time_name: ele.lesson_time,
                        semester_class_id: ele.semester_class_id,
                        date_of_week: ele.date_of_week
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