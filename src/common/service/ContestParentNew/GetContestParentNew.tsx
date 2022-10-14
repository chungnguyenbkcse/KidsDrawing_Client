import { logout } from "../../../store/actions/account.actions";
import { fetchDataSuccess, fetchDataError, removeContestParentNewAll, initialContestParentNew, addContestParentNew } from "../../../store/actions/contest_parent_new.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ContestParentNew {
    id: string;
    name: string;
    description: string;
    max_participant: number;
    total_register_contest: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    creator_id: string;
    art_type_id: string;
    art_age_id: string;
    art_type_name: string;
    art_age_name: string;
    create_time: string;
    update_time: string;
    student_registered_name: string[];
    student_registered_id: string[];
}
export function getContestParentNew(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/contest/parent-new/${id}`, {
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
                        dispatch(getContestParentNew(dispatch, id))
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
                dispatch(removeContestParentNewAll())
                console.log(data.body.contests)
                data.body.contests.map((ele: any, index: any) => {
                    var contest: ContestParentNew = {
                        id: ele.id,
                        name: ele.name,
                        total_register_contest: ele.total_register_contest,
                        registration_time: ele.registration_time,
                        start_time: ele.start_time,
                        end_time: ele.end_time,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        image_url: ele.image_url,
                        is_enabled: ele.is_enabled,
                        creator_id: ele.creator_id,
                        art_type_id: ele.art_type_id,
                        art_age_id: ele.art_age_id,
                        art_age_name: ele.art_age_name,
                        art_type_name: ele.art_type_name,
                        student_registered_id: ele.student_registered_id,
                        student_registered_name: ele.student_registered_name,
                        create_time: ele.create_time,
                        update_time: ele.update_time

                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestParentNew(contest));
                    }
                    else{
                        return dispatch(addContestParentNew(contest))
                    }
                })
                dispatch(logout())
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}