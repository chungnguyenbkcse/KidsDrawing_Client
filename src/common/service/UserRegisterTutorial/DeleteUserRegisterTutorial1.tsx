import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataSuccess } from "../../../store/actions/user_register_tutorial.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postNotifyDb } from "../NotifyDb/PostNotifyDb";
import { getUserRegisterTutorial } from "./GetUserRegisterTutorial";
import { getUserRegisterTutorialBySection } from "./GetUserRegisterTutorialBySection";

export function deleteUserRegisterTutorial1(id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_y = localStorage.getItem('section_id');

    let section_id = 0;

    if (id_y !== null) {
        section_id = parseInt(id_y);
    }
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-tutorial/${id}`, {
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
                        dispatch(deleteUserRegisterTutorial1(id, idx))
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
                getUserRegisterTutorialBySection(dispatch, section_id)
                console.log(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Xóa yêu cầu không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}