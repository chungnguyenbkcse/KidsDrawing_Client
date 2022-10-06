import { fetchDataSuccess, fetchDataError } from "../../../store/actions/course.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function getTotalCourse(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/course/total`, {
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
                        dispatch(getTotalCourse(dispatch))
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
                localStorage.removeItem('total_course');
                localStorage.setItem('total_course', data.body.course)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}