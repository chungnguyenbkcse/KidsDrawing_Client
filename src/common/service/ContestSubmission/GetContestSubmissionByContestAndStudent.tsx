import { fetchDataSuccess, fetchDataError } from "../../../store/actions/contest_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function getContestSubmissionByContestAndStudent(dispatch: any, contest_id: number, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/contest-submission/contest-student/${contest_id}/${student_id}`, {
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
                        dispatch(getContestSubmissionByContestAndStudent(dispatch, contest_id, student_id))
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
                console.log(data)
                localStorage.removeItem('url_contest_submission')
                localStorage.setItem('url_contest_submission', data.image_url)
                localStorage.removeItem('contest_submission_id')
                localStorage.setItem('contest_submission_id', data.id.toString()) 
                localStorage.removeItem('time_submit_contest_submission')
                localStorage.setItem('time_submit_contest_submission', data.update_time.toString())          
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}