import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_age.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getArtAge } from "./GetArtAge";

export function putArtAge(id: any, data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/art-age/${id}`, {
                    method: "PUT",
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
                        dispatch(putArtAge(id, data, idx))
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
                console.log(data)
                console.log(id)
                toast.update(idx, { render: "Chỉnh độ tuổi thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
                dispatch(getArtAge(dispatch))
            })
            .catch(error => {
                toast.update(idx, { render: "Chỉnh độ tuổi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}