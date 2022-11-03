import { fetchDataError } from "../../../store/actions/user_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_register_semester {
    id: any;
    student_id: any;
    payer_id: any;
    price: number;
    course_name: string;
    payer_name: string;
    student_name: string;
    link_url: string;
    status: string;
    semester_class_id: any;
    time: string;
}
export function getUserRegisterJoinSemesterBySemesterClassScheduleClass(id: any, data_1: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  (dispatch: any) => {
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester/semester-class/schedule-class/${id}`, {
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
                        dispatch(getUserRegisterJoinSemesterBySemesterClassScheduleClass(id, data_1))
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
                console.log(data.body.user_register_semester)
                console.log(data_1)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
        }
}