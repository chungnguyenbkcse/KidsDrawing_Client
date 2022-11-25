import { fetchDataSuccess, fetchDataError, removeChildsClassAll, addChildsClass } from "../../../store/actions/childs_class.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface user {
    student_id: number,
    student_name: string,
    dateOfBirth: string,
    sex: string,
}
export function getChildsByContestAndParent(dispatch: any, contest_id: number, parent_id: number) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/user-register-join-contest/contest-parent/${contest_id}/${parent_id}`, {
                    method: "GET",
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
                        postRefreshToken()
                        getChildsByContestAndParent(dispatch, contest_id, parent_id)
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
                dispatch(fetchDataSuccess(data))
                dispatch(removeChildsClassAll())
                console.log(data.body.students)
                localStorage.removeItem('contest_submission_id')
                localStorage.removeItem('url_contest_submission')
                data.body.students.map ((ele: any) => {
                    var user: user = {
                        student_id: ele.student_id,
                        student_name: ele.student_name,
                        dateOfBirth: ele.dateOfBirth,
                        sex: ele.sex
                    }
                    return dispatch(addChildsClass(user));
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}