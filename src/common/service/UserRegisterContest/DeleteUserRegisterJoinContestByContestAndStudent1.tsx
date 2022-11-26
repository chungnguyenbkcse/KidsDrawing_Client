import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function deleteUserRegisterContestByContestAndStudent1(contest_id: number, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-contest/contest-student/${contest_id}/${student_id}`, {
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
                        dispatch(deleteUserRegisterContestByContestAndStudent1(contest_id, student_id))
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
                
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}