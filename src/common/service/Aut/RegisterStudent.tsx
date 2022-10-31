import { toast } from 'react-toastify';

export function postRegisterStudent(data: any, id: any) {
    
    return (dispatch: any) => {
        fetch(
            `${process.env.REACT_APP_API_URL}/registration`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        }
        )
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(data => {

                toast.update(id, { render: "Đăng ký thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });           
            })
            .catch(error => {
                toast.update(id, { render: "Đăng ký không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
    };
}