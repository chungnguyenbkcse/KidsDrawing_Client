import { postRefreshToken } from "../Aut/RefreshToken";

export function postImage(data: any) {
    return (dispatch: any) => {
        fetch(
                `${process.env.REACT_APP_API_URL}/cloudinary/gifs`, {
                    method: "POST",
                    body: data
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(postImage(data))
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
                console.log(data)
                return data
            })
            .catch(error => {
                console.log("error")
            });
    };
}