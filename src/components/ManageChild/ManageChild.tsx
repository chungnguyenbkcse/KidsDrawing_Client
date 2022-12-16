import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IClassesStudentState, IContestTeacherState, IRootPageStateType, IStateType, IUserState } from "../../store/models/root.interface";
import "./ManageChild.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { getUserById } from "../../common/service/User/GetUserById";
import { getContestByStudent } from "../../common/service/Contest/GetContestByStudent";
import { getClassesStudent } from "../../common/service/ClassesStudent/GetClassesStudentByStudent";
import { getScheduleTimeByChild } from "../../common/service/ScheduleTimeClass/GetScheduleTimeByStudent";
import TopCard from "../../common/components/TopCard";
import ManageStudyChild from "./ManageStudyChild";
import ScheduleForChild from "./ScheduleForChild";
import { getFinalScoreChild } from "../../common/service/FinalScoreChild/GetFinalScoreChild";
import { getContestSubmissionByContest } from "../../common/service/ContestSubmission/GetContestSubmissionByContest";
import { getContestSubmissionByStudent } from "../../common/service/ContestSubmission/GetContestSubmissionByStudent";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IUser } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";


const ManageChild: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const [checked, setChecked] = useState<Boolean>(true);
    const classes_students: IClassesStudentState = useSelector((state: IStateType) => state.classes_students);
    const contest_teachers: IContestTeacherState = useSelector((state: IStateType) => state.contest_teachers);
    const numberApprovedCount: number = classes_students.classes_done.length + classes_students.classes_doing.length;
    const numberNotApprovedNowCount: number = contest_teachers.contest_end.length + contest_teachers.contest_not_open_now.length + contest_teachers.contest_opening.length;
    var id_x = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_x !== null) {
        student_id = parseInt(id_x);
    }

    let users: IUserState = useSelector((state: IStateType) => state.users);
    let user: IUser | null = users.teachers.length > 0 ? users.teachers[0] : null;
    let student_ids: number[] = []
    let student_names: string[] = []

    if (!user) {
        user = { id: 0, username: "", email: "", status: "", password: "", firstName: "", lastName: "", sex: "", phone: "", address: "", dateOfBirth: "", profile_image_url: "", createTime: "", parents: 0, parent: "", student_ids: [], student_names: [] }
    }
    else {
        student_ids = user.student_ids;
        student_names = user.student_names;
    }


    const src = user.profile_image_url;

    const [preview, setPreview] = useState(src)

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
                    trackPromise(getUserById(dispatch, student_id))
                    trackPromise(getScheduleTimeByChild(dispatch, student_id))
                    trackPromise(getContestByStudent(dispatch, student_id))
                    trackPromise(getClassesStudent(dispatch, student_id))
                    trackPromise(getContestSubmissionByStudent(dispatch, student_id))
                    trackPromise(getFinalScoreChild(dispatch, student_id))
                }
            }
            else {
                trackPromise(getUserById(dispatch, student_id))
                trackPromise(getScheduleTimeByChild(dispatch, student_id))
                trackPromise(getContestByStudent(dispatch, student_id))
                trackPromise(getClassesStudent(dispatch, student_id))
                trackPromise(getContestSubmissionByStudent(dispatch, student_id))
                trackPromise(getFinalScoreChild(dispatch, student_id))
            }
        }
    }, [dispatch, access_token, refresh_token, student_id]);

    var id_zx = localStorage.getItem('student_name');
    var student_name = "";
    if (id_zx !== null) {
        student_name = (id_zx);
    }

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Tài khoản con", student_name));
    }, [path.area, dispatch, student_name])
    localStorage.setItem('path', '/')

    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    return (
        promiseInProgress ?
            <div className="loader"></div> : <Fragment>
                <div className="row">
                    <TopCard title="KHÓA HỌC" text={`${numberApprovedCount}`} icon="book" class="primary" />
                    <TopCard title="CUỘC THI" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
                            if (checked1 === false) {
                                setChecked1(true)
                                setChecked2(false)
                                setChecked3(false)
                            }
                        }} style={{
                            color: checked1 ? "#F24E1E" : "#2F4F4F"
                        }}>Thông tin chung</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "50%",
                            backgroundColor: checked1 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked2 === false) {
                                setChecked2(true)
                                setChecked1(false)
                                setChecked3(false)
                            }
                        }}
                            style={{
                                color: checked2 ? "#F24E1E" : "#2F4F4F"
                            }}>Biểu đồ điểm</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "50%",
                            backgroundColor: checked2 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>

                    <div className="col-xl-4 col-lg-4 mb-4 col-xs-4 text-center">
                        <h6 className="m-0 font-weight-bold" id="btn-level" onClick={() => {
                            if (checked3 === false) {
                                setChecked3(true)
                                setChecked1(false)
                                setChecked2(false)
                            }
                        }}
                            style={{
                                color: checked3 ? "#F24E1E" : "#2F4F4F"
                            }}>Lịch học</h6>
                        <div style={{
                            height: "5px",
                            textAlign: "center",
                            margin: "auto",
                            width: "50%",
                            backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
                        }}></div>
                    </div>
                </div>

                {
                    function () {
                        if (checked1 === true) {
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
                                                                onChange={() => { }}
                                                                required={true}
                                                                maxLength={100}
                                                                label="Tên đăng nhập"
                                                                placeholder={user.username} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_email"
                                                                field="email"
                                                                value={""}
                                                                onChange={() => { }}
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
                                                                onChange={() => { }}
                                                                required={false}
                                                                maxLength={100}
                                                                label="Họ"
                                                                placeholder={user.firstName} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_lastName"
                                                                field="lastName"
                                                                value={""}
                                                                onChange={() => { }}
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
                                                                onChange={() => { }}
                                                                required={false}
                                                                maxLength={200}
                                                                placeholder={user.sex} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <TextInput id="input_phone"
                                                                field="phone"
                                                                value={""}
                                                                onChange={() => { }}
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
                                                            onChange={() => { }}
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
                                                                onChange={() => { }}
                                                                required={false}
                                                                maxLength={200}
                                                                label="Ngày sinh"
                                                                placeholder={user.dateOfBirth} />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else if (checked2 === true) {
                            return (
                                <ManageStudyChild />
                            )
                        }
                        else {
                            return (
                                <ScheduleForChild />
                            )
                        }
                    }()
                }

            </Fragment>
    );
};

export default ManageChild;
