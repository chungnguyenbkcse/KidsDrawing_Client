import { fetchDataSuccess, fetchDataError, removeTutorialAll, addTutorial } from "../../../store/actions/tutorial.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Tutorial {
    id: any;
    section_id: number;
    creator_id: number;
    creator_name: string;
    class_name: string;
    class_id: number;
    section_number: number;
    name: string;
    create_time: string;
    update_time: string;
}
export function getTutorialBySection(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/tutorial/section/${id}`, {
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
                        dispatch(getTutorialBySection(dispatch, id))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response.json()
                }
            })
            .then (ele => {
                dispatch(fetchDataSuccess(ele))
                dispatch(removeTutorialAll())
                //console.log(data.body.lessons)
                var tutorial: Tutorial = {
                    id: ele.id,
                    section_id: ele.section_id,
                    name: ele.name,
                    creator_id: ele.creator_id,
                    creator_name: ele.creator_name,
                    class_id: ele.class_id,
                    class_name: ele.class_name,
                    section_number: ele.section_number,
                    create_time: ele.create_time,
                    update_time: ele.update_time
                }
                return dispatch(addTutorial(tutorial))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}