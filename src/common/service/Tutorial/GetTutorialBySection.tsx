import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialApprovedAll, removeTutorialNotApprovedAll, removeTutorialNotApprovedNowAll, addTutorialApproved, addTutorialNotApproved, addTutorialNotApprovedNow } from "../../../store/actions/tutorial.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Tutorial {
    id: number;
    section_id: number;
    creator_id: number;
    creator_name: string;
    class_name: string;
    class_id: number;
    section_number: number;
    name: string;
    status: string;
    description: string;
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
                dispatch(removeTutorialApprovedAll())
                dispatch(removeTutorialNotApprovedAll())
                dispatch(removeTutorialNotApprovedNowAll())
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
                        status: ele.status,
                        description: ele.description,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (tutorial.status === "Not approved now"){
                        return dispatch(addTutorialNotApprovedNow(tutorial));
                    }
                    else if (tutorial.status === "Not approved"){
                        return dispatch(addTutorialNotApproved(tutorial));
                    }
                    else{
                        return dispatch(addTutorialApproved(tutorial))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}