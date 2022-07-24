export function postImage(data: any) {
    return () => {
        fetch(
                `${process.env.REACT_APP_API_URL}/cloudinary/gifs`, {
                    method: "POST",
                    body: data
                }
            )
            .then( response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
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