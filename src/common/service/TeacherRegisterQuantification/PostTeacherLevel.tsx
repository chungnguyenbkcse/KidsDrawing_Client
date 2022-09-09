import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/teacher_register_quantification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postNotifyDb } from "../NotifyDb/PostNotifyDb";
import { getTeacherRegisterQuantificationByTeacherId } from "./GetTeacherRegisterQuantificationByTeacherId";

export function postTeaherLevel(teacher_level: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    console.log(teacher_level)
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-register-level`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(teacher_level)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postTeaherLevel(teacher_level, idx))
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
                dispatch(postNotifyDb({
                    name: `Gửi yêu cầu đăng kí trình độ!`,
                    description: `Giáo viên gửi yêu cầu đăng kí trình độ!`
                }, 1))
                toast.update(idx, { render: "Gửi yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });           
                dispatch(fetchDataSuccess(teacher_level))
                getTeacherRegisterQuantificationByTeacherId(dispatch, teacher_level.teacher_id)
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Gửi yêu cầu không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}