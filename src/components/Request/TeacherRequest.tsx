import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { ITeacherLeaveState, IStateType } from "../../store/models/root.interface";
import TeacherRequestList from "./TeacherRequestList";
import jwt_decode from "jwt-decode";
import { logout } from "../../store/actions/account.actions";
import { getTeacherLeave } from "../../common/service/TeacherLeave/GetTeacherLeave";
import { ToastContainer } from "react-toastify";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

const TeacherRequest: React.FC = () => {
  const teachers: ITeacherLeaveState = useSelector((state: IStateType) => state.teacher_leaves);
  const numberItemsCount: number = teachers.leaves.length;
  const { promiseInProgress } = usePromiseTracker();


  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Yêu cầu nghỉ dạy", ""));

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
                  trackPromise(getTeacherLeave(dispatch))
                }
            }
            else {
              trackPromise(getTeacherLeave(dispatch))
            }
        }
    }, [dispatch, access_token, refresh_token]);

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
      <ToastContainer />
      <h1 className="h3 mb-2 text-gray-800">Yêu cầu nghỉ dạy</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

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
              <TeacherRequestList />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default TeacherRequest;