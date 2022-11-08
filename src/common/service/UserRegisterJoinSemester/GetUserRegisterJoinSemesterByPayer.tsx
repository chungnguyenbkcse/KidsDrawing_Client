import { fetchDataError, addCompleted, addWaiting, removeCompletedAll, removeWaitingAll} from "../../../store/actions/user_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user_register_semester {
    id: any;
    student_id: number;
    payer_id: number;
    payer_name: string;
    course_name: string;
    price: number;
    student_name: string;
    link_url: string;
    status: string;
    semester_class_id: number;
    time: string;
}
export function getUserRegisterJoinSemesterByPayer(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester/payer/${id}`, {
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
                        dispatch(getUserRegisterJoinSemesterByPayer(dispatch, id))
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
                dispatch(removeCompletedAll())
                dispatch(removeWaitingAll())
                console.log(data.body.user_register_semester)
                data.body.user_register_semester.map((ele: any, index: any) => {
                    var user_register_semester: user_register_semester = {
                        id: ele.id,
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        link_url: ele.link_url,
                        payer_name: "",
                        course_name: ele.course_name,
                        status: ele.status,
                        payer_id: ele.payer_id,
                        price: ele.price,
                        semester_class_id: ele.semester_class_id,
                        time: ele.time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (ele.status === "Completed") {
                        dispatch(addCompleted(user_register_semester))
                    }
                    else {
                        dispatch(addWaiting(user_register_semester))
                    }
                    return index
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}