import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSectionTemplateAll, initialSectionTemplate, addSectionTemplate } from "../../../store/actions/section_template.action";
import { getTutorialTemplateBySectionTemplate } from "../TutorialTemplate/GetTutorialTemplateBySectionTemplate";
interface SectionTemplate {
    id: number;
    creator_id: number;
    course_id: number;
    name: string;
    description: string;
    number: number;
    teaching_form: boolean;
    create_time: string;
    update_time: string;
}
export function getSectionTemplateByCourseId(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/section-template/course/${id}`, {
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
                dispatch(removeSectionTemplateAll())
                console.log(data.body.SectionTemplate)
                data.body.SectionTemplate.map((ele: any, index: any) => {
                    var section_template: SectionTemplate = {
                        id: ele.id,
                        creator_id: ele.creator_id,
                        course_id: ele.course_id,
                        name: ele.name,
                        description: ele.description,
                        number: ele.number,
                        teaching_form: ele.teaching_form,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialSectionTemplate(section_template));
                    }
                    else{
                        return dispatch(addSectionTemplate(section_template))
                    }
                })
                dispatch(getTutorialTemplateBySectionTemplate(data.body.SectionTemplate[0].id))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}