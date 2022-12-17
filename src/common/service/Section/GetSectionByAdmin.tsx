import { fetchDataSuccess, fetchDataError, removeUserRegisterTutorialApprovedAll, removeUserRegisterTutorialNotApprovedAll, removeUserRegisterTutorialNotApprovedNowAll, addUserRegisterTutorialApproved, addUserRegisterTutorialNotApproved, addUserRegisterTutorialNotApprovedNow } from "../../../store/actions/user_register_tutorial.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface Section {
    id: any;
    name: string;
    number: number;
    teacher_name: string;
    class_id: number;
    class_name: string;
    status: string;
    create_time: string;
    update_time: string;
}
export function getSectionByAdmin(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return  fetch(
                `${process.env.REACT_APP_API_URL}/section/admin`, {
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
                        dispatch(getSectionByAdmin(dispatch))
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
                dispatch(removeUserRegisterTutorialApprovedAll())
                dispatch(removeUserRegisterTutorialNotApprovedAll())
                dispatch(removeUserRegisterTutorialNotApprovedNowAll())
                console.log(data.body.Section)
                data.body.section_approved.map((ele: any, index: any) => {
                    var section: Section = {
                        id: ele.id,
                        name: ele.name,
                        number: ele.number,
                        teacher_name: ele.teacher_name,
                        class_id: ele.classes_id,
                        class_name: ele.class_name,
                        status: ele.status,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addUserRegisterTutorialApproved(section))
                })

                data.body.section_not_approved.map((ele: any, index: any) => {
                    var section: Section = {
                        id: ele.id,
                        name: ele.name,
                        number: ele.number,
                        teacher_name: ele.teacher_name,
                        class_id: ele.classes_id,
                        class_name: ele.class_name,
                        status: ele.status,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addUserRegisterTutorialNotApproved(section))
                })

                data.body.section_not_approve_now.map((ele: any, index: any) => {
                    var section: Section = {
                        id: ele.id,
                        name: ele.name,
                        number: ele.number,
                        teacher_name: ele.teacher_name,
                        class_id: ele.classes_id,
                        class_name: ele.class_name,
                        status: ele.status,
                        create_time: ele.create_time,
                        update_time: ele.update_time
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addUserRegisterTutorialNotApprovedNow(section))
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}