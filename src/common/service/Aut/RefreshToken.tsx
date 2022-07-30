import { logout } from "../../../store/actions/account.actions";

export function postRefreshToken() {
    var refresh_token = localStorage.getItem("refresh_token");
    return (dispatch: any) => {
        fetch(
                `${process.env.REACT_APP_API_URL}/auth/refresh`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "refreshToken":refresh_token
                    })
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 500){
                        localStorage.removeItem('access_token') // Authorization
                        localStorage.removeItem('refresh_token')
                        localStorage.removeItem('username')
                        localStorage.removeItem('role_privilege')
                        localStorage.removeItem('id')
                        localStorage.removeItem('contest_id')
                        localStorage.removeItem('schedule_id')
                        dispatch(logout())
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (data => {
                localStorage.removeItem('access_token') // Authorization
                localStorage.removeItem('refresh_token')
                localStorage.setItem('access_token', data.accessToken) // Authorization
                localStorage.setItem('refresh_token', data.refreshToken)
            })
            .catch(error => {
                console.log("error")
            });
    };
}