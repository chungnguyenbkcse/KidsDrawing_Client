import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSemesterCourseAll, initialSemesterCourse, addSemesterCourse } from "../../../store/actions/semester_course.action";
interface SemesterCourse {
    id: number;
    creation_id: number;
    course_id: number;
    schedule_id: number;
}
export function getSemesterCourse() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester-course?page=0&size=5`, {
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
                dispatch(fetchDataSuccess(data))
                dispatch(removeSemesterCourseAll())
                //console.log(data.body.lessons)
                data.body.semester_courses.map((ele: any, index: any) => {
                    var course: SemesterCourse = {
                        id: ele.id,
                        creation_id: ele.creation_id,
                        course_id: ele.course_id,
                        schedule_id: ele.schedule_id
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialSemesterCourse(course));
                    }
                    else{
                        return dispatch(addSemesterCourse(course))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}