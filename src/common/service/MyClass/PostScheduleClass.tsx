import { toast } from "react-toastify";

export function postScheduleClass(id: any, data: any, idx: any) {
    console.log("post ++")
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        fetch(
                `${process.env.REACT_APP_API_URL}/semester/schedule-class/${id}`, {
                    method: "POST",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            )
            .then( response => {
                if (response.status === 503) {
                    toast.update(idx, { render: "Xếp lớp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 100 });
                    return 1
                }
                if (!response.ok) {
                    if (response.status === 503) {
                        toast.update(idx, { render: "Xếp lớp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 100 });
                        return 1;
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                return response
            })
            .then (val => {
                console.log(val)
                toast.update(idx, { render: "Xếp lớp thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER });
            })
            .catch(error => {
                toast.update(idx, { render: "Xếp lớp không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER });
                console.log("error")
            });
    };
}