import { addNotification } from "../../../store/actions/notifications.action";
import { fetchDataRequest, fetchDataSuccess, editTeacher, fetchDataError, clearSelectedUser, setModificationState } from "../../../store/actions/users.action";
import { UserModificationStatus } from "../../../store/models/user.interface";
import { postRefreshToken } from "../Aut/RefreshToken";

export function putTeacher(id: any, data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user/${id}`, {
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
                        dispatch(putTeacher(id,data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (val => {
                console.log(val)
                console.log(id)
                dispatch(fetchDataSuccess(data))
                dispatch(editTeacher(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}