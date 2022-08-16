import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getSemesterClass } from "./GetSemesterClass";

export function putSemesterClass(id: any, data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester-class/${id}`, {
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
                        dispatch(putSemesterClass(id, data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (data => {
                console.log(data)
                console.log(id)
                dispatch(getSemesterClass())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}