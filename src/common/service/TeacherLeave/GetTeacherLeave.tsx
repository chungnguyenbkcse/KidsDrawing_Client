import { fetchDataSuccess, fetchDataError, removeAcceptTeacherLeaveAll, addAcceptTeacherLeave, removeRemoveTeacherLeaveAll, addRemoveTeacherLeave, addLeaves, removeLeavesAll } from "../../../store/actions/teacher_leave.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TeacherLeave {
    id: any;
    section_id: number;
    section_name: string;
    class_id: number;
    class_name: string;
    teacher_id: number;
    teacher_name: string;
    section_number: number;
    reviewer_id: number;
    start_time: string;
    end_time: string;
    substitute_teacher_id: number;
    substitute_teacher_name: string;
    description: string;
    time_approved: string;
    status: string;
    create_time: string;
    update_time: string;
}
export function getTeacherLeave(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/teacher-leave`, {
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
                        dispatch(getTeacherLeave(dispatch))
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
                dispatch(removeAcceptTeacherLeaveAll())
                dispatch(removeRemoveTeacherLeaveAll())
                dispatch(removeLeavesAll())
                //console.log(data.body.teacher_leaves)
                data.body.teacher_leave.map((ele: any, index: any) => {
                    var strDate_1 = ele.create_time;
                    var strDate_2 = ele.update_time;
                    var teacher_leave: TeacherLeave = {
                        id: ele.id,
                        description: ele.description,
                        section_id: ele.section_id,
                        class_id: ele.classes_id,
                        class_name: ele.class_name,
                        start_time: ele.start_time,
                        end_time: ele.end_time,
                        section_number: ele.section_number,
                        teacher_id: ele.teacher_id,
                        time_approved: ele.time_approved,
                        reviewer_id: ele.reviewer_id,
                        substitute_teacher_id: ele.substitute_teacher_id,
                        substitute_teacher_name: ele.substitute_teacher_name,
                        status: ele.status,
                        teacher_name: ele.teacher_name,
                        section_name: ele.section_name,
                        create_time: strDate_1,
                        update_time: strDate_2
                    }
                    //console.log(strDate.substring(0, 16))
                    if (teacher_leave.status === "Approved"){
                        return dispatch(addAcceptTeacherLeave(teacher_leave));
                    }
                    else if (teacher_leave.status === "Not approved") {
                        return dispatch(addRemoveTeacherLeave(teacher_leave));
                    }
                    else {
                        return dispatch(addLeaves(teacher_leave));
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}