import { fetchDataSuccess, fetchDataError, removeTutorialPageAll, initialTutorialPage, addTutorialPage } from "../../../store/actions/tutorial_page.action";
import { ITutorialPage } from "../../../store/models/tutorial_page.interface";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTutorialPageByTemplate } from "./GetTutorialPageByTemplate";
import { postTutorialPage } from "./PostTutorialPage";
import { postTutorialPageToast } from "./PostTutorialPageToast";
interface TutorialPage {
    id: any;
    section_id: number;
    name: string;
    description: string;
    number: number;
}
export function deleteTutorialPageBySection(dispatch: any, id: any, tutorial_pages: ITutorialPage[], routeHome: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-page/section/${id}`, {
                    method: "DELETE",
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
                        dispatch(deleteTutorialPageBySection(dispatch, id, tutorial_pages, routeHome, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (data => {
                tutorial_pages.map((value, index) => {
                    if (index === tutorial_pages.length - 1){
                        setTimeout(function () {
                            routeHome();
                        }, 2000); 
                        return dispatch(postTutorialPageToast({
                            section_id: id,
                            description: value.description,
                            number: value.number
                        }, idx))
                    }
                    return dispatch(postTutorialPage({
                        section_id: id,
                        description: value.description,
                        number: value.number
                    }))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}