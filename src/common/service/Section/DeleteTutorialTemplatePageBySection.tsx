import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/schedule.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postTutorialTemplatePageBySection } from "./PostTutorialPageBySection";

export function deleteTutorialTemplatePageBySectionX(id: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/section/tutorial-template-page/${id}`, {
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
                        dispatch(deleteTutorialTemplatePageBySectionX(id,idx))
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
                toast.update(idx, { render: "Thay thế giáo trình chung thành công!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                console.log(id)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Thay thế giáo trình chung không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}