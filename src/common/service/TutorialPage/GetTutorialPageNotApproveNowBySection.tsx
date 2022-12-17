import { fetchDataSuccess, fetchDataError, removeUserRegisterTutorialPageAll, addUserRegisterTutorialPage } from "../../../store/actions/user_register_tutorial_page.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTutorialPageByTemplate } from "./GetTutorialPageByTemplate";
interface TutorialPage {
    id: any;
    section_id: number;
    name: string;
    description: string;
    number: number;
}
export function getTutorialPageNotApproveNowBySection(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-page/section-not-approve-now/${id}`, {
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
                        dispatch(getTutorialPageNotApproveNowBySection(dispatch, id))
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
                console.log(data.body.TutorialPage)

                data.body.TutorialPage.map((ele: any, index: any) => {
                        var tutorial_page: TutorialPage = {
                            id: ele.id,
                            section_id: ele.section_id,
                            name: ele.name,
                            description: ele.description,
                            number: ele.number
                        }
                        //console.log(strDate.substring(0, 16))
                        return dispatch(addUserRegisterTutorialPage(tutorial_page));
                        
                    })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}