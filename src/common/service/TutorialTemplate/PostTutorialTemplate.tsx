import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/tutorial_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postTutorialTemplatePage } from "../TutorialTemplatePage/PostTutorialTemplatePage";
import { getTutorialTemplate } from "./GetTutorialTemplate";

export function postTutorialTemplate(tutorial: any[], data: any, idx: any) {
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
                        dispatch(postTutorialTemplate(tutorial, data, idx))
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
                tutorial.map((value) => {
                    return dispatch(postTutorialTemplatePage({
                        tutorial_template_id: xx.id,
                        name: data.name,
                        description: value.content,
                        number: data.page
                    }))
                })
                toast.update(idx, { render: "Thêm giáo án thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
                getTutorialTemplate(dispatch)
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm giáo án không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}