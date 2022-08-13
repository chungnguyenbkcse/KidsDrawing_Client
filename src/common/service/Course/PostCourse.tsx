import { fetchDataRequest, fetchDataError, addCourse } from "../../../store/actions/course.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getCourse } from "./GetCourse";

export function postCourse(course: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/course`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(course)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postCourse(course))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (data => {
                console.log(data)
                dispatch(fetchDataRequest());
                dispatch(getCourse())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
                localStorage.removeItem('access_token') // Authorization
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('username')
                localStorage.removeItem('role_privilege')
                localStorage.removeItem('id')
                localStorage.removeItem('contest_id')
                localStorage.removeItem('schedule_id')
            });
    };
}