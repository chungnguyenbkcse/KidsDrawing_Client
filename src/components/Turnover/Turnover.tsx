import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IStateType, ITurnoverState, IReportUserState, ICourseReportState } from "../../store/models/root.interface";
import { ChartBar } from "../../common/components/ChartBar";
import TurnoverList from "./TurnoverList";
import { getUserRegisterJoinSemester } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemester";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import CourseAnalytis from "./CourseAnalytis";
import UserAnalytis from "./UserAnalytis";
import { getTurnOverReport } from "../../common/service/TurnOver/GetTurnoverReport";
import { getReportUser } from "../../common/service/ReportUser/GetUserReport";
import { getCourseReport } from "../../common/service/CourseReport/GetCourseReport";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

const Turnover: React.FC = () => {
  const turnovers: ITurnoverState = useSelector((state: IStateType) => state.turnovers);
  const report_users: IReportUserState = useSelector((state: IStateType) => state.report_users); 
  const course_reports: ICourseReportState = useSelector((state: IStateType) => state.course_reports); 

  const totalPrice: number = turnovers.turnover_now.reduce((prev, next) => prev + ((next.turnover) || 0), 0);
  const totalUserNew: number = report_users.report_users.reduce((prev, next) => prev + ((next.total) || 0), 0);
  const totalCourse: number = course_reports.course_reports.reduce((prev, next) => prev + ((next.total_register) || 0), 0);
  
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Doanh thu", ""));

  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

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
          localStorage.removeItem('role_privilege')
          localStorage.removeItem('id')
          localStorage.removeItem('contest_id')
          localStorage.removeItem('schedule_id')
          dispatch(logout())
        }
        else {
          trackPromise(getUserRegisterJoinSemester(dispatch))
          trackPromise(getTurnOverReport(dispatch))
          trackPromise(getReportUser(dispatch))
          trackPromise(getCourseReport(dispatch))
        }
      }
      else {
          trackPromise(getUserRegisterJoinSemester(dispatch))
          trackPromise(getTurnOverReport(dispatch))
          trackPromise(getReportUser(dispatch))
          trackPromise(getCourseReport(dispatch))
      }
    }
  }, [dispatch, access_token, refresh_token])

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septempber', 'October', 'November', 'December'];

  let now_data: number[] = [];
  let last_data: number[] = [];
  if (turnovers.turnover_now.length > 0 && turnovers.turnover_last.length > 0){
    turnovers.turnover_now.map(ele => {
      return now_data.push(ele.turnover)
    })

    turnovers.turnover_last.map(ele => {
      return last_data.push(ele.turnover)
    })
  }
  const currentYear = new Date().getFullYear();

  console.log(turnovers)

  const data = {
    labels,
    datasets: [
      {
        label: `Năm ${currentYear-1}`,
        data: last_data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `Năm ${currentYear}`,
        data: now_data,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };



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
      <h1 className="h3 mb-2 text-gray-800">Phân tích</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="DOANH THU" text={`$${totalPrice}`} icon="dollar-sign" class="success" />
        <TopCard title="KHÓA HỌC" text={`${totalCourse}`} icon="warehouse" class="success" />
        <TopCard title="NGƯỜI DÙNG MỚI" text={`${totalUserNew}`} icon="user" class="success" />
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
          }}>Doanh thu</h6>

          <div style={{
            height: "5px",
            textAlign: "center",
            margin: "auto",
            width: "30%",
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
            }}>Khóa học</h6>
          <div style={{
            height: "5px",
            textAlign: "center",
            margin: "auto",
            width: "30%",
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
            }}>Người dùng</h6>
          <div style={{
            height: "5px",
            textAlign: "center",
            margin: "auto",
            width: "30%",
            backgroundColor: checked3 ? "#F24E1E" : "#ffffff"
          }}></div>
        </div>
      </div>

      {
        function () {
          if (checked1 === true) {
            return (
              <Fragment>
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <ChartBar data={data} />
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
            )
          }
          else if (checked2 === true) {
            return (
              <Fragment>
                <div className="row">

                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Phân tích khóa học</h6>
                      </div>
                      <div className="card-body">
                        <CourseAnalytis />
                      </div>
                    </div>

                  </div>

                </div>
              </Fragment>
            )
          }
          else {
            return (
              <Fragment>
                <div className="row">

                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Phân tích giáo viên</h6>
                      </div>
                      <div className="card-body">
                        <UserAnalytis />
                      </div>
                    </div>

                  </div>

                </div>
              </Fragment>
            )
          }
        }()
      }

    </Fragment>
  );
};

export default Turnover;
