import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/course.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getCourse } from "./GetCourse";

export function postCourse(course: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/course`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(course)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postCourse(course, idx))
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
                toast.update(idx, { render: "Thêm khóa học thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                getCourse(dispatch)
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm khóa học không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}