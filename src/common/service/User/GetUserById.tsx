import jwt_decode from "jwt-decode";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTeacherAll, initialTeacher, addTeacher } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacher } from "../Teacher/GetTeacher";
interface user {
    id: number,
    username: string,
    email: string,
    status: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    profile_image_url: string,
    sex: string,
    phone: string,
    address: string,
    parents: number[],
    createTime: string
}
export function getUserById(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user/${id}`, {
                    method: "GET",
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
                        dispatch(getUserById(id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (ele => {
                console.log(ele)
                dispatch(fetchDataSuccess(ele))
                dispatch(removeTeacherAll())
                var user: user = {
                    id: ele.id,
                    username: ele.username,
                    email: ele.email,
                    password: "",
                    status: ele.status,
                    firstName: ele.firstName,
                    lastName: ele.lastName,
                    dateOfBirth: ele.dateOfBirth,
                    profile_image_url: ele.profile_image_url,
                    sex: ele.sex,
                    phone: ele.phone,
                    address: ele.address,
                    parents: ele.parents,
                    createTime: ele.createTime
                }
                    //console.log(strDate.substring(0, 16))
                dispatch(initialTeacher(user));
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}