import { fetchDataSuccess, fetchDataError, removeContestSubmissionGradeAll, removeContestSubmissionNotGradeAll, addContestSubmissionGrade, addContestSubmissionNotGrade } from "../../../store/actions/contest_submission_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ContestSubmission {
    id: any;
    student_id: any;
    contest_id: any;
    student_name: string;
    contest_name: string;
    image_url: string;
    create_time: string;
    update_time: string;
}
export function getCheckGenerationByContest(dispatch: any, contest_id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/contest-submission/check-generation/${contest_id}`, {
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
                        dispatch(getCheckGenerationByContest(dispatch, contest_id))
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
                localStorage.setItem('check_generation', "true")
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
                localStorage.setItem('check_generation', "false")
            });
}