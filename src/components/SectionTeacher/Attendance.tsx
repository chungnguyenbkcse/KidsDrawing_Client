import React, { Dispatch, Fragment, useEffect } from "react";
import TopCard from "../../common/components/TopCardUser";
import "./Attendance.css"

import { ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import AttendanceList from "./AttendanceList";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getAttendanceBySection } from "../../common/service/Attendance/GetAttendanceBySection";
import { IAttendanceState, IStateType } from "../../store/models/root.interface";

const Attendance: React.FC = () => {
  const { promiseInProgress } = usePromiseTracker();

  const dispatch: Dispatch<any> = useDispatch();
  const attendances: IAttendanceState = useSelector((state: IStateType) => state.attendances);

  var id_x = localStorage.getItem('section_id');
  var section_id: number = 0;
  if (id_x !== null) {
    section_id = parseInt(id_x);
  }

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
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    localStorage.removeItem('contest_id')
                    localStorage.removeItem('schedule_id')
                    dispatch(logout())
                }
                else {
                    trackPromise(getAttendanceBySection(dispatch, section_id))
                }
            }
            else {
              trackPromise(getAttendanceBySection(dispatch, section_id))
            }
        }
        dispatch(updateCurrentPath("Điểm danh", ""));
    }, [dispatch, access_token, refresh_token, section_id]);

  return (
    promiseInProgress ?
      <div className="loader"></div> : <Fragment>
        {/* <h1 className="h3 mb-2 text-gray-800" id="home-teacher">Trang chủ</h1> */}
        {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
        <ToastContainer />
        <div className="row">
          <TopCard title="HỌC SINH" text={`${attendances.attendances.length}`} icon="book" class="primary" />
          <TopCard title="HỌC SINH THAM GIA" text={`${attendances.attendances.filter((ele) => ele.status === true).length}`} icon="book" class="primary" />
          {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
        </div>


        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4" id="topcard-user">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green" id="level-teacher">Danh sách học sinh</h6>
              </div>
              <div className="card-body">
                <AttendanceList />
              </div>
            </div>
          </div>
        </div>



      </Fragment>
  );
};

export default Attendance;
