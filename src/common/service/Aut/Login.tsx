import jwt_decode from "jwt-decode";
import { login } from "../../../store/actions/account.actions";
import { ToastContainer, toast } from 'react-toastify';
import { putStatusUser } from "../User/UpdateStatusUser";

export function postAut(username: string, password: string, changeRouteHome: any) {
    function notify_success() {
        toast.success("Đăng nhập thành công!", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function notify_error() {
        toast.error("Đăng nhập không thành công!", {
            position: toast.POSITION.TOP_CENTER
        });
    }


    return (dispatch: any) => {
        fetch(
            `${process.env.REACT_APP_API_URL}/auth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }
        )
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then(data => {
                localStorage.setItem('access_token', data.accessToken) // Authorization
                localStorage.setItem('refresh_token', data.refreshToken)
                localStorage.setItem('username', username)
                const token: string = data.accessToken;
                const decoded: any = jwt_decode(token);
                console.log(decoded)
                localStorage.setItem('role_privilege', decoded.role_privilege)
                localStorage.setItem('id', decoded.id)
                dispatch(login(username));
                dispatch(putStatusUser(localStorage.getItem('id'), {
                    status: localStorage.getItem('token_device')
                }))
                notify_success();
                setTimeout(function () {
                    changeRouteHome(true);
                }, 5000);             
            })
            .catch(error => {
                notify_error();
            });
    };
}