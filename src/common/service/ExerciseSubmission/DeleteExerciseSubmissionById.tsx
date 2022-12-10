import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getExerciseForClassStudent } from "../ExerciseStudent/GetExerciseForClassStudent";
import { getExerciseSubmissionByClassAndStudent } from "./GetExerciseSubmissionByClassAndStudent";


export function deleteExerciseSubmission(exercise_id: number, student_id: number, idx: any) {
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
                        dispatch(deleteExerciseSubmission(exercise_id, student_id, idx))
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
                toast.update(idx, { render: "Xóa bài nộp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER , autoClose: 1000});
                getExerciseSubmissionByClassAndStudent(dispatch, class_id, idxx)
                getExerciseForClassStudent(dispatch, class_id, idxx)
            })
            .catch(error => {
                toast.update(idx, { render: "Xóa bài nộp không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}