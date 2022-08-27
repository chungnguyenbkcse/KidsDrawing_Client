import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialAll, initialTutorial, addTutorial } from "../../../store/actions/tutorial.action";
interface Tutorial {
    id: number;
    section_id: number;
    name: string;
    creator_id: number;
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
                    throw Error(response.statusText);
                }
                return response.json()
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
                        status: ele.status,
                        description: ele.description,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTutorial(tutorial));
                    }
                    else{
                        return dispatch(addTutorial(tutorial))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}