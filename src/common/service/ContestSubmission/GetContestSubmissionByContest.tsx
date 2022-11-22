import { fetchDataSuccess, fetchDataError, removeContestGradedAll, removeContestNotGradedAll, addContestGraded, addContestNotGraded } from "../../../store/actions/contest_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ContestSubmission {
    id: any;
    student_id: number;
    contest_id: number;
    student_name: string;
    contest_name: string;
    image_url: string;
    create_time: string;
    update_time: string;
}
export function getContestSubmissionByContest(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/contest-submission/contest/${id}`, {
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
                        dispatch(getContestSubmissionByContest(dispatch, id))
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
                dispatch(removeContestGradedAll())
                dispatch(removeContestNotGradedAll())
                console.log(data.body.contest_not_graded)
                data.body.contest_not_graded.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var contest_submission: ContestSubmission = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        contest_id: ele.contest_id,
                        contest_name: ele.contest_name,
                        image_url: ele.image_url,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    return dispatch(addContestNotGraded(contest_submission));
                })

                data.body.contest_graded.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var contest_submission: ContestSubmission = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        contest_id: ele.contest_id,
                        contest_name: ele.contest_name,
                        image_url: ele.image_url,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    return dispatch(addContestGraded(contest_submission));
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}