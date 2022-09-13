import jwt_decode from "jwt-decode";
import { login } from "../../../store/actions/account.actions";
import { toast } from 'react-toastify';
import { putStatusUser } from "../User/UpdateStatusUser";

export function postAut(username: string, password: string, changeRouteHome: any, id: any) {
    
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
                localStorage.clear();
                localStorage.setItem('access_token', data.accessToken) // Authorization
                localStorage.setItem('refresh_token', data.refreshToken)
                localStorage.setItem('username', username)
                const token: string = data.accessToken;
                const decoded: any = jwt_decode(token);
                console.log(decoded)
                localStorage.setItem('role_privilege', decoded.role_privilege)
                localStorage.setItem('id', decoded.id)
                localStorage.setItem('link_profile', decoded.profile_image_url)
                dispatch(login(username));
                toast.update(id, { render: "Đăng nhập thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                setTimeout(function () {
                    changeRouteHome(true);
                }, 2000); 
                let openRequest = indexedDB.open("firebase-messaging-database", 1);
                openRequest.onerror = function() {
                    console.error("Error", openRequest.error);
                };
                
                openRequest.onsuccess = function() {
                    let db = openRequest.result;
                    db.onversionchange = function() {
                        db.close();
                        alert("Database is outdated, please reload the page.")
                    };
                    // continue working with database using db object
                    console.log(db)
                    const txn = db.transaction('firebase-messaging-store', 'readwrite');
                    const store = txn.objectStore('firebase-messaging-store');

                    let query = store.getAll();

                    query.onerror = function() {
                        console.error("Error", openRequest.error);
                    };

                    query.onsuccess = (event: any) => {
                        if (!event.target.result) {
                            console.log(`The firebase device token with 0 not found`);
                        } else {
                            console.log(event.target.result);
                            let token_object = event.target.result[0];
                            dispatch(putStatusUser(localStorage.getItem('id'), {
                                status: token_object.token
                            }))
                        }
                    };
                };            
            })
            .catch(error => {
                toast.update(id, { render: "Đăng nhập không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
    };
}