import jwt_decode from "jwt-decode";
import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialPageAll, initialTutorialPage, addTutorialPage } from "../../../store/actions/tutorial_page.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TutorialPage {
    id: number;
    tutorial_id: number;
    name: string;
    description: string;
    number: number;
}
export function getTutorialPageBySection(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-page/section/${id}`, {
                    method: "GET",
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeTutorialPageAll())
                console.log(data.body.TutorialPage)
                data.body.TutorialPage.map((ele: any, index: any) => {
                    var tutorial_page: TutorialPage = {
                        id: ele.id,
                        tutorial_id: ele.tutorial_id,
                        name: ele.name,
                        description: ele.description,
                        number: ele.number
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialTutorialPage(tutorial_page));
                    }
                    else{
                        return dispatch(addTutorialPage(tutorial_page))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}