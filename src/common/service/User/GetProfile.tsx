import { fetchDataSuccess, fetchDataError, removeProfileAll, addProfile } from "../../../store/actions/profile.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Profile {
    id: number,
    profile_image_url: string,
}
export function getProfile(dispatch: any , id: any) {
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
                        dispatch(getProfile(dispatch, id))
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
                dispatch(removeProfileAll())
                var user: Profile = {
                    id: ele.id,
                    profile_image_url: ele.profile_image_url,
                }
                    //console.log(strDate.substring(0, 16))
                dispatch(addProfile(user));
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}