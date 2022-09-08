import { toast } from "react-toastify";
import { fetchDataRequest } from "../../../store/actions/art_level.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getArtLevel } from "./GetArtLevel";

export function postArtLevel(data: any, idx: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/art-level`, {
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
                        dispatch(postArtLevel(data, idx))
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
                toast.update(idx, { render: "Thêm trình độ thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch(getArtLevel(dispatch))
            })
            .catch(error => {
                toast.update(idx, { render: "Thêm trình độ không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}