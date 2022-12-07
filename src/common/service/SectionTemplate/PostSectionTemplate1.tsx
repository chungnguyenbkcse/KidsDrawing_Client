import { fetchDataRequest, fetchDataError } from "../../../store/actions/section_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postTutorialTemplatePage } from "../TutorialTemplatePage/PostTutorialTemplatePage";
import { getSectionTemplate } from "./GetSectionTemplate";

export function postSectionTemplate1(data: any, num_of_section: number) {
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
                        dispatch(postSectionTemplate1(data, num_of_section))
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
                getSectionTemplate(dispatch)
                dispatch(postTutorialTemplatePage({
                    section_template_id: xx.id,
                    name: "",
                    description: "",
                    number: 1
                }))
                if (data.number+1 <= num_of_section) {
                    dispatch(postSectionTemplate1({
                        course_id: data.course_id,
                        name: "",
                        number: data.number + 1,
                        teaching_form: true
                    }, num_of_section))
                }
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}