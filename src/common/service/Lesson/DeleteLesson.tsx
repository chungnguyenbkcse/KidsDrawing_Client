import { fetchDataError } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getLesson } from "./GetLesson";

export function deleteLesson(dispatch: any, id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
            `${process.env.REACT_APP_API_URL}/lesson-time/${id}`, {
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
                        dispatch(deleteLesson(dispatch, id, idx))
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
                getLesson(dispatch)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}