import { fetchDataSuccess, fetchDataError, 
    removeContestParentEndAll, removeContestParentNotOpenNowAll, 
    removeContestParentNewAll, removeContestParentOpeningAll,
    initialContestParentEnd, initialContestParentNotOpenNow,
    initialContestParentNew, initialContestParentOpening, 
    addContestParentEnd, addContestParentNotOpenNow,
    addContestParentNew, addContestParentOpening } from "../../../store/actions/contest_parent.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ContestParent {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    total_register_contest: number;
    total_contest_submission: number;
    total_contest_submission_graded: number;
    registration_time: string;
    image_url: string;
    start_time: string;
    end_time: string;
    is_enabled: boolean;
    art_type_name: string;
    status: string;
    art_age_name: string;
    art_type_id: number;
    art_age_id: number;
    student_id: number;
    student_name: string;
    
    create_time: string;
    update_time: string;
}
export function getContestStudentByParent(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/contest/parent/${id}`, {
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
                        dispatch(getContestStudentByParent(dispatch, id))
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
                dispatch(removeContestParentEndAll())
                dispatch(removeContestParentNotOpenNowAll())
                dispatch(removeContestParentOpeningAll())
                console.log(data)
                data.body.contest_opening.map((ele: any, index: any) => {
                    var contest: ContestParent = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        total_contest_submission_graded: ele.total_contest_submission_graded,
                        total_contest_submission: ele.total_contest_submission,
                        total_register_contest: ele.total_register_contest,
                        registration_time: ele.registration_time,
                        art_type_name: ele.art_type_name,
                        art_age_name: ele.art_age_name,
                        image_url: ele.image_url,
                        start_time: ele.start_time,
                        status: ele.status,
                        end_time: ele.end_time,
                        is_enabled: ele.is_enabled,
                        art_age_id: ele.art_age_id,
                        art_type_id: ele.art_type_id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(contest)
                    return dispatch(addContestParentOpening(contest))
                })


                data.body.contest_end.map((ele: any, index: any) => {
                    var contest: ContestParent = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        total_contest_submission_graded: ele.total_contest_submission_graded,
                        total_contest_submission: ele.total_contest_submission,
                        total_register_contest: ele.total_register_contest,
                        registration_time: ele.registration_time,
                        art_type_name: ele.art_type_name,
                        art_age_name: ele.art_age_name,
                        image_url: ele.image_url,
                        start_time: ele.start_time,
                        end_time: ele.end_time,
                        is_enabled: ele.is_enabled,
                        art_age_id: ele.art_age_id,
                        status: ele.status,
                        art_type_id: ele.art_type_id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(contest)
                    return dispatch(addContestParentEnd(contest))
                })


                data.body.contest_not_open_now.map((ele: any, index: any) => {
                    var contest: ContestParent = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        max_participant: ele.max_participant,
                        total_contest_submission_graded: ele.total_contest_submission_graded,
                        total_contest_submission: ele.total_contest_submission,
                        total_register_contest: ele.total_register_contest,
                        registration_time: ele.registration_time,
                        art_type_name: ele.art_type_name,
                        status: ele.status,
                        art_age_name: ele.art_age_name,
                        image_url: ele.image_url,
                        start_time: ele.start_time,
                        end_time: ele.end_time,
                        is_enabled: ele.is_enabled,
                        art_age_id: ele.art_age_id,
                        art_type_id: ele.art_type_id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    return dispatch(addContestParentNotOpenNow(contest))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}