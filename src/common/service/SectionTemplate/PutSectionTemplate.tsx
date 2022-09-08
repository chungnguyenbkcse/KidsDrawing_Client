import { fetchDataRequest, fetchDataError } from "../../../store/actions/section_template.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getSectionTemplate } from "./GetSectionTemplate";

export function putSectionTemplate(id: any, data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/section-template/${id}`, {
                    method: "PUT",
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
                        dispatch(putSectionTemplate(id,data))
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
                console.log(id)
                getSectionTemplate(dispatch)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}