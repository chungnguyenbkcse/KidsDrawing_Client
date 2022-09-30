import { addInformationClass, removeInformationClassAll } from "../../../store/actions/information_class.action";
import { fetchDataSuccess, fetchDataError } from "../../../store/actions/my_class.action";
import { addTimeSchedule, removeTimeScheduleAll } from "../../../store/actions/time_schedule.action";
import { addStudent, removeStudentAll } from "../../../store/actions/users.action";
import { postRefreshToken } from "../Aut/RefreshToken";
interface MyClass {
    id: "",
    name: string;
    teacher: string;
    security_code: string;
    course: string;
    art_age: string;
    art_type: string;
    art_level: string;
    number_section: number;
    number_student: number;
}

interface user {
    id: string,
    username: string,
    email: string,
    password: string,
    status: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    profile_image_url: string,
    sex: string,
    phone: string,
    address: string,
    parents: string,
    createTime: string
}
export function getInfoMyClass(dispatch: any, id: any) {
    var bearer = 'Bearer ' + localStorage.getItem("access_token");
    return  fetch(
                `${process.env.REACT_APP_API_URL}/classes/info/${id}`, {
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
                        dispatch(getInfoMyClass(dispatch, id))
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
                dispatch(removeStudentAll())
                console.log(data.body.students)
                data.body.students.map((ele: any, index: any) => {
                    var user: user = {
                        id: ele.id,
                        username: ele.username,
                        email: ele.email,
                        status: ele.status,
                        password: "",
                        firstName: ele.firstName,
                        lastName: ele.lastName,
                        dateOfBirth: ele.dateOfBirth,
                        profile_image_url: ele.profile_image_url,
                        sex: ele.sex,
                        phone: ele.phone,
                        address: ele.address,
                        parents: ele.parents,
                        createTime: ele.createTime
                    }
                    //console.log(strDate.substring(0, 16))
                    return dispatch(addStudent(user))
                })
                console.log(data.body.classes.security_code)
                dispatch(removeInformationClassAll())
                let information_class: MyClass = {
                    id: "",
                    name: data.body.classes.name,
                    teacher: data.body.teacher.username,
                    security_code: data.body.classes.security_code,
                    course: data.body.course.name,
                    art_age: data.body.art_age.name,
                    art_level: data.body.art_level.name,
                    art_type: data.body.art_type.name,
                    number_section: data.body.course.num_of_section,
                    number_student: data.body.students.length
                }

                dispatch(removeTimeScheduleAll())
                data.body.lesson_time.map((ele: any, index: any) => {
                    let x = Object.values(ele)
                    return x.map((ele_1: any) => {
                        return ele_1.map((ele_2: any) => {
                            //console.log(ele_2)
                            if (ele_2.length !== 0){
                                dispatch(addTimeSchedule({start_time: ele_2[0], end_time: ele_2[1]}))
                            }
                            return ele_2
                        })
                    })
                })

                dispatch(addInformationClass(information_class))

            })
            .catch(error => {
                dispatch(fetchDataError(error));
                console.log("error")
            });
}