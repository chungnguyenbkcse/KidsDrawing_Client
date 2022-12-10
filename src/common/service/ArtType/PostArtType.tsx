import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_type.action";
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
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postArtType(data,idx))
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
                toast.update(idx, { render: "Thêm thể loại thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                getArtType(dispatch)
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm thể loại không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}