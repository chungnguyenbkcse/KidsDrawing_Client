import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError, removeCourse } from "../../../store/actions/course.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getCourse } from "./GetCourse";

export function deleteCourse(dispatch: any, id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
            `${process.env.REACT_APP_API_URL}/course/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                    'Access-Control-Allow-Credentials': 'true'
                }
            }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        deleteCourse(dispatch, id, idx)
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
                getCourse(dispatch)
                toast.update(idx, { render: "Xóa khóa học thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
                toast.update(idx, { render: "Xóa khóa học không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
            });
}