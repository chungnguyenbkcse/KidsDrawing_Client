import { fetchDataSuccess, fetchDataError, removeSemesterClassAll, initialSemesterClass, addSemesterClass } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface SemesterClass {
    id: number;
    name: string;
    semester_id: number;
    registration_time: string;
    semester_name: string;
    course_name: string;
    course_id: number;
    max_participant: number;
}
export function getSemesterClass(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return fetch(
                `${process.env.REACT_APP_API_URL}/semester-class`, {
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
                        dispatch(getSemesterClass(dispatch))
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
                dispatch(removeSemesterClassAll())
                //console.log(data.body.lessons)
                data.body.semester_classes.map((ele: any, index: any) => {
                    var class_ele: SemesterClass = {
                        id: ele.id,
                        name: ele.name,
                        semester_id: ele.semester_id,
                        registration_time: ele.registration_time,
                        semester_name: ele.semester_name,
                        course_id: ele.course_id,
                        course_name: ele.course_name,
                        max_participant: ele.max_participant
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialSemesterClass(class_ele));
                    }
                    else{
                        return dispatch(addSemesterClass(class_ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}