import { fetchDataSuccess, fetchDataError, removeUserGradeContestSubmissionAll, addUserGradeContestSubmission} from "../../../store/actions/user_grade_contest_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_grade_contest {
    student_id: number;
    teacher_name: string;
    teacher_id: number;
    student_name: string;
    contest_id: number;
    contest_name: string;
    contest_submission_id: number;
    url_conest_submission: string;
    art_type_name: string;
    art_age_name: string;
    start_time: string;
    end_time: string;
    feedback: string;
    score: number;
    time: string;
}
export function getUserGradeContestSubmissionByContestAndTeacher(dispatch: any, contest_id: number, teacher_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-grade-contest-submission/contest-teacher/${contest_id}/${teacher_id}`, {
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
                        dispatch(getUserGradeContestSubmissionByContestAndTeacher(dispatch, contest_id, teacher_id))
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
                dispatch(removeUserGradeContestSubmissionAll())
                console.log(data.body.UserGradeContestSubmission)
                data.body.UserGradeContestSubmission.map((ele: any, index: any) => {
                    var user_grade_contest: user_grade_contest = {
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        contest_id: ele.contest_id,
                        url_conest_submission: ele.url_conest_submission,
                        art_age_name: ele.art_age_name,
                        art_type_name: ele.art_type_name,
                        start_time: ele.start_time,
                        end_time: ele.end_time,
                        contest_name: ele.contest_name,
                        contest_submission_id: ele.contest_submission_id,
                        feedback: ele.feedback,
                        score: ele.score,
                        time: ele.time
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addUserGradeContestSubmission(user_grade_contest))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}