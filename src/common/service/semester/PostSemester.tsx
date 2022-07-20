import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSemesterAll, initialSemester, addSemester, editSemester } from "../../../store/actions/semester.actions";
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
export function postSemester(data: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return (dispatch: any) => {
        dispatch(fetchDataRequest());
        fetch(
                `${process.env.REACT_APP_API_URL}/semester`, {
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                console.log(data)
                dispatch(fetchDataSuccess(data))
                dispatch(addSemester(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
    };
}