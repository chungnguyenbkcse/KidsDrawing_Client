import React, { Fragment, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IAnonymousNotificationState, IContestState, ICourseState, IScheduleTimeClassState, IStateType, IUserRegisterJoinSemesterState, IUserState } from "../../store/models/root.interface";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getContest } from "../../common/service/Contest/GetContest";
import { getStudent } from "../../common/service/Student/GetStudent";
import { getUserRegisterJoinSemester } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemester";
import { getParent } from "../../common/service/Parent/GetParent";
import { getSemesterClass } from "../../common/service/SemesterClass/GetSemesterClass";
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

const Home: React.FC = () => {
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const totalCourseAmount: number = courses.courses.length;

  const [popup1, setPopup1] = useState(false);

  function onAnonymousNotificationRemove() {
    setPopup1(true);
  }

  function onRemovePopup1(value: boolean) {
    setPopup1(false);
  }

  const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
  const totalPrice: number = userRegisterJoinSemesters.userRegisterJoinSemesters.reduce((prev, next) => prev + ((next.price) || 0), 0);
  //const numberItemsCount: number =courses.courses.length;
  //const totalPrice: number =courses.courses.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);
  const contests: IContestState = useSelector((state: IStateType) => state.contests);
  const anonymous_notifications: IAnonymousNotificationState | null = useSelector((state: IStateType) => state.anonymous_notifications);
  const totalContestAmount: number = contests.contests.length;

  const users: IUserState = useSelector((state: IStateType) => state.users);
  const numberStudentsCount: number = users.students.length;
  const numberTeachersCount: number = users.teachers.length;
  const numberParentsCount: number = users.parents.length;

  const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
  console.log(schedule_time_classes)

  let data: object[] = []

  schedule_time_classes.schedule_time_classes.map((ele, index) => {
        return data.push({
            Id: index,
            Subject: ele.class_name,
            StartTime: new Date(ele.start_time),
            EndTime: new Date(ele.end_time),
            IsAllDay: false
        })
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
          dispatch(getUserRegisterJoinSemester())
          dispatch(getSemesterClass())
          dispatch(getTeacher())
          dispatch(getCourse())
          dispatch(getContest())
          dispatch(getStudent())
          dispatch(getParent())
          dispatch(getScheduleTimeClass())
        }
      }
      else {
        dispatch(getUserRegisterJoinSemester())
        dispatch(getSemesterClass())
        dispatch(getTeacher())
        dispatch(getCourse())
        dispatch(getContest())
        dispatch(getStudent())
        dispatch(getParent())
        dispatch(getScheduleTimeClass())
      }
    }
  }, [dispatch, access_token, refresh_token])

  return (
    <Fragment>
      <ToastContainer />
      <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <TopCard title="KHÓA HỌC" text={`${totalCourseAmount}`} icon="book" class="primary" />
        <TopCard title="CUỘC THI" text={`${totalContestAmount}`} icon="book" class="danger" />
        <TopCard title="DOANH THU" text={`$${totalPrice}`} icon="dollar-sign" class="success" />
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
                            <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={{
                                dataSource: data, fields: {
                                    id: 'Id',
                                    subject: { name: 'Subject' },
                                    isAllDay: { name: 'IsAllDay' },
                                    startTime: { name: 'StartTime' },
                                    endTime: { name: 'EndTime' }
                                }
                            }}>

                                <ViewsDirective>
                                    <ViewDirective option='WorkWeek' startHour='07:00' endHour='22:00' />
                                    <ViewDirective option='Week' startHour='07:00' endHour='22:00' />
                                    <ViewDirective option='Month' showWeekend={false} />
                                </ViewsDirective>
                                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                            </ScheduleComponent>;
                        </div>
                    </div>
                </div>
            </div>

      {/* <div className="row">
        <div className="col-xl-12 col-lg-12">
          <ChartBar />
        </div>
      </div> */}

      {/* <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Top khóa học được yêu thích</h6>
            </div>
            <div className="card-body">
              <CourseMaxSign />
            </div>
          </div>

        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Top khóa học ít người đăng ký</h6>
            </div>
            <div className="card-body">
            <CourseMinSign />
            </div>
          </div>
        </div>

      </div> */}

    </Fragment>
  );
};

export default Home;
