import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacher } from "./GetTeacher";

export function postTeacher(dispatch: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user/teacher`, {
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
                        dispatch(postTeacher(dispatch, data, idx))
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
                toast.update(idx, { render: "Chỉnh thông tin tài khoản thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                getTeacher(dispatch)
            })
            .catch(error => {
                toast.update(idx, { render: "Lỗi username hoặc email bị trùng!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            });
}