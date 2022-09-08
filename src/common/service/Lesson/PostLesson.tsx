import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getLesson } from "./GetLesson";

export function postLesson(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/lesson-time`, {
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
                        dispatch(postLesson(data, idx))
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
                toast.update(idx, { render: "Thêm tiết học thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataSuccess(data))
                dispatch(getLesson(dispatch))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Thêm tiết học không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}