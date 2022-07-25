import jwt_decode from "jwt-decode";
import { login } from "../../../store/actions/account.actions";

export function postAut(username: string, password: string) {
    return (dispatch: any) => {
        fetch(
                `${process.env.REACT_APP_API_URL}/auth`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username":username,
                        "password": password
                    })
                }
            )
            .then( response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                localStorage.setItem('access_token', data.accessToken) // Authorization
                localStorage.setItem('refresh_token', data.refreshToken)
                localStorage.setItem('username', username)
                const token: string = data.accessToken;
                const decoded: any = jwt_decode(token); 
                console.log(decoded)
                localStorage.setItem('role_privilege', decoded.role_privilege)
                localStorage.setItem('id', decoded.id)
                dispatch(login(username));
            })
            .catch(error => {
                alert('Đăng nhập không thành công!')
            });
    };
}