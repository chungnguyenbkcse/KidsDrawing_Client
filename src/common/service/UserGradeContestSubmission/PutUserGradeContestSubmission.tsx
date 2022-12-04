import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/semester.actions";
import { postRefreshToken } from "../Aut/RefreshToken";

export function putUserGradeContestSubmission(teacher_id: number, submission_id: number, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-grade-contest-submission/${teacher_id}/${submission_id}`, {
                    method: "PUT",
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
                        dispatch(putUserGradeContestSubmission(teacher_id, submission_id, data, idx))
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
                toast.update(idx, { render: "Chỉnh điểm bài tập thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Chỉnh điểm bài tập không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}