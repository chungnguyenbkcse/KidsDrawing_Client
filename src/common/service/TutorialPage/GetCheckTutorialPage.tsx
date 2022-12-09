import { fetchDataSuccess, fetchDataError, removeTutorialPageAll, initialTutorialPage, addTutorialPage } from "../../../store/actions/tutorial_page.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTutorialPageByTemplate } from "./GetTutorialPageByTemplate";
interface TutorialPage {
    id: any;
    section_id: number;
    name: string;
    description: string;
    number: number;
}
export function checkTutorialPageBySection(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-page/section-check/${id}`, {
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
                        dispatch(checkTutorialPageBySection(dispatch, id))
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
                if (data.section_id == 0) {
                    localStorage.setItem('is_tutorial_page', 'not');
                }
                else if (data.section_id == 1){
                    localStorage.setItem('is_tutorial_page', 'Not approved');
                }
                else if (data.section_id == 2) {
                    localStorage.setItem('is_tutorial_page', 'Not approve now');
                }
                else {
                    localStorage.setItem('is_tutorial_page', 'Approved');
                }
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}