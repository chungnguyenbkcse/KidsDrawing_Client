import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IContestState, ICourseState, IStateType, IUserRegisterJoinSemesterState, IUserState } from "../../store/models/root.interface";
import { IOrder } from "../../store/models/order.interface";
import { ChartBar } from "../../common/components/ChartBar";
import CourseMaxSign from "./CourseMaxSign";
import CourseMinSign from "./CourseMinSign";
import { getTeacher } from "../../common/service/Teacher/GetTeacher";
import { getCourse } from "../../common/service/Course/GetCourse";
import { getContest } from "../../common/service/Contest/GetContest";
import { getStudent } from "../../common/service/Student/GetStudent";
import { getUserRegisterJoinSemester } from "../../common/service/UserRegisterJoinSemester/GetUserRegisterJoinSemester";
import { getParent } from "../../common/service/Parent/GetParent";

const Home: React.FC = () => {
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const totalCourseAmount: number =courses.courses.length;

  const userRegisterJoinSemesters: IUserRegisterJoinSemesterState = useSelector((state: IStateType) => state.user_register_join_semesters);
  const totalPrice: number = userRegisterJoinSemesters.userRegisterJoinSemesters.reduce((prev, next) => prev + ((next.price) || 0), 0);
  //const numberItemsCount: number =courses.courses.length;
  //const totalPrice: number =courses.courses.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);
  const contests: IContestState = useSelector((state: IStateType) => state.contests);
  const totalContestAmount: number =contests.contests.length;

  const users: IUserState = useSelector((state: IStateType) => state.users);
  const numberStudentsCount: number = users.students.length;
  const numberTeachersCount: number = users.teachers.length;
  const numberParentsCount: number = users.parents.length;

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trang chủ", ""));

  useEffect(() => {
    dispatch(getUserRegisterJoinSemester())
    dispatch(getTeacher())
    dispatch(getCourse())
    dispatch(getContest())
    dispatch(getStudent())
    dispatch(getParent())
  }, [dispatch])

  return (
    <Fragment>
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
      <div className="col-xl-12 col-lg-12">
        <ChartBar />
      </div>
      </div>

      <div className="row">

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

      </div>

    </Fragment>
  );
};

export default Home;
