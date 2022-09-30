import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialAll, addTutorial } from "../../../store/actions/tutorial.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Tutorial {
    id: string;
    section_id: string;
    creator_id: string;
    creator_name: string;
    class_name: string;
    class_id: string;
    section_number: number;
    name: string;
    create_time: string;
    update_time: string;
}
export function getTutorialBySection(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
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
                        dispatch(getTutorialBySection(id))
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
                dispatch(removeTutorialAll())
                //console.log(data.body.lessons)
                data.body.Tutorial.map((ele: any, index: any) => {
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
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}