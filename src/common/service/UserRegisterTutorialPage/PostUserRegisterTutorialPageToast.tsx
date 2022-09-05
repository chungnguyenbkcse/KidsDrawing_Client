import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function postUserRegisterTutorialPageToast(tutorialtemplatepage: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-tutorial-page`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    body: JSON.stringify(tutorialtemplatepage)
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postUserRegisterTutorialPageToast(tutorialtemplatepage, idx))
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
                toast.update(idx, { render: "Yêu cầu chỉnh giáo án được gửi không thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}