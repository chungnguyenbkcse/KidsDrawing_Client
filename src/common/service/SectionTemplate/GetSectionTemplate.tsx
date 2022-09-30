import { fetchDataSuccess, fetchDataError, removeSectionTemplateAll, initialSectionTemplate, addSectionTemplate } from "../../../store/actions/section_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface SectionTemplate {
    id: string;
    creator_id: string;
    course_id: string;
    name: string;
    description: string;
    number: number;
    teaching_form: boolean;
    create_time: string;
    update_time: string;
}
export function getSectionTemplate(dispatch:  any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
                `${process.env.REACT_APP_API_URL}/section-template?page=0&size=5`, {
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
                        dispatch(getSectionTemplate(dispatch))
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
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}