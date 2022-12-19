import { fetchDataSuccess, fetchDataError, removeSectionAll, initialSection, addSection } from "../../../store/actions/section.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Section {
    id: any;
    class_id: number;
    name: string;
    description: string;
    number: number;
    status: string;
    time_approved: string;
    update_time: string;
    create_time: string;
    total_exercise_not_submit: number;
    teacher_name: string;
    teach_form: boolean;
    recording: string;
    message: string;
}
export function getSectionByClassAndStudent(dispatch: any, class_id: number, student_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/section/class-student/${class_id}/${student_id}`, {
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
                        dispatch(getSectionByClassAndStudent(dispatch, class_id, student_id))
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
                console.log(data)
                dispatch(fetchDataSuccess(data))
                dispatch(removeSectionAll())
                console.log(data.body.Section)
                data.body.Section.map((ele: any, index: any) => {
                    var section: Section = {
                        id: ele.id,
                        class_id: ele.class_id,
                        name: ele.name,
                        teacher_name: ele.teacher_name,
                        description: ele.description,
                        status: ele.status,
                        time_approved: ele.time_approved,
                        update_time: ele.update_time,
                        create_time: ele.create_time,
                        number: ele.number,
                        total_exercise_not_submit: ele.total_exercise_not_submit,
                        teach_form: ele.teach_form,
                        recording: ele.recording,
                        message: ele.message
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialSection(section));
                    }
                    else{
                        return dispatch(addSection(section))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}