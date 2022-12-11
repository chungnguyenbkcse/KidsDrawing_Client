import { fetchDataSuccess, fetchDataError, removeContestSubmissionGradeAll, removeContestSubmissionNotGradeAll, addContestSubmissionGrade, addContestSubmissionNotGrade } from "../../../store/actions/contest_submission_teacher.action";
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
export function getContestSubmissionByStudent(dispatch: any, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/contest-submission/student/${student_id}`, {
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
                        dispatch(getContestSubmissionByStudent(dispatch, student_id))
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
                dispatch(removeContestSubmissionGradeAll())
                dispatch(removeContestSubmissionNotGradeAll())
                console.log(data.body.ContestSubmission)
                data.body.ContestSubmission.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    if (ele.score == null) {
                        var contest_submission_teacher: ContestSubmission = {
                            id: 0,
                            student_id: ele.student_id,
                            student_name: ele.student_name,
                            contest_id: ele.contest_id,
                            teacher_id: 0,
                            teacher_name: "",
                            contest_name: ele.contest_name,
                            image_url: ele.image_url,
                            score: ele.score,
                            feedback: ele.feedback,
                            time: ele.time,
                            create_time: strDate_1,
                            update_time: strDate_2
                        }
                        return dispatch(addContestSubmissionNotGrade(contest_submission_teacher));
                    }
                    else {
                        var strDate_1 = ele.create_time;
                        var strDate_2 = ele.update_time;
                        var contest_submission_teacher: ContestSubmission = {
                            id: 0,
                            student_id: ele.student_id,
                            student_name: ele.student_name,
                            contest_id: ele.contest_id,
                            contest_name: ele.contest_name,
                            image_url: ele.image_url,
                            teacher_id: 0,
                            teacher_name: "",
                            score: ele.score,
                            feedback: ele.feedback,
                            time: ele.time,
                            create_time: strDate_1,
                            update_time: strDate_2
                        }
                        return dispatch(addContestSubmissionGrade(contest_submission_teacher));
                    }
                    
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}