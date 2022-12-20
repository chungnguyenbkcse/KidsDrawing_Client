import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getInforClassHasRegisterJoinSemester } from "./GetInfoClassHasRegisterJoinSemester";

export function putReviewClassByStudent(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    var id_ix = localStorage.getItem('student_ids');
    let student_ids: number[] = [];
    if (id_ix !== null) {
        student_ids = JSON.parse(id_ix);
    }

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/class-has-register-join-semester/student`, {
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
                        dispatch(putReviewClassByStudent(data, idx))
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
                if (student_ids.length > 0) {
                    getInforClassHasRegisterJoinSemester(dispatch, data.classes_id, student_ids[0])
                }
                
                toast.update(idx, { render: "Gửi nhận xét thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
            })
            .catch(error => {
                toast.update(idx, { render: "Gửi nhận xét không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}