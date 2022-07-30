import { addNotification } from "../../../store/actions/notifications.action";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, addSemester, clearSelectedSemester, setModificationState } from "../../../store/actions/semester.actions";
import { SemesterModificationStatus } from "../../../store/models/semester.interface";
import { postRefreshToken } from "../Aut/RefreshToken";

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
                return response
            })
            .then (data => {
                dispatch(fetchDataSuccess(semester))
                dispatch(addSemester(semester))
                console.log(data)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}