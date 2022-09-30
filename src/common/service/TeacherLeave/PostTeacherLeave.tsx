import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/teacher_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postNotifyDb } from "../NotifyDb/PostNotifyDb";
import { getTeacherLeaveByTeacher } from "./GetTeacherLeaveByTeacher";

export function postTeacherLeave(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-leave`, {
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
                        dispatch(postTeacherLeave(data, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (val => {
                console.log(val)
                dispatch(postNotifyDb({
                    name: `Gửi yêu cầu nghỉ dạy buổi học ${val.section_number} lớp ${val.class_name}!`,
                    description: `Bạn đã gửi yêu cầu nghỉ dạy buổi học ${val.section_number} lớp ${val.class_name}!`
                }, ""))
                getTeacherLeaveByTeacher(dispatch, data.teacher_id)
                toast.update(idx, { render: "Yêu cầu nghỉ dạy đã được gửi thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Yêu cầu nghỉ dạy đã được gửi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
    };
}