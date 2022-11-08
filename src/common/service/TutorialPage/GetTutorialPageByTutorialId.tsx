import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeTutorialPageAll, initialTutorialPage, addTutorialPage } from "../../../store/actions/tutorial_page.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface TutorialPage {
    id: any;
    tutorial_id: number;
    name: string;
    description: string;
    number: number;
}
export function getTutorialPageByTutorialId(id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/tutorial-page/tutorial/${id}`, {
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
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(getTutorialPageByTutorialId(id))
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
                dispatch(fetchDataSuccess(data))
                dispatch(removeTutorialPageAll())
                //console.log(data.body.lessons)
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