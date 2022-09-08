import { fetchDataSuccess, fetchDataError, removeUserRegisterTutorialApprovedAll, initialUserRegisterTutorialApproved, addUserRegisterTutorialApproved, removeUserRegisterTutorialNotApprovedNowAll, removeUserRegisterTutorialNotApprovedAll, initialUserRegisterTutorialNotApproved, addUserRegisterTutorialNotApproved, initialUserRegisterTutorialNotApprovedNow, addUserRegisterTutorialNotApprovedNow, initialUserRegisterTutorialApprovedToTutorialTemplate, addUserRegisterTutorialApprovedToTutorialTemplate } from "../../../store/actions/user_register_tutorial.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface UserRegisterTutorial {
    id: number;
    section_id: number;
    creator_id: number;
    creator_name: string;
    section_name: string;
    section_number: number;
    class_id: number;
    class_name: string;
    name: string;
    status: string;
    create_time: string;
    update_time: string;
}
export function getUserRegisterTutorial(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-register-tutorial`, {
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
                        dispatch(getUserRegisterTutorial(dispatch))
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
                dispatch(removeUserRegisterTutorialApprovedAll())
                dispatch(removeUserRegisterTutorialNotApprovedNowAll())
                dispatch(removeUserRegisterTutorialNotApprovedAll())
                console.log(data.body.user_register_tutorial)
                data.body.user_register_tutorial.map((ele: any, index: any) => {
                    var UserRegisterTutorial: UserRegisterTutorial = {
                        id: ele.id,
                        section_id: ele.section_id,
                        section_name: ele.section_name,
                        creator_name: ele.creator_name,
                        creator_id: ele.creator_id,
                        class_id: ele.class_id,
                        class_name: ele.class_name,
                        section_number:ele.section_number,
                        name: ele.name,
                        status: ele.status,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (ele.status === "Approved"){
                        if (index === 0){
                            return dispatch(initialUserRegisterTutorialApproved(UserRegisterTutorial));
                        }
                        else{
                            return dispatch(addUserRegisterTutorialApproved(UserRegisterTutorial))
                        }
                    }
                    else if (ele.status === "Not approved now"){
                        if (index === 0){
                            return dispatch(initialUserRegisterTutorialNotApprovedNow(UserRegisterTutorial));
                        }
                        else{
                            return dispatch(addUserRegisterTutorialNotApprovedNow(UserRegisterTutorial))
                        }
                    }
                    else if (ele.status === "Approved to tutorial template"){
                        if (index === 0){
                            return dispatch(initialUserRegisterTutorialApprovedToTutorialTemplate(UserRegisterTutorial));
                        }
                        else{
                            return dispatch(addUserRegisterTutorialApprovedToTutorialTemplate(UserRegisterTutorial))
                        }
                    }
                    else {
                        if (index === 0){
                            return dispatch(initialUserRegisterTutorialNotApproved(UserRegisterTutorial));
                        }
                        else{
                            return dispatch(addUserRegisterTutorialNotApproved(UserRegisterTutorial))
                        }
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}