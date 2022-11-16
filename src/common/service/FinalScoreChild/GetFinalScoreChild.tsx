import { fetchDataSuccess, fetchDataError, addFinalScoreChild, removeFinalScoreChildAll} from "../../../store/actions/final_score_child.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface FinalScoreChild {
    course_id: number;
    course_name: string;
    final_score: number;
}
export function getFinalScoreChild(dispatch: any, id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/final-course/student/${id}`, {
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
                        dispatch(getFinalScoreChild(dispatch, id))
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
                dispatch(removeFinalScoreChildAll())
                data.body.final_grade.map((ele: any, index: any) => {
                    var val: FinalScoreChild = {
                        course_id: ele.course_id,
                        course_name: ele.course_name,
                        final_score: ele.final_score
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addFinalScoreChild(val))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}