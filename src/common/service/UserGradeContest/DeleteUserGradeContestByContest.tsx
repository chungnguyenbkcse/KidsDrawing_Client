import { fetchDataRequest, fetchDataError } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postUserGradeContest } from "./PostUserGradeContest";

export function deleteUserGradeContestByContest(id: any, valueTeacher: any[], idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
            `${process.env.REACT_APP_API_URL}/user-grade-contest/contest/${id}`, {
                method: "DELETE",
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
                        dispatch(deleteUserGradeContestByContest(id, valueTeacher, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (data => {
                console.log(data)
                valueTeacher.map((value, index) =>  {
                    return dispatch(postUserGradeContest({
                        contest_id: id,
                        teacher_id: value.value,
                        number: index + 1
                    }))
                })
                
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}