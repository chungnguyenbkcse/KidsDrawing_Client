import { fetchDataRequest, fetchDataSuccess, fetchDataError, removeSemesterAll, initialSemester, addSemester } from "../../../store/actions/semester.actions";
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
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then (data => {
                dispatch(fetchDataSuccess(data))
                dispatch(removeSemesterAll())
                //console.log(data.body.semesters)
                data.body.semesters.map((ele: any, index: any) => {
                    var strDate = ele.start_time;
                    var semester: semester = {
                        id: ele.id,
                        number: ele.number,
                        year: ele.year,
                        name: ele.name,
                        creator_id: ele.creator_id,
                        description: ele.description,
                        start_time: strDate.substring(0, 16),
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
    };
}