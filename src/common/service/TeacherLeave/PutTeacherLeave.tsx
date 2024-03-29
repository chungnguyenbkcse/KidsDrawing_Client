import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/teacher_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postNotifyDb } from "../NotifyDb/PostNotifyDb";
import { getTeacherLeave } from "./GetTeacherLeave";
import { getTeacherLeaveByTeacher } from "./GetTeacherLeaveByTeacher";

export function putTeacherLeaveStatus(dispatch: any, id: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    var role = localStorage.getItem('role')
  var rolePrivilege: string[] = []
  var roleUser: string = ""
  if (role !== null) {
      rolePrivilege = role.split(',')
      roleUser = rolePrivilege[0]
  }

    return  fetch(
                `${process.env.REACT_APP_API_URL}/teacher-leave/admin/${id}`, {
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
                        dispatch(putTeacherLeaveStatus(dispatch, id, data, idx))
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
                if (data.status === "Approved"){
                    dispatch(postNotifyDb({
                        name: `Xác nhận yêu cầu nghỉ dạy buổi học ${val.section_number} lớp ${val.class_name}!`,
                        description: `Quản trị viên đã chấp nhận yêu cầu nghỉ dạy của bạn buổi ${val.section_number} lớp ${val.class_name}!`
                    }, data.teacher_id))
                }
                else {
                    dispatch(postNotifyDb({
                        name: `Không xác nhận yêu cầu nghỉ dạy buổi học ${val.section_number} lớp ${val.class_name}!`,
                        description: `Quản trị viên đã không chấp nhận yêu cầu nghỉ dạy của bạn buổi ${val.section_number} lớp ${val.class_name}!`
                    }, data.teacher_id))
                }

                if (roleUser === "ADMIN") {
                    getTeacherLeave(dispatch)
                }
                else {
                    getTeacherLeaveByTeacher(dispatch, localStorage.getItem('id'))
                }
                
                toast.update(idx, { render: "Yêu cầu thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
            });
}