import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/semester.actions";
import { postRefreshToken } from "../Aut/RefreshToken";

export function deleteUserRegisterTeachSemesterBySemesterClassAndTeacher(semester_class_id: number, teacher_id: number, idx: any, routeHome: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/teacher-teach-semester/semester-class/teacher/${semester_class_id}/${teacher_id}`, {
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
                        dispatch(deleteUserRegisterTeachSemesterBySemesterClassAndTeacher(semester_class_id, teacher_id, idx, routeHome))
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
                toast.update(idx, { render: "Hủy đăng kí thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 }); 
                setTimeout(() => {
                    routeHome()
                }, 2000)        
            })
            .catch(error => {
                toast.update(idx, { render: "Hủy đăng kí không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 }); 
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}