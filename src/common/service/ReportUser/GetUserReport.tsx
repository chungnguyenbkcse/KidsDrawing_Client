import jwt_decode from "jwt-decode";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeReportUserAll, addReportUser } from "../../../store/actions/report_user.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTeacher } from "../Teacher/GetTeacher";
interface ReportUser {
    total: number
}
export function getReportUser() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    const currentYear = new Date().getFullYear();
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
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
                    throw Error(response.statusText);
                }
                return response.json()
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
    };
}