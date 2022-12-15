import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { ICourseReportState, IRootPageStateType, IScheduleTimeClassState, IStateType, IUserState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getTotalCourseForStudent } from "../../common/service/Course/GetTotalCourseForStudent";
import { getTotalContestForStudent } from "../../common/service/Contest/GetTotalContestForStudent";
import History from "./History";
import { getReportUserRegisterJoinSemesterByStudent } from "../../common/service/UserRegisterJoinSemester/GetReportUserRegisterJoinSemesterByStudent";
import TextInput from "../../common/components/TextInput";
import SelectInput from "../../common/components/Select";
import { IUser } from "../../store/models/user.interface";
import { getUserById } from "../../common/service/User/GetUserById";
import { useHistory } from "react-router-dom";


const ViewDetailStudentForAdmin: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    let total_contest_student: number = 0;
    let total_course_student: number = 0;
    var id_x = localStorage.getItem('student_id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('total_contest_student');
    if (id_y !== null) {
        total_contest_student = parseInt(id_y)
    }

    var id_z = localStorage.getItem('total_course_student');
    if (id_z !== null) {
        total_course_student = parseInt(id_z)
    }

    const course_reports: ICourseReportState = useSelector((state: IStateType) => state.course_reports);

    let data_list: number[] = []
    let data_name_list: string[] = []
    if (course_reports.course_reports.length > 0) {
        course_reports.course_reports.map(ele => {
            data_list.push(ele.total_register)
            data_name_list.push(ele.name)
            return ele
        })
    }

    let users: IUserState = useSelector((state: IStateType) => state.users);
    let user: IUser | null = users.teachers.length > 0 ? users.teachers[0]: null;
    
    if (!user) {
        user = { id: 0, username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0, parent: "", student_ids: [], student_names: [] }
    }


    const src = user.profile_image_url;

    const [preview, setPreview] = useState(src)

    const data = {
        labels: data_name_list,
        datasets: [
            {
                label: '# of Votes',
                data: data_list,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    console.log(schedule_time_classes.schedule_time_classes)

    const { promiseInProgress } = usePromiseTracker();

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined) {
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time) {
                if (exp_refresh_token_decode < now_time) {
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getTotalContestForStudent(dispatch, id))
                    trackPromise(getTotalCourseForStudent(dispatch, id))
                    trackPromise(getUserById(dispatch, id))
                    trackPromise(getReportUserRegisterJoinSemesterByStudent(dispatch, id))
                }
            }
            else {
                trackPromise(getTotalContestForStudent(dispatch, id))
                trackPromise(getTotalCourseForStudent(dispatch, id))
                trackPromise(getUserById(dispatch, id))
                trackPromise(getReportUserRegisterJoinSemesterByStudent(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Thống kê", ""));
    }, [path.area, dispatch]);

    const [checked, setChecked] = useState(true);

    const history = useHistory();
    function handleViewParent() {
        localStorage.removeItem("parent_id");
        localStorage.setItem("parent_id", user != null ? user.parents.toString() : "")
        let path = '/parent/detail';
        history.push({
            pathname: path
        });
    }

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
                {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

                <div className="row">
                    <TopCard title="KHÓA HỌC ĐÃ ĐƯỢC XẾP LỚP" text={`${total_course_student}`} icon="book" class="primary" />
                    <TopCard title="CUỘC THI" text={`${total_contest_student}`} icon="book" class="primary" />
                </div>

                <div className="row">
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked === false) {
                                setChecked(true)
                            }
                        }} style={{
                            color: checked ? "#F24E1E" : "#2F4F4F"
                        }}>Thông tin chung</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                    <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked === true) {
                                setChecked(false)
                            }
                        }}
                            style={{
                                color: checked ? "#2F4F4F" : "#F24E1E"
                            }}>Lịch sử mua</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "30%",
                            backgroundColor: checked ? "#ffffff" : "#F24E1E"
                        }}></div>
                    </div>
                </div>

                {

                    function () {
                        if (checked === true) {
                            return (
                                <div className="row text-left">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-4">
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            Avatar
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <img src={preview} alt="Preview" id="avatar" />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_username"
                                                                field="username"
                                                                value={""}
                                                                onChange={() => {}}
                                                                required={true}
                                                                maxLength={100}
                                                                label="Tên đăng nhập"
                                                                placeholder={user.username} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_email"
                                                                field="email"
                                                                value={""}
                                                                onChange={() => {}}
                                                                required={true}
                                                                maxLength={200}
                                                                label="Email"
                                                                placeholder={user.email} />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_firstName"
                                                                field="firstName"
                                                                value={""}
                                                                onChange={() => {}}
                                                                required={false}
                                                                maxLength={100}
                                                                label="Họ"
                                                                placeholder={user.firstName} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_lastName"
                                                                field="lastName"
                                                                value={""}
                                                                onChange={() => {}}
                                                                required={false}
                                                                maxLength={200}
                                                                label="Tên"
                                                                placeholder={user.lastName} />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            
                                                            <TextInput id="input_category"
                                                                field="sex"
                                                                label="Giới tính"
                                                                value={""}
                                                                onChange={() => {}}
                                                                required={false}
                                                                maxLength={200}
                                                                placeholder={user.sex} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_phone"
                                                                field="phone"
                                                                value={""}
                                                                onChange={() => {}}
                                                                required={false}
                                                                maxLength={200}
                                                                label="Số điện thoại"
                                                                placeholder={user.phone} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <TextInput id="input_address"
                                                            field="address"
                                                            value={""}
                                                            onChange={() => {}}
                                                            required={false}
                                                            maxLength={200}
                                                            label="Địa chỉ"
                                                            placeholder={user.address} />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_dateOfBirth"
                                                                field="dateOfBirth"
                                                                value={""}
                                                                onChange={() => {}}
                                                                type="date"
                                                                required={false}
                                                                maxLength={200}
                                                                label="Ngày sinh"
                                                                placeholder={user.dateOfBirth} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="parent">Phụ huynh</label>
                                                            <p className="ml-4" style={{cursor: "pointer", color: 'blue'}} onClick={() => {handleViewParent()}}>
                                                                {user.parent != undefined ? user.parent : ""}
                                                            </p>
                                                            
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 mb-4">
                                        <h3 className=" mb-2" id="level-teacher">Lịch sử mua</h3>
                                        <div className="card shadow mb-4">
                                            <div className="card-body">
                                                <History />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }
            </Fragment>
    );
};

export default ViewDetailStudentForAdmin;
