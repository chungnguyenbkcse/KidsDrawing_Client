import { toast } from "react-toastify";
import { fetchDataSuccess, fetchDataError, removeTutorialPageAll, initialTutorialPage, addTutorialPage } from "../../../store/actions/tutorial_page.action";
import { ITutorialPage } from "../../../store/models/tutorial_page.interface";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getTutorialPageByTemplate } from "./GetTutorialPageByTemplate";
import { postTutorialPage } from "./PostTutorialPage";
import { postTutorialPageToast } from "./PostTutorialPageToast";
interface TutorialPage {
    id: any;
    section_id: number;
    name: string;
    description: string;
    number: number;
}
export function deleteTutorialPageBySection1(dispatch: any, id: any, idx: any, foo: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-page/section/${id}`, {
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
                        dispatch(deleteTutorialPageBySection1(dispatch, id, idx, foo))
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
                foo()
                toast.update(idx, { render: "Yêu cầu chỉnh giáo án được gửi không thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                localStorage.setItem('is_tutorial_page', 'not');
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}