import { fetchDataSuccess, fetchDataError, removeAttendanceAll, initialAttendance, addAttendance } from "../../../store/actions/attendance.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Attendance {
    id: number;
    student_id: number;
    section_id: number;
    status: string;
    section_number: number;
    email: string;
    course_name: string;
    course_id: number;
    student_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}
export function getAttendance(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/attendance`, {
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
                        dispatch(getAttendance(dispatch))
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
                dispatch(removeAttendanceAll())
                console.log(data.body.art_type)
                data.body.art_type.map((ele: any, index: any) => {
                    var attendance: Attendance = {
                        id: ele.id,
                        email: ele.email,
                        student_id: ele.student_id,
                        section_number: ele.section_number,
                        course_id: ele.course_id,
                        course_name: ele.course_name,
                        student_name: ele.student_name,
                        section_id: ele.section_id,
                        section_name: ele.section_name,
                        status: ele.status,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialAttendance(attendance));
                    }
                    else{
                        return dispatch(addAttendance(attendance))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}