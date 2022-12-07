import { fetchDataSuccess, fetchDataError, removeSemesterAll, initialSemester, addSemester } from "../../../store/actions/semester.actions";
import { postRefreshToken } from "../Aut/RefreshToken";
interface semester {
    id: any;
    number: number;
    year: number;
    name: string;
    description: string;
    start_time: string;
    checked_genaration: boolean;
    end_time: string;
    create_time: string;
    update_time: string;
}
export function getSemester(dispatch: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return fetch(
                `${process.env.REACT_APP_API_URL}/semester`, {
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
                        dispatch(postRefreshToken())
                        dispatch(getSemester(dispatch))
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
                dispatch(removeSemesterAll())
                //console.log(data.body.semesters)
                data.body.semesters.map((ele: any, index: any) => {
                    var strDate_1 = ele.start_time;
                    var strDate_2 = ele.end_time;
                    var semester: semester = {
                        id: ele.id,
                        number: ele.number,
                        year: ele.year,
                        checked_genaration: ele.checked_genaration,
                        name: ele.name,
                        description: ele.description,
                        start_time: strDate_1.substring(0, 16),
                        end_time: strDate_2.substring(0, 16),
                        create_time: ele.create_time,
                        update_time: ele.update_time,
                    }
                    //console.log(strDate.substring(0, 16))
                    if (index === 0){
                        return dispatch(initialSemester(semester));
                    }
                    else{
                        return dispatch(addSemester(semester))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}