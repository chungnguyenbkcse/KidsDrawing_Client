import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError, removeArtTypeAll, addArtType } from "../../../store/actions/art_type.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getArtType } from "./GetArtType";

export function postArtType(data: any, idx: any) {
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
                    throw Error(response.statusText);
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
                    toast.update(idx, { render: "Thêm thể loại thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
                    //dispatch(getArtType())
                    //postRefreshToken()
                    //postArtType(data)
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm thể loại không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}