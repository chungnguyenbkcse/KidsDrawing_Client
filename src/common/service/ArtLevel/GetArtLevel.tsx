import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeArtLevelAll, initialArtLevel, addArtLevel } from "../../../store/actions/art_level.action";
interface ArtLevel {
    id: number;
    name: string;
    description: string;
}
export function getArtLevel() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/art-level?page=0&size=5`, {
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
                dispatch(removeArtLevelAll())
                console.log(data.body.art_level)
                data.body.art_level.map((ele: any, index: any) => {
                    var artLevel: ArtLevel = {
                        id: ele.id,
                        name: ele.name,
                        description: ele.description
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialArtLevel(artLevel));
                    }
                    else{
                        return dispatch(addArtLevel(artLevel))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}