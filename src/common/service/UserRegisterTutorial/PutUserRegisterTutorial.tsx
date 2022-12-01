import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/user_register_tutorial.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postNotifyDb } from "../NotifyDb/PostNotifyDb";
import { getUserRegisterTutorial } from "./GetUserRegisterTutorial";

export function putUserRegisterTutorial(id: any, tutorial: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-tutorial/${id}`, {
                    method: "PUT",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(tutorial)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(putUserRegisterTutorial(id, tutorial, idx))
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
                dispatch(postNotifyDb({
                    name: 'Chấp nhận giáo án giáo viên!',
                    description: `Quản trị viên đã chấp nhận yêu cầu chỉnh giáo án ${tutorial.name} của giáo viên!`
                }, tutorial.creator_id))
                toast.update(idx, { render: "Bạn đã xác nhận giáo án cho giáo viên thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(fetchDataSuccess(tutorial))
                getUserRegisterTutorial(dispatch)
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Bạn đã xác nhận giáo án cho giáo viên không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}