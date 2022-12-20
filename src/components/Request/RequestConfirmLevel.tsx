import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IStateType, ITeacherRegisterQuantificationState } from "../../store/models/root.interface";
import RequestConfirmLevelList from "./RequestConfirmLevelList";
import { getTeacherRegisterQuantificationByTeacherId } from "../../common/service/TeacherRegisterQuantification/GetTeacherRegisterQuantificationByTeacherId";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { getCourse } from "../../common/service/Course/GetCourse";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import RequestConfirmLevelApprovedList from "./RequestConfirmLevelApprovedList";

const RequestConfirmLevel: React.FC = () => {
  const teacher_register_quantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
  const numberItemsCount: number = teacher_register_quantifications.not_approved_now.length;

  var id_x = localStorage.getItem('teacher_id');
  let teacher_id: number = 0;
  if (id_x !== null) {
    teacher_id = parseInt(id_x)
  }

  const { promiseInProgress } = usePromiseTracker();

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu xác nhận trình độ", ""));

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
          trackPromise(getTeacherRegisterQuantificationByTeacherId(dispatch, teacher_id))
          trackPromise(getTeacher(dispatch))
          trackPromise(getCourse(dispatch))
        }
      }
      else {
        trackPromise(getTeacherRegisterQuantificationByTeacherId(dispatch, teacher_id))
        trackPromise(getTeacher(dispatch))
        trackPromise(getCourse(dispatch))
      }
    }
  }, [dispatch, teacher_id, access_token, refresh_token])

  const [checked, setChecked] = useState(true);

  return (
    promiseInProgress ?
      <div className="loader"></div> : <Fragment>
        <h1 className="h3 mb-2 text-gray-800">Yêu cầu xác nhận trình độ</h1>
        {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
        <ToastContainer />
        <div className="row">
          <TopCard title="CHƯA DUYỆT" text={`${numberItemsCount}`} icon="box" class="primary" />
          <TopCard title="ĐÃ DUYỆT" text={`${teacher_register_quantifications.approveds.length}`} icon="box" class="primary" />
        </div>

        <div className="row">
          <div className="col-xl-6 col-lg-6 mb-4 col-xs-6 text-center">
            <h6 className="m-0 font-weight-bold" id="btn-type" onClick={() => {
              if (checked === false) {
                setChecked(true)
              }
            }} style={{
              color: checked ? "#F24E1E" : "#2F4F4F"
            }}>Chưa duyệt</h6>
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
              }}>Đã duyệt</h6>
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
        <div className="row">

          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-body">
                <RequestConfirmLevelList />
              </div>
            </div>

          </div>

        </div>
      )
    }
    else {
      return (
        <div className="row">

          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-body">
                <RequestConfirmLevelApprovedList />
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

export default RequestConfirmLevel;
