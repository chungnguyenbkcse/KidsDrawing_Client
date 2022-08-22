import { fetchDataRequest, fetchDataSuccess, fetchDataError, addExercise } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getExercise } from "./GetExercise";

export function postExercise(data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercises`, {
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
                        dispatch(postExercise(data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (val => {
                console.log(val)
                dispatch(fetchDataSuccess(data))
                dispatch(getExercise())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}