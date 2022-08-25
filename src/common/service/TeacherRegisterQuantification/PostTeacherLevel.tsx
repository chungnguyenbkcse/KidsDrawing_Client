import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, addTeacherRegisterQuatificationNotApprovedNow } from "../../../store/actions/teacher_register_quantification.action";
import { postRefreshToken } from "../Aut/RefreshToken";
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
                    throw Error(response.statusText);
                }
                return response
            })
            .then (data => {
                toast.update(idx, { render: "Gửi yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
                dispatch(fetchDataSuccess(teacher_level))
                dispatch(getTeacherRegisterQuantificationByTeacherId(teacher_level.teacher_id))
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Gửi yêu cầu không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}