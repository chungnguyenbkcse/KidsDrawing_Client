import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/tutorial.action";
import { postTutorialPage } from "../TutorialPage/PostTutorialPage";
import { postTutorialPageToast } from "../TutorialPage/PostTutorialPageToast";

export function postTutorial(tutorial: any[], data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial`, {
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                console.log(data)
                var total = tutorial.length;
                console.log(total)
                tutorial.map((value, index) => {
                    if (index === total - 1){
                        return dispatch(postTutorialPageToast({
                            tutorial_id: data.id,
                            name: data.name,
                            description: value.content,
                            number: value.page
                        }, idx))
                    }
                    return dispatch(postTutorialPage({
                        tutorial_id: data.id,
                        name: data.name,
                        description: value.content,
                        number: value.page
                    }))
                })
            })
            .catch(error => {
                toast.update(idx, { render: "Yêu cầu chỉnh giáo án được gửi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}