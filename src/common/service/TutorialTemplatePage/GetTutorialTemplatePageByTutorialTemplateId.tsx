import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialTemplatePageAll, initialTutorialTemplatePage, addTutorialTemplatePage } from "../../../store/actions/tutorial_template_page.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TutorialTemplatePage {
    id: string;
    tutorial_template_id: string;
    name: string;
    description: string;
    number: number;
}
export function getTutorialTemplatePageByTutorialTemplateId(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-template-page/tutorial-template/${id}`, {
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
                        dispatch(getTutorialTemplatePageByTutorialTemplateId(id))
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
                dispatch(removeTutorialTemplatePageAll())
                //console.log(data.body.lessons)
                data.body.TutorialTemplatePage.map((ele: any, index: any) => {
                    var tutorial_template_page: TutorialTemplatePage = {
                        id: ele.id,
                        tutorial_template_id: ele.tutorial_template_id,
                        name: ele.name,
                        description: ele.description,
                        number: ele.number
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTutorialTemplatePage(tutorial_template_page));
                    }
                    else{
                        return dispatch(addTutorialTemplatePage(tutorial_template_page))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}