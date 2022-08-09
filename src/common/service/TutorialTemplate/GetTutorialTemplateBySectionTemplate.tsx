import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialTemplateAll, initialTutorialTemplate, addTutorialTemplate } from "../../../store/actions/tutorial_template.action";
import { getTutorialTemplatePageByTutorialTemplateId } from "../TutorialTemplatePage/GetTutorialTemplatePageByTutorialTemplateId";
interface TutorialTemplate {
    id: number;
    section_template_id: number;
    name: string;
    description: string;
    create_time: string;
    update_time: string;
}
export function getTutorialTemplateBySectionTemplate(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-template/section-template/${id}`, {
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
                    throw Error(response.statusText);
                }
                return response.json()
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
                dispatch(getTutorialTemplatePageByTutorialTemplateId(data.body.TutorialTemplate[0].id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}