import { fetchDataSuccess, fetchDataError, removeContestGradedAll, removeContestNotGradedAll, addContestGraded, addContestNotGraded } from "../../../store/actions/contest_submission.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ContestSubmission {
    id: any;
    student_id: number;
    contest_id: number;
    student_name: string;
    contest_name: string;
    teacher_id: number;
    teacher_name: string;
    image_url: string;
    score: number;
    feedback: string;
    time: string;
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
                    var contest_submission: ContestSubmission = {
                        id: 0,
                        student_id: ele.student_id,
                        contest_id: ele.contest_id,
                        student_name: ele.student_name,
                        contest_name: ele.contest_name,
                        image_url: ele.image_url,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        score: ele.score,
                        feedback: ele.feedback,
                        time: ele.time,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    return dispatch(addContestNotGraded(contest_submission));
                })

                data.body.contest_graded.map((ele: any, index: any) => {
                    var contest_submission: ContestSubmission = {
                        id: 0,
                        student_id: ele.student_id,
                        contest_id: ele.contest_id,
                        student_name: ele.student_name,
                        contest_name: ele.contest_name,
                        image_url: ele.image_url,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        score: ele.score,
                        feedback: ele.feedback,
                        time: ele.time,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    return dispatch(addContestGraded(contest_submission));
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}