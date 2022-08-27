import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, addExercise } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getExercise } from "./GetExercise";
import { getExerciseBySection } from "./GetExerciseBySection";

export function postExercise(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem('section_id');
    let section_id: number = 0;
    if(id_x !== null){
        section_id = parseInt(id_x)
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercises`, {
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
                    throw Error(response.statusText);
                }
                return response
            })
            .then (val => {
                console.log(val)
                dispatch(fetchDataSuccess(data))
                dispatch(getExerciseBySection(section_id))
                toast.update(idx, { render: "Thêm bài tập thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER , autoClose: 2000});
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm bài tập không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}