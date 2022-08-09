import { logout } from "../../../store/actions/account.actions";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeStudentAll, initialStudent, addStudent } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user {
    id: number,
    username: string,
    email: string,
    status: boolean,
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
export function getStudent() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user/student`, {
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
                        dispatch(getStudent())
                    }
                    else if (response.status === 500){
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
                dispatch(fetchDataSuccess(data))
                dispatch(removeStudentAll())
                data.body.users.map((ele: any, index: any) => {
                    var user: user = {
                        id: ele.id,
                        username: ele.username,
                        email: ele.email,
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
                        return dispatch(initialStudent(user));
                    }
                    else{
                        return dispatch(addStudent(user))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}