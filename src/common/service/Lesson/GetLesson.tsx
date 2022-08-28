import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeLessonAll, initialLesson, addLesson } from "../../../store/actions/lesson.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface lesson {
    id: number;
    start_time: string;
    end_time: string;
}
export function getLesson() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/lesson-time?page=0&size=5`, {
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
                        dispatch(getLesson())
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
                dispatch(removeLessonAll())
                //console.log(data.body.lessons)
                data.body.lesson_times.map((ele: any, index: any) => {
                    var strDate_1 = ele.start_time;
                    var strDate_2 = ele.end_time;
                    var lesson: lesson = {
                        id: ele.id,
                        start_time: strDate_1.substring(0, 5),
                        end_time: strDate_2.substring(0, 5),
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialLesson(lesson));
                    }
                    else{
                        return dispatch(addLesson(lesson))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}