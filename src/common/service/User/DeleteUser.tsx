import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getParent } from "../Parent/GetParent";
import { getStudent } from "../Student/GetStudent";
import { getTeacher } from "../Teacher/GetTeacher";

export function deleteUser(dispatch: any, id: number, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var role_privilege = localStorage.getItem('role_privilege')
    var rolePrivilege:string[] =[]
    var roleUser :string =""
    if (role_privilege !== null) {
        rolePrivilege = role_privilege.split(',')
        roleUser = rolePrivilege[0]
    }

    return  fetch(
            `${process.env.REACT_APP_API_URL}/user/${id}`, {
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
                        dispatch(deleteUser(dispatch, id, idx))
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
                if (roleUser === "TEACHER_USER") {
                    getTeacher(dispatch)
                }
                else if (roleUser === "PARENT_USER") {
                    getParent(dispatch)
                }
                else {
                    getStudent(dispatch);
                }
                
                toast.update(idx, { render: "Xóa tài khoản thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Xóa tài khoản không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                dispatch(fetchDataError(error));
                console.log("error")
            });
}