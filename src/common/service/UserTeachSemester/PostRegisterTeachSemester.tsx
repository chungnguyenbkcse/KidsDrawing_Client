import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester.actions";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getCourseTeacher } from "../CourseTeacher/GetCourseTeacherByTeacher";

export function postRegisterTeachSemester(data: any, idx: any,routeHome: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-teach-semester`, {
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
                        dispatch(postRegisterTeachSemester(data, idx, routeHome))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (x => {
                console.log(x)
                getCourseTeacher(dispatch, data.teacher_id)
                toast.update(idx, { render: "Thêm cuộc thi thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                setTimeout(() => {
                    routeHome()
                }, 2000)
            })
            .catch(error => {
                toast.update(idx, { render: "Đăng kí không thành công vì trùng lịch!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}