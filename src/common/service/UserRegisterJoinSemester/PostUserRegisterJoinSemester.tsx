import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/user_register_join_semester.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { getUserRegisterJoinSemesterByPayer } from "./GetUserRegisterJoinSemesterByPayer";
import { getUserRegisterJoinSemesterByStudent } from "./GetUserRegisterJoinSemesterStudent";

export function postUserRegisterJoinSemester(data: any, idx: any, routeHome: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var role_privilege = localStorage.getItem('role_privilege')
    var rolePrivilege: string[] = []
    var roleUser: string = ""
    if (role_privilege !== null) {
        rolePrivilege = role_privilege.split(',')
        roleUser = rolePrivilege[0]
    }

    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-semester`, {
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
                        dispatch(postUserRegisterJoinSemester(data, idx, routeHome))
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
                if (roleUser === "PARENT_USER") {
                    getUserRegisterJoinSemesterByPayer(dispatch, id)
                }
                else if (roleUser === "STUDENT_USER") {
                    getUserRegisterJoinSemesterByStudent(dispatch, id)
                }
                
                setTimeout(() => {
                    routeHome()
                }, 2000)
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Đăng kí không thành công vì trùng lịch!", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}