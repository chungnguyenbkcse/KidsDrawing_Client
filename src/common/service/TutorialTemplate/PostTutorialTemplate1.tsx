import { fetchDataRequest } from "../../../store/actions/tutorial_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postTutorialTemplatePage } from "../TutorialTemplatePage/PostTutorialTemplatePage";

export function postTutorialTemplate1(data: any) {
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
                        dispatch(postTutorialTemplate1(data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (xx => {
                console.log(xx)
                dispatch(postTutorialTemplatePage({
                    tutorial_template_id: xx.id,
                    name: "",
                    description: "",
                    number: 1
                }))
            })
            .catch(error => {
                console.log("error")
            });
    };
}