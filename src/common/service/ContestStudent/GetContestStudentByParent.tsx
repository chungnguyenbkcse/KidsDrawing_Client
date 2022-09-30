import { fetchDataSuccess, fetchDataError, 
    removeContestStudentEndAll, removeContestStudentNotOpenNowAll, 
    removeContestStudentNewAll, removeContestStudentOpeningAll,
    initialContestStudentEnd, initialContestStudentNotOpenNow,
    initialContestStudentNew, initialContestStudentOpening, 
    addContestStudentEnd, addContestStudentNotOpenNow,
    addContestStudentNew, addContestStudentOpening } from "../../../store/actions/contest_student.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ContestStudent {
    id: string;
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
    art_type_id: string;
    art_age_id: string;
    student_id: string;
    student_name: string;
    creator_id: string;
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
                dispatch(removeContestStudentEndAll())
                dispatch(removeContestStudentNotOpenNowAll())
                dispatch(removeContestStudentNewAll())
                dispatch(removeContestStudentOpeningAll())
                console.log(data)
                data.body.contest_opening.map((ele: any, index: any) => {
                    var contest: ContestStudent = {
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
                        art_type_id: ele.art_type_id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        creator_id: ele.creator_id,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestStudentOpening(contest));
                    }
                    else{
                        return dispatch(addContestStudentOpening(contest))
                    }
                })

                data.body.contest_new.map((ele: any, index: any) => {
                    var contest: ContestStudent = {
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
                        art_type_id: ele.art_type_id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        creator_id: ele.creator_id,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestStudentNew(contest));
                    }
                    else{
                        return dispatch(addContestStudentNew(contest))
                    }
                })


                data.body.contest_end.map((ele: any, index: any) => {
                    var contest: ContestStudent = {
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
                        art_type_id: ele.art_type_id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        creator_id: ele.creator_id,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestStudentEnd(contest));
                    }
                    else{
                        return dispatch(addContestStudentEnd(contest))
                    }
                })


                data.body.contest_not_open_now.map((ele: any, index: any) => {
                    var contest: ContestStudent = {
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
                        art_type_id: ele.art_type_id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        creator_id: ele.creator_id,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    console.log(contest)
                    if (index === 0){
                        return dispatch(initialContestStudentNotOpenNow(contest));
                    }
                    else{
                        return dispatch(addContestStudentNotOpenNow(contest))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}