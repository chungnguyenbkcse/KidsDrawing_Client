import { fetchDataSuccess, fetchDataError, removeUserRegisterTutorialPageAll, addUserRegisterTutorialPage } from "../../../store/actions/user_register_tutorial_page.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface UserRegisterTutorialPage {
    id: any;
    user_register_tutorial_id: number;
    name: string;
    description: string;
    number: number;
}
export function getUserRegisterTutorialPage(dispatch: any, id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-register-tutorial-page/tutorial/${id}`, {
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
                        dispatch(getUserRegisterTutorialPage(dispatch, id))
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
                dispatch(removeUserRegisterTutorialPageAll())
                console.log(data.body.user_register_tutorial_page)
                data.body.user_register_tutorial_page.map((ele: any, index: any) => {
                    var userRegisterTutorialPage: UserRegisterTutorialPage = {
                        id: ele.id,
                        user_register_tutorial_id: ele.user_register_tutorial_id,
                        name: ele.name,
                        description: ele.description,
                        number: ele.number
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addUserRegisterTutorialPage(userRegisterTutorialPage))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}