import { toast } from 'react-toastify';
import { getInforChildByParent } from '../Childs/GetInforChildByParent';

export function postRegisterStudent(dispatch: any, data: any, idx: any) {
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }
    return  fetch(
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
                getInforChildByParent(dispatch, id)
                toast.update(idx, { render: "Đăng ký thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });           
            })
            .catch(error => {
                toast.update(idx, { render: "Đăng ký không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
            });
}