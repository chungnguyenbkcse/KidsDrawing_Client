import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postSchedule } from "../Schedule/PostSchedule";
import { postSchedule1 } from "../Schedule/PostSchedule1";
import { getSemesterClass } from "./GetSemesterClass";

export function postSemesterClass(dispatch: any, data: any, schedule_element: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
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
                        dispatch(postSemesterClass(dispatch, data, schedule_element, idx))
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
                schedule_element.map((ele: any, idxxx:any) => {
                    if (idxxx === schedule_element.length - 1) {
                        return dispatch(postSchedule1({
                            lesson_time: ele.lesson_time,
                            date_of_week: ele.date_of_week,
                            semester_classes_id: data_1.id
                        }, idx))
                    }
                    else {
                        return dispatch(postSchedule({
                            lesson_time: ele.lesson_time,
                            date_of_week: ele.date_of_week,
                            semester_classes_id: data_1.id
                        }))
                    }
                })
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm lớp theo kì không thành công vì thời giản vượt ngoài học kì!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                dispatch(fetchDataError(error));
                console.log("error")
            });
}