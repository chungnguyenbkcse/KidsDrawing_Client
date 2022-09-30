import { fetchDataSuccess, fetchDataError, removeArtAgeAll, initialArtAge, addArtAge } from "../../../store/actions/art_age.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface ArtAge {
    id: string;
    name: string;
    description: string;
}
export function getArtAge(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/art-age?page=0&size=5`, {
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
                        dispatch(getArtAge(dispatch))
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
                dispatch(removeArtAgeAll())
                console.log(data.body.art_age)
                data.body.art_age.map((ele: any, index: any) => {
                    var artAge: ArtAge = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialArtAge(artAge));
                    }
                    else{
                        return dispatch(addArtAge(artAge))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}