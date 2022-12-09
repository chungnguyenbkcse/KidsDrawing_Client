import { toast } from "react-toastify";
import { fetchDataRequest, fetchDataError } from "../../../store/actions/contest.action";
import { postRefreshToken } from "../Aut/RefreshToken";
import { deleteUserGradeContestByContest } from "../UserGradeContest/DeleteUserGradeContestByContest";
import { postUserGradeContest } from "../UserGradeContest/PostUserGradeContest";
import { getContest } from "./GetContest";

export function putContest(id: any,data: any, valueTeacher: any[], idx: any, routeHome: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/contest/${id}`, {
                    method: "PUT",
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
                        dispatch(putContest(id,data, valueTeacher, idx, routeHome))
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
                console.log(id)
                dispatch(deleteUserGradeContestByContest(id));
                valueTeacher.map((value, index) =>  {
                    return dispatch(postUserGradeContest({
                        contest_id: id,
                        teacher_id: value.value,
                        number: index + 1
                    }))
                })
                toast.update(idx, { render: "Chỉnh cuộc thi thành công", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                setTimeout(function () {
                    routeHome(true);
                }, 2000);
                getContest(dispatch) 
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                toast.update(idx, { render: "Chỉnh cuộc thi không thành công", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, closeButton: true });
                console.log("error")
            });
    };
}