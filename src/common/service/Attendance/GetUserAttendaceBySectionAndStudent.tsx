import { fetchDataSuccess, fetchDataError, removeAttendanceAll, initialAttendance, addAttendance } from "../../../store/actions/attendance.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Attendance {
    id: any;
    student_id: number;
    section_id: number;
    status: string;
    email: string;
    section_number: number;
    course_name: string;
    course_id: number;
    student_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}
export function getAttendanceBySectionAndStudent(dispatch: any, section_id: any, student_id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-attendance/section-student/${section_id}/${student_id}`, {
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
                        dispatch(getAttendanceBySectionAndStudent(dispatch, section_id, student_id))
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
                localStorage.setItem('is_attendance', "true");
            })
            .catch(error => {
                localStorage.setItem('is_attendance', "false");
                dispatch(fetchDataError(error));
                console.log("error")
            });
}