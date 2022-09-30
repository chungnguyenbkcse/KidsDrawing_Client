import { fetchDataSuccess, fetchDataError, removeTeacherAll, initialTeacher } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user {
    id: string,
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
    parents: string,
    createTime: string
}
export function getUserById(dispatch: any , id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
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
                        dispatch(getUserById(dispatch, id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
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
}