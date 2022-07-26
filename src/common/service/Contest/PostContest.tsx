import { fetchDataRequest, fetchDataSuccess, fetchDataError, addContest } from "../../../store/actions/contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postUserGradeContest } from "../UserGradeContest/PostUserGradeContest";

export function postContest(lst: any[], data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/contest`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postContest(lst,data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response.json()
            })
            .then (data => {
                console.log(data)
                lst.map((value, index) =>  {
                    return dispatch(postUserGradeContest({
                        contest_id: data.id,
                        teacher_id: value.value
                    }))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}