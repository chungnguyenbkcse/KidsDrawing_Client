import { fetchDataSuccess, fetchDataError, removeChildAll, initialChild } from "../../../store/actions/child.action";
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
    total_course: number,
    total_contest: number,
    sex: string,
    phone: string,
    address: string,
    parents: number,
    createTime: string
}
export function getInforChildByParent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user/childs/${id}`, {
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
                        postRefreshToken()
                        getInforChildByParent(dispatch, id)
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
                dispatch(removeChildAll())
                console.log(data.body.childs)
                data.body.childs.map ((ele: any) => {
                    var user: user = {
                        id: ele.id,
                        username: ele.username,
                        email: ele.email,
                        password: "",
                        total_contest: ele.total_contest,
                        total_course: ele.total_course,
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
                    return dispatch(initialChild(user));
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}