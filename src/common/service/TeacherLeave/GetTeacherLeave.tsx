import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeAcceptTeacherLeaveAll, initialAcceptTeacherLeave, addAcceptTeacherLeave, removeAcceptTeacherLeave, removeRemoveTeacherLeaveAll, addRemoveTeacherLeave, addLeaves, removeLeavesAll } from "../../../store/actions/teacher_leave.action";
interface TeacherLeave {
    id: number;
    section_id: number;
    section_name: string;
    class_id: number;
    class_name: string;
    teacher_id: number;
    teacher_name: string;
    section_number: number;
    reviewer_id: number;
    substitute_teacher_id: number;
    substitute_teacher_name: string;
    description: string;
    status: string;
    create_time: string;
    update_time: string;
}
export function getTeacherLeave() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
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
                    throw Error(response.statusText);
                }
                return response.json()
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
                        class_id: ele.class_id,
                        class_name: ele.class_name,
                        section_number: ele.section_number,
                        teacher_id: ele.teacher_id,
                        reviewer_id: ele.reviewer_id,
                        substitute_teacher_id: ele.substitute_teacher_id,
                        substitute_teacher_name: ele.substitute_teacher_name,
                        status: ele.status,
                        teacher_name: ele.teacher_name,
                        section_name: ele.section_name,
                        create_time: strDate_1.substring(0, 5),
                        update_time: strDate_2.substring(0, 5)
                    }
                    //console.log(strDate.substring(0, 16))
                    if (teacher_leave.status === "Approved"){
                        return dispatch(addAcceptTeacherLeave(teacher_leave));
                    }
                    else if (teacher_leave.status === "Not Approved") {
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
    };
}