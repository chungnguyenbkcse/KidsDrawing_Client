import { fetchDataRequest, fetchDataSuccess, fetchDataError, initialUserGradeContest, addUserGradeContest} from "../../../store/actions/user_grade_contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_grade_contest {
    id: number;
    contest_id: number;
    teacher_id: number;
    teacher_name: string;
    contest_name: string;
}
export function getUserGradeContestByContestId(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-grade-contest/contest/${id}?page=0&size=100`, {
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
                        dispatch(getUserGradeContestByContestId(id))
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
                console.log(data.body.teacher_grade_contest)
                data.body.teacher_grade_contest.map((ele: any, index: any) => {
                    var user_grade_contest: user_grade_contest = {
                        id: ele.id,
                        contest_id: ele.contest_id,
                        teacher_id: ele.teacher_id,
                        teacher_name: ele.teacher_name,
                        contest_name: ele.contest_name
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialUserGradeContest(user_grade_contest));
                    }
                    else{
                        return dispatch(addUserGradeContest(user_grade_contest))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}