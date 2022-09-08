import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getLesson } from "./GetLesson";

export function putLesson(id: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/lesson-time/${id}`, {
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
                        dispatch(putLesson(id,data, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (val => {
                console.log(val)
                console.log(id)
                toast.update(idx, { render: "Chỉnh tiết học thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataSuccess(data))
                getLesson(dispatch)
            })
            .catch(error => {
                toast.update(idx, { render: "Chỉnh tiết học thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}