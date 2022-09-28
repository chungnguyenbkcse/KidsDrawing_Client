import { fetchDataError } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getUserRegisterTeachSemesterClassScheduleClass } from "../UserTeachSemester/GetUserRegisterTeachSemesterBySemesterClassScheduleClass";

export function getSemesterClassBySemesterClassScheduleClass(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        fetch(
                `${process.env.REACT_APP_API_URL}/semester-class/semester/schedule-class/${id}`, {
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
                        dispatch(getSemesterClassBySemesterClassScheduleClass(id))
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
                console.log(data.body.semester_classes)
                data.body.semester_classes.map((ele: any, index: any) => {
                    return dispatch(getUserRegisterTeachSemesterClassScheduleClass(ele.id))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
        }
}