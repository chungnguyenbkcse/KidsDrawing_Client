import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getContest } from "../Contest/GetContest";


export function postGenerationContestSubmissionGrade(id: number, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/contest-submission/contest/${id}`, {
                    method: "POST",
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
                        dispatch(postGenerationContestSubmissionGrade(id, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (val => {
                console.log(val)
                getContest(dispatch)
                toast.update(idx, { render: "Nộp bài thi thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER , autoClose: 2000});
            })
            .catch(error => {
                toast.update(idx, { render: "Nộp bài thi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}