import React, { Fragment, Dispatch, useEffect } from "react";
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

const RequestConfirmLevel: React.FC = () => {
  const teacher_register_quantifications: ITeacherRegisterQuantificationState = useSelector((state: IStateType) => state.teacher_register_quantifications);
  const numberItemsCount: number = teacher_register_quantifications.not_approved_now.length;

  var id_x = localStorage.getItem('teacher_id');
  let teacher_id: any = "";
  if (id_x !== null){
    teacher_id = id_x
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
          localStorage.removeItem('role_privilege')
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
      <h1 className="h3 mb-2 text-gray-800">Yêu cầu xác nhận trình độ</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}
      <ToastContainer />
      <div className="row">
        <TopCard title="SỐ YÊU CẦU" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách yêu cầu</h6>
            </div>
            <div className="card-body">
              <RequestConfirmLevelList />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default RequestConfirmLevel;
