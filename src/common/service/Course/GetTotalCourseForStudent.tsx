import { fetchDataSuccess, fetchDataError } from "../../../store/actions/course.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function getTotalCourseForStudent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/course/student/total/${id}`, {
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
                        dispatch(getTotalCourseForStudent(dispatch, id))
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
                localStorage.removeItem('total_course_student');
                localStorage.setItem('total_course_student', data.body.course)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}