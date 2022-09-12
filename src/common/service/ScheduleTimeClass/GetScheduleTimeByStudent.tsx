import { fetchDataSuccess, fetchDataError, addScheduleTimeClass, removeScheduleTimeClassAll } from "../../../store/actions/schedule_time_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";

interface ScheduleTimeClass {
    class_name: string;
    start_time: string;
    end_time: string;
}
export function getScheduleTimeByChild(dispatch: any, child_id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return fetch(
                `${process.env.REACT_APP_API_URL}/classes/schedule-child/${child_id}`, {
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
                        dispatch(getScheduleTimeByChild(dispatch, child_id))
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
                dispatch(removeScheduleTimeClassAll())
                //console.log(data.body.schedule_time)
                data.body.schedules.map((ele: any, index: any) => {
                        let k = Object.values(ele)
                        let xxas = Object.keys(ele)
                        console.log(xxas)
                        return k.map((ele_2: any) => {
                            return Object.values(ele_2).map((ele_3: any) => {
                                //console.log(ele_2)
                                let x_1 = Object.values(ele_3)
                                let y_1 = Object.keys(ele_3)
                                console.log(y_1)
                                console.log(x_1)
                                return x_1.map((ele_4: any) => {
                                    return ele_4.map((ele_5: any) => {
                                        console.log(ele_5)
                                                if (ele_5.length > 0){
                                                    let time: ScheduleTimeClass = {
                                                        class_name: xxas[0],
                                                        start_time: ele_5[0],
                                                        end_time: ele_5[1]
                                                    }
                                                    dispatch(addScheduleTimeClass(time))
                                                }
                                                return ele_5
                                        
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
}