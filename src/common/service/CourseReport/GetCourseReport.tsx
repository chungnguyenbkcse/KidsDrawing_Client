import { fetchDataRequest, fetchDataError, removeCourseReportAll, addCourseReport } from "../../../store/actions/course_report.action";
interface CourseReport {
    total_register: number;
    name: string;
}
export function getCourseReport() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    const currentYear = new Date().getFullYear();
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/course/report/${currentYear}`, {
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
                dispatch(removeCourseReportAll())
                console.log(data.body.report_course)
                data.body.report_course.map((ele: any, index: any) => {
                    var report: CourseReport = {
                        total_register: ele.total_register,
                        name: ele.name
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addCourseReport(report))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}