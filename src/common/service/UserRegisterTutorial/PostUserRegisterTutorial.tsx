import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/tutorial.action";
import { ITutorialPage } from "../../../store/models/tutorial_page.interface";
import { postRefreshToken } from "../Aut/RefreshToken";
import { postUserRegisterTutorialPage } from "../UserRegisterTutorialPage/PostUserRegisterTutorialPage";
import { postUserRegisterTutorialPageToast } from "../UserRegisterTutorialPage/PostUserRegisterTutorialPageToast";


export function postUserRegisterTutorial(tutorial: any[], data: any, idx: any, routeHome: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-tutorial`, {
                    method: "POST",
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
                        dispatch(postUserRegisterTutorial(tutorial, data, idx, routeHome))
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
                console.log(data)
                var total = tutorial.length;
                console.log(total)
                tutorial.map((value: any, index: any) => {
                    if (index === total - 1){
                        routeHome()
                        return dispatch(postUserRegisterTutorialPageToast({
                            user_register_tutorial_id: data.id,
                            name: data.name,
                            description: value.description,
                            number: value.number
                        }, idx))
                    }
                    return dispatch(postUserRegisterTutorialPage({
                        user_register_tutorial_id: data.id,
                        name: data.name,
                        description: value.description,
                        number: value.number
                    }))
                })
            })
            .catch(error => {
                toast.update(idx, { render: "Yêu cầu chỉnh giáo án được gửi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}