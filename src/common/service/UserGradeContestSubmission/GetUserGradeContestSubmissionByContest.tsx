import { fetchDataSuccess, fetchDataError, removeUserGradeContestSubmissionAll, addUserGradeContestSubmission} from "../../../store/actions/user_grade_contest_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_grade_contest {
    student_id: string;
    teacher_name: string;
    teacher_id: string;
    student_name: string;
    contest_id: string;
    contest_name: string;
    contest_submission_id: string;
    feedback: string;
    score: number;
    time: string;
}
export function getUserGradeContestSubmissionByContestId(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-grade-contest-submission/contest/${id}`, {
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
                        dispatch(getUserGradeContestSubmissionByContestId(dispatch, id))
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