import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IAnonymousNotificationState, IScheduleTimeClassState, IStateType} from "../../store/models/root.interface";
import { logout } from "../../store/actions/account.actions";
import jwt_decode from "jwt-decode";
import { setModificationStateAnonymousNotification } from "../../store/actions/anonymous_notification.action";
import { AnonymousNotificationModificationStatus } from "../../store/models/anonymous_notification.interface";
import NotificationForm from "./NotificationForm";
import Popup from "reactjs-popup";
import { ToastContainer } from "react-toastify";
import { getScheduleTimeClass } from "../../common/service/ScheduleTimeClass/GetScheduleTimeClass";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";

import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Loading from "../../common/components/Loading";
import { getTotalMoney } from "../../common/service/UserRegisterJoinSemester/GetTotalMoney";
import { getTotalTeacher } from "../../common/service/Teacher/GetTotalTeacher";
import { getTotalParent } from "../../common/service/Parent/GetTotalParent";
import { getTotalStudent } from "../../common/service/Student/GetTotalStudent";
import { getTotalCourse } from "../../common/service/Course/GetTotalCourse";
import { getTotalContest } from "../../common/service/Contest/GetTotalContest";





const Home: React.FC = () => {
  const { promiseInProgress } = usePromiseTracker();

  const [popup1, setPopup1] = useState(false);

  function onAnonymousNotificationRemove() {
    setPopup1(true);
  }

  function onRemovePopup1(value: boolean) {
    setPopup1(false);
  }

  const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);

  var id_x = localStorage.getItem('total_student');
  let  numberStudentsCount: number = 0;

  if (id_x !== null) {
    numberStudentsCount = parseInt(id_x)
  }

  var id_y = localStorage.getItem('total_parent');
  let  numberParentsCount: number = 0;

  if (id_y !== null) {
    numberParentsCount = parseInt(id_y)
  }

  var id_z = localStorage.getItem('total_teacher');
  let  numberTeachersCount: number = 0;

  if (id_z !== null) {
    numberTeachersCount = parseInt(id_z)
  }

  var id_k = localStorage.getItem('total_course');
  let  numberCoursesCount: number = 0;

  if (id_k !== null) {
    numberCoursesCount = parseInt(id_k)
  }

  var id_l = localStorage.getItem('total_contest');
  let  numberContestsCount: number = 0;

  if (id_l !== null) {
    numberContestsCount = parseInt(id_l)
  }

  var id_m = localStorage.getItem('total_money');
  let  total_money: number = 0;

  if (id_m !== null) {
    total_money = parseFloat(id_m)
  }
  


  const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
  console.log(schedule_time_classes)

  let data: object[] = []

  schedule_time_classes.schedule_time_classes.map((ele, index) => {
    if (ele !== undefined && ele != null) {
      return data.push({
        Id: index,
        Subject: ele.class_name !== undefined && ele.class_name !== null ? ele.class_name : "",
        StartTime: new Date(ele.start_time),
        EndTime: new Date(ele.end_time),
        IsAllDay: false
      })
    }
    return 1
  })

  console.log(data)

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trang chủ", ""));

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
          trackPromise(getTotalMoney(dispatch))
          trackPromise(getTotalTeacher(dispatch))
          trackPromise(getTotalParent(dispatch))
          trackPromise(getTotalStudent(dispatch))
          trackPromise(getTotalCourse(dispatch))
          trackPromise(getTotalContest(dispatch))
          trackPromise(getScheduleTimeClass(dispatch))
        }
      }
      else {
        trackPromise(getTotalMoney(dispatch))
        trackPromise(getTotalTeacher(dispatch))
        trackPromise(getTotalParent(dispatch))
        trackPromise(getTotalStudent(dispatch))
        trackPromise(getTotalCourse(dispatch))
        trackPromise(getTotalContest(dispatch))
        trackPromise(getScheduleTimeClass(dispatch))
      }
    }
  }, [dispatch, access_token, refresh_token])

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
        <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>

        <div className="row">
          <TopCard title="KHÓA HỌC" text={`${numberCoursesCount}`} icon="book" class="primary" />
          <TopCard title="CUỘC THI" text={`${numberContestsCount}`} icon="book" class="danger" />
          <TopCard title="DOANH THU" text={`$${total_money}`} icon="dollar-sign" class="success" />
        </div>

        <div className="row">
          <TopCard title="HỌC VIÊN" text={`${numberStudentsCount}`} icon="user" class="primary" />
          <TopCard title="GIÁO VIÊN" text={`${numberTeachersCount}`} icon="user" class="danger" />
          <TopCard title="PHỤ HUYNH" text={`${numberParentsCount}`} icon="user" class="danger" />
        </div>

        <div className="row">
          <div className="col-xl-6 col-md-4 mb-4">
            <button
              className="btn btn-success btn-green"
              onClick={() => {
                dispatch(setModificationStateAnonymousNotification(AnonymousNotificationModificationStatus.Create))
                onAnonymousNotificationRemove()
              }}
            >
              <i className="fas fa fa-plus"></i>
              Gửi thông báo
            </button>
          </div>
        </div>

        <Popup
          open={popup1}
          onClose={() => setPopup1(false)}
          closeOnDocumentClick
        >
          <>
            {
              function () {
                if ((anonymous_notifications.modificationState === AnonymousNotificationModificationStatus.Create)) {
                  return <NotificationForm isCheck={onRemovePopup1} />
                }
              }()
            }
          </>
        </Popup>


        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">Lịch học chi tiết</h6>
              </div>
              <div className="card-body">
              <ScheduleComponent height='550px' currentView="Month" showQuickInfo={false} selectedDate={new Date()} eventSettings={{
                          dataSource: data
                        }}>

                            <ViewsDirective>
                                <ViewDirective option='Day'/>
                                <ViewDirective option='Week'/>
                                <ViewDirective option='Month'/>
                            </ViewsDirective>
                          <Inject services={[Day, Week, Month]}/>
                        </ScheduleComponent>;
              </div>
            </div>
          </div>
        </div>

      </Fragment>
  );
}

export default Home;
