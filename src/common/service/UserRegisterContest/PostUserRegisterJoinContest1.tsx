import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function postUserRegisterJoinContest1(data: any, idx: any, routeHome: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-contest`, {
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
                        dispatch(postUserRegisterJoinContest1(data, idx, routeHome))
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
                toast.update(idx, { render: "Đăng kí thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 }); 
                setTimeout(() => {
                    routeHome()
                }, 2000)
            })
            .catch(error => {
                toast.update(idx, { render: "Đăng kí không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 }); 
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}