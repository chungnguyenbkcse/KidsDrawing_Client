import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCard from "../../common/components/TopCardUser";
import { logout } from "../../store/actions/account.actions";
import { ICourseReportState, IRootPageStateType, IScheduleTimeClassState, IStateType } from "../../store/models/root.interface";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { getTotalCourseForStudent } from "../../common/service/Course/GetTotalCourseForStudent";
import { getTotalContestForStudent } from "../../common/service/Contest/GetTotalContestForStudent";
import { DoughnutPieCharts } from "../../common/components/DoughnutPieCharts";


const ViewDetailStudentForAdmin: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const schedule_time_classes: IScheduleTimeClassState = useSelector((state: IStateType) => state.schedule_time_classes);
    let total_contest_student: number = 0;
    let total_course_student: number = 0;
    var id_x = localStorage.getItem('student_id');
    var id: number = 0;
    if (id_x !== null) {
        id = parseInt(id_x);
    }

    var id_y = localStorage.getItem('total_contest_student');
    if (id_y !== null) {
        total_contest_student = parseInt(id_y)
    }

    var id_z = localStorage.getItem('total_course_student');
    if (id_z !== null) {
        total_course_student = parseInt(id_z)
    }

    const course_reports: ICourseReportState = useSelector((state: IStateType) => state.course_reports); 

  let data_list: number[] = []
  let data_name_list: string[] = []
  if (course_reports.course_reports.length > 0){
    course_reports.course_reports.map(ele => {
          data_list.push(ele.total_register)
          data_name_list.push(ele.name)
          return ele
    })
  }

    const data = {
        labels: data_name_list,
        datasets: [
          {
            label: '# of Votes',
            data: data_list,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    console.log(schedule_time_classes.schedule_time_classes)

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
                    trackPromise(getTotalContestForStudent(dispatch, id))
                    trackPromise(getTotalCourseForStudent(dispatch, id))
                }
            }
            else {
                trackPromise(getTotalContestForStudent(dispatch, id))
                trackPromise(getTotalCourseForStudent(dispatch, id))
            }
        }
    }, [dispatch, access_token, refresh_token, id]);

    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    
    useEffect(() => {
        dispatch(updateCurrentPath("Thống kê", ""));
    }, [path.area, dispatch]);

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
                    <TopCard title="KHÓA HỌC" text={`${total_course_student}`} icon="book" class="primary" />
                    <TopCard title="CUỘC THI" text={`${total_contest_student}`} icon="book" class="primary" />
                </div>

                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Khóa học</h3>
                        <div className="card shadow mb-4">
                            <div className="card-body">
                            <Fragment>
                                <DoughnutPieCharts data ={data}/>
                            </Fragment>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-md-6 mb-4">
                        <h3 className=" mb-2" id="level-teacher">Cuộc thi</h3>
                        <div className="card shadow mb-4">
                            <div className="card-body">
                            <Fragment>
                                <DoughnutPieCharts data ={data}/>
                            </Fragment>
                            </div>
                        </div>
                    </div>
                </div>



            </Fragment>
    );
};

export default ViewDetailStudentForAdmin;
