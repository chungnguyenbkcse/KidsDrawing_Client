import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postSchedule } from "../Schedule/PostSchedule";
import { getSemesterClass } from "./GetSemesterClass";

export function postSemesterClass(data: any, schedule_element: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester-class`, {
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
                        dispatch(postSemesterClass(data, schedule_element))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (data_1 => {
                console.log(data_1)
                dispatch(getSemesterClass())
                schedule_element.map((ele: any) => {
                    return dispatch(postSchedule({
                        lesson_time: ele.lesson_time,
                        date_of_week: ele.date_of_week,
                        semester_class_id: data_1.id
                    }))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}