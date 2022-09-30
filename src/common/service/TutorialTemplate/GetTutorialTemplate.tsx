import { fetchDataSuccess, fetchDataError, removeTutorialTemplateAll, initialTutorialTemplate, addTutorialTemplate } from "../../../store/actions/tutorial_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TutorialTemplate {
    id: string;
    section_template_id: string;
    name: string;
    description: string;
    create_time: string;
    update_time: string;
}
export function getTutorialTemplate(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-template`, {
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
                        dispatch(getTutorialTemplate(dispatch))
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
                dispatch(removeTutorialTemplateAll())
                //console.log(data.body.lessons)
                data.body.TutorialTemplate.map((ele: any, index: any) => {
                    var tutorial_template: TutorialTemplate = {
                        id: ele.id,
                        section_template_id: ele.section_template_id,
                        name: ele.name,
                        description: ele.description,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTutorialTemplate(tutorial_template));
                    }
                    else{
                        return dispatch(addTutorialTemplate(tutorial_template))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}