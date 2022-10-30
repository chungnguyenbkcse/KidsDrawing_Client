import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/schedule.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postSchedule } from "./PostSchedule";

export function deleteScheduleBySemesterClass(id: any, schedule_element: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/schedule/semester-class/${id}`, {
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
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(deleteScheduleBySemesterClass(id, schedule_element, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (data => {
                console.log(data)
                schedule_element.map((ele: any) => {
                    return dispatch(postSchedule({
                        lesson_time: ele.lesson_time,
                        date_of_week: ele.date_of_week,
                        semester_classes_id: id
                    }))
                })
                toast.update(idx, { render: "Chỉnh lớp theo kì thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
                toast.update(idx, { render: "Chỉnh lớp theo kì không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
    };
}