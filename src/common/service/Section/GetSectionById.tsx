import { fetchDataSuccess, fetchDataError, removeSectionAll, addSection } from "../../../store/actions/section.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Section {
    id: string;
    class_id: string;
    name: string;
    description: string;
    number: number;
    teacher_name: string;
    teach_form: boolean;
    recording: string;
    message: string;
}
export function getSectionById(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/section/${id}`, {
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
                        dispatch(getSectionById(dispatch, id))
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
                console.log(data)
                dispatch(fetchDataSuccess(data))
                dispatch(removeSectionAll())
                var section: Section = {
                    id: data.id,
                    class_id: data.class_id,
                    name: data.name,
                    teacher_name: data.teacher_name,
                    description: data.description,
                    number: data.number,
                    teach_form: data.teach_form,
                    recording: data.recording,
                    message: data.message
                }
                return dispatch(addSection(section))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}