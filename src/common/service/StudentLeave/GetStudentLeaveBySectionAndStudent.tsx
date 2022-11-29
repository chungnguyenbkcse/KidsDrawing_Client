import { fetchDataError } from "../../../store/actions/student_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface StudentLeave {
    id: any;
    section_id: number;
    section_name: string;
    class_id: number;
    class_name: string;
    student_id: number;
    section_number: number;
    student_name: string;
    reviewer_id: number;
    description: string;
    status: string;
    create_time: string;
    update_time: string;
}
export function getStudentLeaveBySectionAndStudent(dispatch: any, section_id: number, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/student-leave/section-student/${section_id}/${student_id}`, {
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
                        dispatch(getStudentLeaveBySectionAndStudent(dispatch, section_id, student_id))
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
                if (data.status === "Approved") {
                    localStorage.removeItem("student_leave");
                    localStorage.setItem("student_leave", "true");
                }
                else {
                    localStorage.removeItem("student_leave");
                    localStorage.setItem("student_leave", "false");
                }
            })
            .catch(error => {
                localStorage.removeItem("student_leave");
                localStorage.setItem("student_leave", "false");
                dispatch(fetchDataError(error));
                console.log("error")
            });
}