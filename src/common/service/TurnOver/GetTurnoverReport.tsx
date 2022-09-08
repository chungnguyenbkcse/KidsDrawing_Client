import { fetchDataSuccess, fetchDataError, addTurnoverNow, addTurnoverLast, removeTurnoverNowAll, removeTurnoverLastAll} from "../../../store/actions/turnover.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TurnOver {
    turnover: number;
}
export function getTurnOverReport(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    const currentYear = new Date().getFullYear();
    return fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester/report/${currentYear}`, {
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
                        dispatch(getTurnOverReport(dispatch))
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
                dispatch(removeTurnoverNowAll())
                console.log(data.body.report_user_register_semester_now)
                data.body.report_user_register_semester_now.map((ele: any, index: any) => {
                    var turnover: TurnOver = {
                        turnover: ele
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addTurnoverNow(turnover))
                })

                dispatch(removeTurnoverLastAll())
                console.log(data.body.report_user_register_semester_last)
                data.body.report_user_register_semester_last.map((ele: any, index: any) => {
                    var turnover: TurnOver = {
                        turnover: ele
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addTurnoverLast(turnover))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}