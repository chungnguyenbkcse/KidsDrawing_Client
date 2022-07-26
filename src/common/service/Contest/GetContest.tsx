import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeContestAll, initialContest, addContest } from "../../../store/actions/contest.action";
interface Contest {
    id: number;
    name: string;
    description: string;
    max_participant: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    creator_id: number;
    art_type_id: number;
    art_age_id: number;
    create_time: string;
    update_time: string;
}
export function getContest() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/contest?page=0&size=5`, {
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
                dispatch(removeContestAll())
                //console.log(data.body.Contests)
                data.body.art_age.map((ele: any, index: any) => {
                    var strDate1 = ele.start_time;
                    var strDate2 = ele.end_time;
                    var strDate3 = ele.registration_time;
                    var contest: Contest = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        registration_time: strDate3.substring(0,16),
                        image_url: ele.image_url,
                        start_time: strDate1.substring(0,16),
                        end_time: strDate2.substring(0,16),
                        is_enabled: ele.is_enabled,
                        creator_id: ele.creater_id,
                        art_type_id: ele.art_type_id,
                        art_age_id: ele.art_age_id,
                        create_time: ele.create_time,
                        update_time: ele.update_time

                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContest(contest));
                    }
                    else{
                        return dispatch(addContest(contest))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}