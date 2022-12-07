import { fetchDataSuccess, fetchDataError, removeContestEndAll, removeContestNotOpenNowAll, removeContestOpeningAll, addContestEnd, addContestNotOpenNow, addContestOpening } from "../../../store/actions/contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Contest {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    registration_time: string;
    total_register_contest: number;
    total_contest_submission: number;
    total_contest_submission_graded: number;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    
    check_gen: boolean;
    art_type_id: number;
    art_age_id: number;
    art_type_name: string;
    art_age_name: string;
    create_time: string;
    update_time: string;
}
export function getContest(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/contest`, {
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
                        dispatch(getContest(dispatch))
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
                dispatch(removeContestEndAll())
                dispatch(removeContestNotOpenNowAll())
                dispatch(removeContestOpeningAll())
                console.log(data.body.contest_not_open_now)
                data.body.contest_not_open_now.map((ele: any, index: any) => {
                    var strDate1 = ele.start_time;
                    var strDate2 = ele.end_time;
                    var strDate3 = ele.registration_time;
                    var contest: Contest = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        total_contest_submission_graded: ele.total_contest_submission_graded,
                        total_contest_submission: ele.total_contest_submission,
                        total_register_contest: ele.total_register_contest,
                        registration_time: strDate3,
                        image_url: ele.image_url,
                        start_time: strDate1,
                        end_time: strDate2,
                        check_gen: ele.check_gen,
                        is_enabled: ele.is_enabled,
                        
                        art_type_id: ele.art_type_id,
                        art_age_id: ele.art_age_id,
                        art_age_name: ele.art_age_name,
                        art_type_name: ele.art_type_name,
                        create_time: ele.create_time,
                        update_time: ele.update_time

                    }
                    dispatch(addContestNotOpenNow(contest))
                })

                data.body.contest_opening.map((ele: any, index: any) => {
                    var strDate1 = ele.start_time;
                    var strDate2 = ele.end_time;
                    var strDate3 = ele.registration_time;
                    var contest: Contest = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        total_contest_submission_graded: ele.total_contest_submission_graded,
                        total_contest_submission: ele.total_contest_submission,
                        total_register_contest: ele.total_register_contest,
                        registration_time: strDate3,
                        image_url: ele.image_url,
                        start_time: strDate1,
                        end_time: strDate2,
                        check_gen: ele.check_gen,
                        is_enabled: ele.is_enabled,
                        
                        art_type_id: ele.art_type_id,
                        art_age_id: ele.art_age_id,
                        art_age_name: ele.art_age_name,
                        art_type_name: ele.art_type_name,
                        create_time: ele.create_time,
                        update_time: ele.update_time

                    }
                    dispatch(addContestOpening(contest))
                })

                data.body.contest_end.map((ele: any, index: any) => {
                    var strDate1 = ele.start_time;
                    var strDate2 = ele.end_time;
                    var strDate3 = ele.registration_time;
                    var contest: Contest = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        total_contest_submission_graded: ele.total_contest_submission_graded,
                        total_contest_submission: ele.total_contest_submission,
                        total_register_contest: ele.total_register_contest,
                        registration_time: strDate3,
                        image_url: ele.image_url,
                        start_time: strDate1,
                        end_time: strDate2,
                        check_gen: ele.check_gen,
                        is_enabled: ele.is_enabled,
                        
                        art_type_id: ele.art_type_id,
                        art_age_id: ele.art_age_id,
                        art_age_name: ele.art_age_name,
                        art_type_name: ele.art_type_name,
                        create_time: ele.create_time,
                        update_time: ele.update_time

                    }
                    dispatch(addContestEnd(contest))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}