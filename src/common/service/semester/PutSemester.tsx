import { addNotification } from "../../../store/actions/notifications.action";
import { fetchDataRequest, fetchDataSuccess, editSemester, fetchDataError, clearSelectedSemester, setModificationState } from "../../../store/actions/semester.actions";
import { SemesterModificationStatus } from "../../../store/models/semester.interface";
import { postRefreshToken } from "../Aut/RefreshToken";

export function putSemester(id: any, data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester/${id}`, {
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
                        dispatch(putSemester(id,data))
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
                dispatch(editSemester(data))
                dispatch(addNotification("Học kì ", `${data.name} chỉnh bởi bạn`));
                dispatch(clearSelectedSemester());
                dispatch(setModificationState(SemesterModificationStatus.None));
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}