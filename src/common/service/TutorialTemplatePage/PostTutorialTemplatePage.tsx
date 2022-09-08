import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTutorialTemplatePageByTutorialTemplateId } from "./GetTutorialTemplatePageByTutorialTemplateId";

export function postTutorialTemplatePage(tutorialtemplatepage: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-template-page`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(tutorialtemplatepage)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postTutorialTemplatePage(tutorialtemplatepage))
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
                console.log(data)
                getTutorialTemplatePageByTutorialTemplateId(tutorialtemplatepage.tutorial_template_id)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}