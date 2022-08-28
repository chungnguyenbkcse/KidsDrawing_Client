import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeExerciseLevelAll, addExerciseLevel } from "../../../store/actions/exercise_level.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ExerciseLevel {
    id: number;
    name: string;
    description: string;
    weight: number;
}
export function getExerciseLevel() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/exercise-level`, {
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
                        dispatch(getExerciseLevel())
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
                dispatch(removeExerciseLevelAll())
                //console.log(data.body.exercise_levels)
                data.body.ExerciseLevel.map((ele: any, index: any) => {
                    var exercise_level: ExerciseLevel = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        weight: ele.weight
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addExerciseLevel(exercise_level))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}