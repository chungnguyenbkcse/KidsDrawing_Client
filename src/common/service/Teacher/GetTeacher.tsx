import { fetchDataSuccess, fetchDataError, removeTeacherAll, initialTeacher, addTeacher } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user {
    id: any,
    username: string,
    email: string,
    password: string,
    status: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    profile_image_url: string,
    sex: string,
    phone: string,
    address: string,
    parents: number,
    createTime: string
}
export function getTeacher(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
                `${process.env.REACT_APP_API_URL}/user/teacher`, {
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
                        dispatch(getTeacher(dispatch))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeTeacherAll())
                console.log(data.body.teachers)
                data.body.teachers.map((ele: any, index: any) => {
                    var user: user = {
                        id: ele.id,
                        username: ele.username,
                        email: ele.email,
                        password: ele.password,
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
                    if (index === 0){
                        return dispatch(initialTeacher(user));
                    }
                    else{
                        return dispatch(addTeacher(user))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}