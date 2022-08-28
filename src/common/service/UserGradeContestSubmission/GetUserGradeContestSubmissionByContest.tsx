import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeUserGradeContestSubmissionAll, addUserGradeContestSubmission} from "../../../store/actions/user_grade_contest_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_grade_contest {
    student_id: number;
    contest_submission_id: number;
    feedback: string;
    score: number;
    time: string;
}
export function getUserGradeContestSubmissionByContestId(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
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
                        dispatch(getUserGradeContestSubmissionByContestId(id))
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
    };
}