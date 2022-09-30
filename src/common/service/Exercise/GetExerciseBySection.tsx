import { fetchDataSuccess, fetchDataError, removeExerciseAll, initialExercise, addExercise } from "../../../store/actions/exercise.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface exercise {
    id: string;
    name: string;
    description: string;
    section_id: string;
    deadline: string;
    level_id: string;
    level_name: string;
    section_name: string;
    create_time: string;
    update_time: string;
}
export function getExerciseBySection(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/exercises/section/${id}`, {
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
                        dispatch(getExerciseBySection(dispatch,id))
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
                dispatch(removeExerciseAll())
                //console.log(data.body.exercises)
                data.body.Exercise.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var exercise: exercise = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description,
                        section_id: ele.section_id,
                        level_id: ele.level_id,
                        deadline: ele.deadline,
                        level_name: ele.level_name,
                        section_name: ele.section_name,
                        create_time: strDate_1.substring(0, 5),
                        update_time: strDate_2.substring(0, 5)
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialExercise(exercise));
                    }
                    else{
                        return dispatch(addExercise(exercise))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}