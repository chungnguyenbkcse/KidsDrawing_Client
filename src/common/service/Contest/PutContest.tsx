import { fetchDataRequest, fetchDataError } from "../../../store/actions/contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getContest } from "./GetContest";

export function putContest(id: any,data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/contest/${id}`, {
                    method: "PUT",
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
                        dispatch(putContest(id,data))
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
                console.log(id)
                getContest(dispatch)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}