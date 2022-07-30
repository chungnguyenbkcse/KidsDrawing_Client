import { fetchDataRequest, fetchDataSuccess, fetchDataError, initialUserRegisterJoinSemester, addUserRegisterJoinSemester} from "../../../store/actions/user_register_join_semester.action";
interface user_register_semester {
    id: number;
    student_id: number;
    payer_id: number;
    price: number;
    semester_course_id: number;
    time: string;
}
export function getUserRegisterJoinSemester() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester`, {
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
                console.log(data.body.user_register_semester)
                data.body.user_register_semester.map((ele: any, index: any) => {
                    var user_register_semester: user_register_semester = {
                        id: ele.id,
                        student_id: ele.student_id,
                        payer_id: ele.payer_id,
                        price: ele.price,
                        semester_course_id: ele.semester_course_id,
                        time: ele.time
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialUserRegisterJoinSemester(user_register_semester));
                    }
                    else{
                        return dispatch(addUserRegisterJoinSemester(user_register_semester))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}