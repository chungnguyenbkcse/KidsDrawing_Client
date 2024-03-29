import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";


export function postExerciseSubmission(data: any, idx: any, routeHome: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercise-submission`, {
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
                        dispatch(postExerciseSubmission(data, idx, routeHome))
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
                dispatch(fetchDataSuccess(data))
                toast.update(idx, { render: "Nộp bài vẽ thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER , autoClose: 1000});
                setTimeout(function () {
                    routeHome();
                }, 1000); 
            })
            .catch(error => {
                toast.update(idx, { render: "Nộp bài vẽ không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}