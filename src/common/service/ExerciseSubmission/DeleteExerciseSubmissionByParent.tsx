import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getExerciseForClassAndParent } from "../ExerciseParent/GetExerciseByClassAndParent";
import { getExerciseSubmissionByClassAndParent } from "./GetExerciseSubmissionByClassAndParent";


export function deleteExerciseSubmissionParent(exercise_id: number, student_id: number, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem('id');
    var idxx: number = 0;
    if (id_x !== null) {
        idxx = parseInt(id_x);
    }

    var id_y = localStorage.getItem('class_id');

    let class_id = 0;

    if (id_y !== null) {
        class_id = parseInt(id_y);
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercise-submission/${exercise_id}/${student_id}`, {
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
                        dispatch(deleteExerciseSubmissionParent(exercise_id, student_id, idx))
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
                toast.update(idx, { render: "Chỉnh bài nộp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER , autoClose: 1000});
                getExerciseSubmissionByClassAndParent(dispatch, class_id, idxx)
                getExerciseForClassAndParent(dispatch, class_id, idxx)
            })
            .catch(error => {
                toast.update(idx, { render: "Chỉnh bài nộp không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}