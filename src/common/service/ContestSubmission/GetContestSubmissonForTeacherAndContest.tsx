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
export function getContestSubmissionByContestAndTeacher(dispatch: any, contest_id: any, teacher_id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/contest-submission/contest-teacher/${contest_id}/${teacher_id}`, {
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
                        dispatch(getContestSubmissionByContestAndTeacher(dispatch, contest_id, teacher_id))
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
                console.log(data.body.contest_submission_not_grade)
                data.body.contest_submission_not_grade.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var contest_submission_teacher: ContestSubmission = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        contest_id: ele.contest_id,
                        contest_name: ele.contest_name,
                        image_url: ele.image_url,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    return dispatch(addContestSubmissionNotGrade(contest_submission_teacher));
                })

                data.body.contest_submission_grade.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var contest_submission_teacher: ContestSubmission = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        contest_id: ele.contest_id,
                        contest_name: ele.contest_name,
                        image_url: ele.image_url,
                        create_time: strDate_1.substring(0, 5),
                        update_time: strDate_2.substring(0, 5)
                    }
                    return dispatch(addContestSubmissionGrade(contest_submission_teacher));
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}