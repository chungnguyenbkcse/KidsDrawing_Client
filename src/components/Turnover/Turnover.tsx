import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IUserRegisterJoinSemesterState, IStateType } from "../../store/models/root.interface";
import { ChartBar } from "../../common/components/ChartBar";
import TurnoverList from "./TurnoverList";
import { getUserRegisterJoinSemester } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemester";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getSemesterCourse } from "../../common/service/SemesterCourse/GetSemesterCourse";
import { getStudent } from "../../common/service/Student/GetStudent";
import { getParent } from "../../common/service/Parent/GetParent";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";

const Turnover: React.FC = () => {
  const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
  const totalPrice: number = userRegisterJoinSemesters.userRegisterJoinSemesters.reduce((prev, next) => prev + ((next.price) || 0), 0);

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Doanh thu", ""));

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
          dispatch(getUserRegisterJoinSemester())
          dispatch(getCourse())
          dispatch(getSemesterCourse())
          dispatch(getStudent())
          dispatch(getParent())
        }
      }
      else {
        dispatch(getUserRegisterJoinSemester())
        dispatch(getCourse())
        dispatch(getSemesterCourse())
        dispatch(getStudent())
        dispatch(getParent())
      }
    }
  }, [dispatch])



  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Doanh thu</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="DOANH THU" text={`$${totalPrice}`} icon="dollar-sign" class="success" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <ChartBar />
        </div>
      </div>

      <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách giao dịch</h6>
            </div>
            <div className="card-body">
              <TurnoverList />
            </div>
          </div>

        </div>

      </div>

    </Fragment>
  );
};

export default Turnover;
