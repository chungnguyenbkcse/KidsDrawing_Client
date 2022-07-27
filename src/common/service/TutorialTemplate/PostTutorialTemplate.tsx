import { fetchDataRequest, fetchDataError } from "../../../store/actions/tutorial_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postTutorialTemplatePage } from "../TutorialTemplatePage/PostTutorialTemplatePage";

export function postTutorialTemplate(tutorial: any[], data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-template`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postTutorialTemplate(tutorial,data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (data => {
                console.log(data)
                tutorial.map((value) => {
                    return dispatch(postTutorialTemplatePage({
                        tutorial_template_id: data.id,
                        name: data.name,
                        description: value.content,
                        number: value.page
                    }))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}