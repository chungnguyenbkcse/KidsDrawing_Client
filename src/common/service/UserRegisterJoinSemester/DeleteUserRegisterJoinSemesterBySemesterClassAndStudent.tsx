import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";

export function deleteUserRegisterJoinSemesterBySemesterClassAndStudent(semester_class_id: number, student_id: number, idx: any, routeChange: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester/semester_class-student/${semester_class_id}/${student_id}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_LOCAL}`,
                        'Access-Control-Allow-Credentials': 'true'
                    }
                }
            )
            .then( response => {
                if (!response.ok) {
                    if (response.status === 403) {
                        dispatch(postRefreshToken())
                        dispatch(deleteUserRegisterJoinSemesterBySemesterClassAndStudent(semester_class_id, student_id, idx, routeChange))
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
                toast.update(idx, { render: "Hủy đăng kí thành công!", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                setTimeout(function () {
                    routeChange();
                }, 2000); 
            
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Hủy đăng kí không thành công!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                console.log("error")
            });
    };
}