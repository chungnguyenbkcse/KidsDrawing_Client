import { fetchDataRequest, fetchDataSuccess, fetchDataError, addScheduleTimeClass, removeScheduleTimeClassAll } from "../../../store/actions/schedule_time_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";

interface ScheduleTimeClass {
    class_name: string;
    start_time: string;
    end_time: string;
}
export function getScheduleTimeClass() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/classes/schedule-all`, {
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
                        dispatch(getScheduleTimeClass())
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
                                        let time: ScheduleTimeClass = {
                                            class_name: y[0],
                                            start_time: ele_4[0],
                                            end_time: ele_4[1]
                                        }
                                        dispatch(addScheduleTimeClass(time))
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