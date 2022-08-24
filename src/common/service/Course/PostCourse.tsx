import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError, addCourse } from "../../../store/actions/course.action";
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
                    throw Error(response.statusText);
                }
                return response
            })
            .then (data => {
                console.log(data)
                toast.update(idx, { render: "Thêm khóa học thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
                dispatch(getCourse())
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm khóa học không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}