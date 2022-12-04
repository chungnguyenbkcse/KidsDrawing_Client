import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getInforClassHasRegisterJoinSemester } from "./GetInfoClassHasRegisterJoinSemester";

export function putClassHasRegisterJoinSemesterTeacher(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    var id_x = localStorage.getItem('class_id');
    let class_id: number = 0;
    if (id_x !== null) {
        class_id = parseInt(id_x)
    }

    var id_y = localStorage.getItem('student_id');
    let student_id: number = 0;
    if (id_y !== null) {
        student_id = parseInt(id_y)
    }
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/class-has-register-join-semester/teacher`, {
                    method: "PUT",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(putClassHasRegisterJoinSemesterTeacher(data, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (res => {
                getInforClassHasRegisterJoinSemester(dispatch, class_id, student_id)
                toast.update(idx, { render: "Gửi nhận xét thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Gửi nhận xét không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}