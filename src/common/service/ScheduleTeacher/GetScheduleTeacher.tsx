import { fetchDataRequest, fetchDataSuccess, fetchDataError, addTimeScheduleTeacher, removeTimeScheduleTeacherAll } from "../../../store/actions/time_schedule_teacher.action";
import { postRefreshToken } from "../Aut/RefreshToken";

interface TimeScheduleTeacher {
    class_name: string;
    start_time: string;
    end_time: string;
}
export function getScheduleTeacher(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/classes/teacher/${id}`, {
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
                        dispatch(getScheduleTeacher(id))
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
                dispatch(removeTimeScheduleTeacherAll())
                //console.log(data.body.schedule_time)
                data.body.schedule_time.map((ele: any, index: any) => {
                    let x = Object.values(ele)
                    let y = Object.keys(ele)
                    return x.map((ele_1: any, idx: any) => {
                        //console.log(ele_1)
                        return Object.values(ele_1).map((ele_2: any) => {
                            //console.log(ele_2)
                            let x_1 = Object.values(ele_2)
                            return x_1.map((ele_3: any) => {
                                return ele_3.map((ele_4: any) => {
                                    console.log(ele_4)
                                    if (ele_4.length !== 0){
                                        let time: TimeScheduleTeacher = {
                                            class_name: y[idx],
                                            start_time: ele_4[0],
                                            end_time: ele_4[1]
                                        }
                                        dispatch(addTimeScheduleTeacher(time))
                                    }
                                    return ele_4
                                })
                            })
                        })
                    })
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}