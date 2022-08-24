import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/tutorial_template.action";
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                console.log(data)
                dispatch(getTutorialTemplate())
                tutorial.map((value) => {
                    return dispatch(postTutorialTemplatePage({
                        tutorial_template_id: data.id,
                        name: data.name,
                        description: value.content,
                        number: value.page
                    }))
                })
                toast.update(idx, { render: "Thêm giáo án thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm giáo án không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}