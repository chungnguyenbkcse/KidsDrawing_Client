import { fetchDataSuccess, fetchDataError, 
    removeContestTeacherEndAll, removeContestTeacherNotOpenNowAll, 
    removeContestTeacherNotOpenNowNotTeacherAll, removeContestTeacherOpeningAll,
    initialContestTeacherEnd, initialContestTeacherNotOpenNow,
    initialContestTeacherNotOpenNowNotTeacher, initialContestTeacherOpening, 
    addContestTeacherEnd, addContestTeacherNotOpenNow,
    addContestTeacherNotOpenNowNotTeacher, addContestTeacherOpening } from "../../../store/actions/contest_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ContestTeacher {
    id: number;
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
    art_age_name: string;
}
export function getContestTeacher(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/contest/teacher/${id}`, {
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
                        dispatch(getContestTeacher(dispatch, id))
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
                dispatch(removeContestTeacherEndAll())
                dispatch(removeContestTeacherNotOpenNowAll())
                dispatch(removeContestTeacherNotOpenNowNotTeacherAll())
                dispatch(removeContestTeacherOpeningAll())
                console.log(data)
                data.body.contest_opening.map((ele: any, index: any) => {
                    var contest: ContestTeacher = {
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
                        is_enabled: ele.is_enabled
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestTeacherOpening(contest));
                    }
                    else{
                        return dispatch(addContestTeacherOpening(contest))
                    }
                })

                data.body.contest_not_open_now_not_teacher.map((ele: any, index: any) => {
                    var contest: ContestTeacher = {
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
                        is_enabled: ele.is_enabled
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestTeacherNotOpenNowNotTeacher(contest));
                    }
                    else{
                        return dispatch(addContestTeacherNotOpenNowNotTeacher(contest))
                    }
                })


                data.body.contest_end.map((ele: any, index: any) => {
                    var contest: ContestTeacher = {
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
                        is_enabled: ele.is_enabled
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestTeacherEnd(contest));
                    }
                    else{
                        return dispatch(addContestTeacherEnd(contest))
                    }
                })


                data.body.contest_not_open_now.map((ele: any, index: any) => {
                    var contest: ContestTeacher = {
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
                        is_enabled: ele.is_enabled
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestTeacherNotOpenNow(contest));
                    }
                    else{
                        return dispatch(addContestTeacherNotOpenNow(contest))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}