import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester.actions";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getUserRegisterJoinSemesterBySemesterClassScheduleClass } from "../UserRegisterJoinSemester/GetUserRegisterJoinSemesterBySemesterClassScheduleClass";

export function getUserRegisterTeachSemesterClassScheduleClass(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-teach-semester/semester-class/schedule-class/${id}`, {
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
                        dispatch(getUserRegisterTeachSemesterClassScheduleClass(id))
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
                dispatch(getUserRegisterJoinSemesterBySemesterClassScheduleClass(id, data))          
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}