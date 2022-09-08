import { fetchDataError, removeReportUserAll, addReportUser } from "../../../store/actions/report_user.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ReportUser {
    total: number
}
export function getReportUser(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    const currentYear = new Date().getFullYear();
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user/report/${currentYear}`, {
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
                        dispatch(getReportUser(dispatch))
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
                dispatch(removeReportUserAll())
                console.log(data.body.report_user)
                data.body.report_user.map((ele: any, index: any) => {
                    var report: ReportUser = {
                        total: ele
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addReportUser(report))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}