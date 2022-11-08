import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialTemplatePageAll, initialTutorialTemplatePage } from "../../../store/actions/tutorial_template_page.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TutorialTemplatePage {
    id: any;
    tutorial_template_id: number;
    name: string;
    description: string;
    number: number;
}
export function getTutorialTemplatePageBySectionTemplate(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-template-page/section-template/${id}`, {
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
                        dispatch(getTutorialTemplatePageBySectionTemplate(id))
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
                    return dispatch(initialTutorialTemplatePage(tutorial_template_page));
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}