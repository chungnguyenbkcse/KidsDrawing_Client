import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSemesterAll, initialSemester, addSemester } from "../../../store/actions/semester.actions";
import { ISemester } from "../../../store/models/semester.interface";
interface semester {
    id: number;
    number: number;
    year: number;
    name: string;
    creator_id: number;
    description: string;
    start_time: string;
    create_time: string;
    update_time: string;
}
export function getSemester() {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                "http://localhost:8080/api/v1/semester", {
                    method: "GET",
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true'
                    }
                }
            )
            .then( response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeSemesterAll())
                console.log(data.body.semesters)
                data.body.semesters.map((ele: semester, index: any) => {
                    console.log(ele)
                    if (index === 0){
                        return dispatch(initialSemester(ele));
                    }
                    else{
                        return dispatch(addSemester(ele))
                    }
                })
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}