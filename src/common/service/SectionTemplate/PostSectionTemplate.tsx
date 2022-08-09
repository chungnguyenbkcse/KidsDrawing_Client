import { fetchDataRequest, fetchDataError } from "../../../store/actions/section_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postTutorialTemplate } from "../TutorialTemplate/PostTutorialTemplate";

export function postSectionTemplate(tutorial: any[], data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/section-template`, {
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
                        dispatch(postSectionTemplate(tutorial,data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (data => {
                console.log(data)
                dispatch(postTutorialTemplate(tutorial,{
                        section_template_id: data.id,
                        name: data.name,
                        description: data.description,
                }))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}