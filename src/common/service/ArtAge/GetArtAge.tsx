import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeArtAgeAll, initialArtAge, addArtAge } from "../../../store/actions/art_age.action";
interface ArtAge {
    id: number;
    name: string;
    description: string;
}
export function getArtAge() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
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
                    throw Error(response.statusText);
                }
                return response.json()
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
    };
}