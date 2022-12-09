import { fetchDataSuccess, fetchDataError } from "../../../store/actions/attendance.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function getAttendanceBySectionAndParent(dispatch: any, section_id: any, parent_id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-attendance/section-parent-check/${section_id}/${parent_id}`, {
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
                        dispatch(getAttendanceBySectionAndParent(dispatch, section_id, parent_id))
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
                if (data.status == true) {
                    localStorage.setItem('is_attendance_parent', "true");
                }
                else {
                    localStorage.setItem('is_attendance_parent', "false");
                }
                
            })
            .catch(error => {
                localStorage.setItem('is_attendance_parent', "false");
                dispatch(fetchDataError(error));
                console.log("error")
            });
}