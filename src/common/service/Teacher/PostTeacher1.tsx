import { fetchDataRequest } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postTeacher } from "./PostTeacher";

export function postTeacher1(data: any, lst: any[], idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
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
                        dispatch(postTeacher1(data, lst, idx))
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
                console.log(lst)
                if (lst.length > 1) {
                    dispatch(postTeacher1({
                        username: lst[0].username,
                        email: lst[0].email,
                        password: lst[0].password,
                        firstName: null,
                        lastName: null,
                        dateOfBirth: null,
                        profile_image_url: null,
                        sex: null,
                        phone: null,
                        address: null,
                        roleNames: ["TEACHER"]
                      }, lst.slice(1, lst.length), idx));
                }
                else if (lst.length === 1) {
                    dispatch(postTeacher({
                        username: lst[0].username,
                        email: lst[0].email,
                        password: lst[0].password,
                        firstName: null,
                        lastName: null,
                        dateOfBirth: null,
                        profile_image_url: null,
                        sex: null,
                        phone: null,
                        address: null,
                        roleNames: ["TEACHER"]
                      }, idx));
                }
            })
            .catch(error => {
                
            });
    };
}