import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/semester.actions";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getSemester } from "./GetSemester";

export function postSemester(semester: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(semester)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postSemester(semester))
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
                dispatch(fetchDataSuccess(semester))
                dispatch(getSemester(dispatch))
                console.log(data)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}