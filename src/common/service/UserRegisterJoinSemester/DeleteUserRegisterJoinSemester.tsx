import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/contest.action";
import { removeWaiting } from "../../../store/actions/user_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function deleteUserRegisterJoinSemester1(id: number, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester/${id}`, {
                    method: "DELETE",
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
                        dispatch(deleteUserRegisterJoinSemester1(id, idx))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (data => {
                console.log(data)
                toast.update(idx, { render: "Đăng kí không thành công vì trùng lịch!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                removeWaiting(id)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Đăng kí không thành công vì trùng lịch!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}