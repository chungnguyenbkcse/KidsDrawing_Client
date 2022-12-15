import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { IChildState, IRootPageStateType, IStateType, IUserRegisterJoinSemesterState, IUserState } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { updateCurrentPath } from "../../store/actions/root.actions";
import History from "./History";
import { getInforChildByParent } from "../../common/service/Childs/GetInforChildByParent";
import ChildList from "./ChildList";
import { getReportRegisterJoinSemesterByPayer } from "../../common/service/UserRegisterJoinSemester/GetReportUserRegisterJoinSemesterByPayer";
import { getUserById } from "../../common/service/User/GetUserById";
import { IUser } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editArtLevel } from "../../store/actions/art_level.action";
import { useHistory } from "react-router-dom";


const ViewDetailParentForAdmin: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const childs: IChildState = useSelector((state: IStateType) => state.childs);
    const user_register_join_semesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
    const numberChildCount: number = childs.childs.length;
    const totalMoney: number = user_register_join_semesters.completed.reduce((prev, next) => prev + ((next.price * 1) || 0), 0);

    var id_x = localStorage.getItem('parent_id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
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
    const [checked, setChecked] = useState(true);

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
                    trackPromise(getInforChildByParent(dispatch, id))
                    trackPromise(getUserById(dispatch, id))
                    trackPromise(getReportRegisterJoinSemesterByPayer(dispatch, id))
                }
            }
            else {
                trackPromise(getInforChildByParent(dispatch, id))
                trackPromise(getUserById(dispatch, id))
                trackPromise(getReportRegisterJoinSemesterByPayer(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);

    useEffect(() => {
        dispatch(updateCurrentPath("Thống kê", ""));
    }, [path.area, dispatch]);

    const history = useHistory();
    function handleViewParent(student_id: number) {
        localStorage.removeItem("student_id");
        localStorage.setItem("student_id", student_id.toString())
        let path = '/student/detail';
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
                    <TopCard title="TÀI KHOẢN CON" text={`${numberChildCount}`} icon="user" class="primary" />
                    <TopCard title="SỐ TIỀN" text={`${totalMoney}`} icon="donate" class="primary" />
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
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="parent">Tài khoản con</label>
                                                            {
                                                                student_ids != null ? student_ids.map((ele, idx) => {
                                                                    return (
                                                                        <p className="ml-4" style={{ cursor: "pointer", color: 'blue' }} onClick={() => { handleViewParent(ele) }}>
                                                                            {student_names[idx]}
                                                                        </p>
                                                                    )
                                                                }) : ""
                                                                       
                                                            }
                                                            

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
                                        <h3 className=" mb-2" id="level-teacher">Danh sách lịch sử mua</h3>
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

export default ViewDetailParentForAdmin;
