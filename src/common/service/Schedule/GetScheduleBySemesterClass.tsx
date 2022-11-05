import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeScheduleAll, initialSchedule, addSchedule } from "../../../store/actions/schedule.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface schedule {
    id: any;
    lesson_time_id: any;
    lesson_time: string;
    semester_class_id: any;
    date_of_week: number;
}
export function getScheduleBySemesterClass(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem("id");
    var creator_id: any = 0;
    if (id_x !== null) {
        creator_id = id_x
    }
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
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(getScheduleBySemesterClass(id))
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
                dispatch(removeScheduleAll())
                data.body.schedules.map((ele: any, index: any) => {
                    var schedule: schedule = {
                        id: ele.id,
                        lesson_time_id: ele.lesson_time_id,
                        lesson_time: ele.lesson_time,
                        semester_class_id: ele.semester_classes_id,
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