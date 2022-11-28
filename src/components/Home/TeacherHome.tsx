import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getUserById } from "../../common/service/User/GetUserById";
import { logout } from "../../store/actions/account.actions";
import { changeSelectedTeacherRegisterQuatificationApproved, setModificationState } from "../../store/actions/teacher_register_quantification.action";
import { IStateType, ITeacherRegisterQuantificationState, IUserState } from "../../store/models/root.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../../store/models/teacher_register_quantification.interface";
import "./TeacherHome.css"
import TeacherRegisterQuantificationList from "./TeacherLevelList";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { updateCurrentPath } from "../../store/actions/root.actions";

const TeacherHome: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const teacherRegisterQuantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const numberApprovedCount: number = teacherRegisterQuantifications.approveds.length;
    const numberNotApprovedNowCount: number = teacherRegisterQuantifications.not_approved_now.length;
    var id_x = localStorage.getItem('id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    const { promiseInProgress } = usePromiseTracker();

    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    useEffect(() => {
        if (access_token !== null && refresh_token !== null && access_token !== undefined && refresh_token !== undefined){
            let access_token_decode: any = jwt_decode(access_token)
            let refresh_token_decode: any = jwt_decode(refresh_token)
            let exp_access_token_decode = access_token_decode.exp;
            let exp_refresh_token_decode = refresh_token_decode.exp;
            let now_time = Date.now() / 1000;
            console.log(exp_access_token_decode)
            console.log(now_time)
            if (exp_access_token_decode < now_time){
                if (exp_refresh_token_decode < now_time){
                    localStorage.removeItem('access_token') // Authorization
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role_privilege')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getTeacherRegisterQuantificationByTeacherId(dispatch, id))
                    trackPromise(getUserById(dispatch, id))
                }
            }
            else {
                trackPromise(getTeacherRegisterQuantificationByTeacherId(dispatch, id))
                trackPromise(getUserById(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    function onTeacherRegisterQuantificationSelect(teacherRegisterQuantification: ITeacherRegisterQuantification): void {
        dispatch(changeSelectedTeacherRegisterQuatificationApproved(teacherRegisterQuantification));
        dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.None));
    }

    dispatch(updateCurrentPath("Trang chủ", ""));

    return (
        promiseInProgress ?
      <div className="row" id="search-box">
        <div className="col-xl-12 col-lg-12">
          <div className="input-group" id="search-content">
            <div className="form-outline">
              <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
            </div>
          </div>
        </div>
      </div> : <Fragment>
            {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
            {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

            <div className="row">
                <TopCard title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`${numberApprovedCount}`} icon="book" class="primary" />
                <TopCard title="TRÌNH ĐỘ CHƯA DUYỆT" text={`${numberNotApprovedNowCount}`} icon="book" class="danger" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Trình độ đã duyệt</h3>
                    <TeacherRegisterQuantificationList
                        onSelect={onTeacherRegisterQuantificationSelect}
                    />
                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <h3 className=" mb-2" id="level-teacher">Thông tin cá nhân</h3>
                    <div className="col-xl-12 col-md-12 mb-4">
                        <div className={`card shadow h-100 py-2`} id="topcard-user">
                            <div className="card-body">
                                <div className="row text-center text-center justify-content-center">
                                    <i className={`fas fa-user fa-10x`} id="icon-user"></i>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <h4 id="full-name">{users.teachers.length === 0 ? "" : (users.teachers[0].firstName + " "+ users.teachers[0].lastName)}</h4>
                                </div>
                                <div className="row no-gutters justify-content-center">
                                    <p id="username-teacher">{users.teachers.length === 0 ? "" : users.teachers[0].username}</p>
                                </div>
                                <div className="row no-gutters">
                                    <i className={`fas fa-phone fa-2x`} id="icon-phone"></i>
                                    <p id="phone">{users.teachers.length === 0 ? "" : users.teachers[0].phone}</p>
                                </div>

                                <div className="row no-gutters">
                                    <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                    <p id="phone">{users.teachers.length === 0 ? "" : users.teachers[0].email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default TeacherHome;
