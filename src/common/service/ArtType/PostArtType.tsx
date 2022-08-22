import { fetchDataRequest, fetchDataError, removeArtTypeAll, addArtType } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getArtType } from "./GetArtType";

export function postArtType(data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/art-type`, {
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
                        dispatch(postArtType(data))
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    return response
                }
            })
            .then (xx => {
                    console.log(xx)
                    let art_type = {
                        id: data.id,
                        name: data.name,
                        description: data.description
                    }
                    dispatch(addArtType(art_type))
                    //dispatch(getArtType())
                    //postRefreshToken()
                    //postArtType(data)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}