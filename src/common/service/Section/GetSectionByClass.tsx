import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSectionAll, initialSection, addSection } from "../../../store/actions/section.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Section {
    id: number;
    class_id: number;
    name: string;
    description: string;
    number: number;
    teach_form: boolean;
    recording: string;
    message: string;
}
export function getSectionByClass(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/section/class/${id}`, {
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
                        dispatch(getSectionByClass(id))
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
                console.log(data.body.Section)
                data.body.Section.map((ele: any, index: any) => {
                    var section: Section = {
                        id: ele.id,
                        class_id: ele.class_id,
                        name: ele.name,
                        description: ele.description,
                        number: ele.number,
                        teach_form: ele.teach_form,
                        recording: ele.recording,
                        message: ele.message
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialSection(section));
                    }
                    else{
                        return dispatch(addSection(section))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}