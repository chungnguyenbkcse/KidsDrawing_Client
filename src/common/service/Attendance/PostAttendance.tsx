import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getAttendance } from "./GetAttendance";

export function postAttendance(data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/attendance`, {
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
                        dispatch(postAttendance(data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (xx => {
                getAttendance(dispatch)
            })
            .catch(error => {
                console.log("error")
            });
    };
}