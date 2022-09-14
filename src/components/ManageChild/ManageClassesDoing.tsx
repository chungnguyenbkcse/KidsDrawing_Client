import jwt_decode from "jwt-decode";
import React, { Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChartLine } from "../../common/components/CharLine";
import TopCard from "../../common/components/TopCardUser";
import { getExerciseForClassStudent } from "../../common/service/ExerciseStudent/GetExerciseForClassStudent";
import { getParentById } from "../../common/service/Parent/GetParentById";
import { getStudentLeaveByClassAndStudent } from "../../common/service/StudentLeave/GetStudentLeaveByClassStudent";
import { getUserById } from "../../common/service/User/GetUserById";
import { getUserGradeExerciseByStudentAndClass } from "../../common/service/UserGradeExerciseSubmission/GetUserGradeExerciseSubmissionByClassStudent";
import { logout } from "../../store/actions/account.actions";
import { IExerciseStudentState, IStateType, IStudentLeaveState, IUserGradeExerciseSubmissionState, IUserState } from "../../store/models/root.interface";
import "./ManageClasses.css"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../common/components/Loading";

const ManageClassesDoing: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const users: IUserState = useSelector((state: IStateType) => state.users);
    const exercise_students: IExerciseStudentState = useSelector((state: IStateType) => state.exercise_students);
    const student_leave: IStudentLeaveState = useSelector((state: IStateType) => state.student_leaves);
    const user_grade_exercise_submission: IUserGradeExerciseSubmissionState = useSelector((state: IStateType) => state.user_grade_exercise_submissions);
    const numberSubmittedCount: number = exercise_students.exercise_submitted.length;
    const numberNotSubmitNowCount: number = exercise_students.exercise_not_submit.length;
    const numberStudentLeaveCount: number = student_leave.acceptLeaves.length;
    const { promiseInProgress } = usePromiseTracker();

    
    var id_z = localStorage.getItem('teacher_id');
    var teacher_id: number = 0;
    if (id_z !== null) {
        teacher_id = parseInt(id_z);
    }

    var id_y = localStorage.getItem('student_id');
    var student_id: number = 0;
    if (id_y !== null) {
        student_id = parseInt(id_y);
    }

    var id_t = localStorage.getItem('class_id');
    var class_id: number = 0;
    if (id_t !== null) {
        class_id = parseInt(id_t);
    }
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
                    trackPromise(getUserById(dispatch, student_id))
                    trackPromise(getParentById(dispatch, teacher_id))
                    trackPromise(getExerciseForClassStudent(dispatch, class_id, student_id))
                    trackPromise(getStudentLeaveByClassAndStudent(dispatch, class_id, student_id))
                    trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id,student_id))
                }
            }
            else {
                trackPromise(getUserById(dispatch, student_id))
                trackPromise(getParentById(dispatch, teacher_id))
                trackPromise(getExerciseForClassStudent(dispatch, class_id, student_id))
                trackPromise(getStudentLeaveByClassAndStudent(dispatch, class_id, student_id))
                trackPromise(getUserGradeExerciseByStudentAndClass(dispatch, class_id,student_id))
            }
        }
    }, [dispatch, access_token, refresh_token, student_id, teacher_id, class_id]);

    let list_score_user_grade_exercise : number[] = [];
    let list_name_user_grade_exercise : string[] = [];
    user_grade_exercise_submission.user_grade_exercise_submissions.map((ele, idx) => {
        list_score_user_grade_exercise.push(ele.score)
        list_name_user_grade_exercise.push(ele.exercise_name)
        return ele
    })


    const labels = list_name_user_grade_exercise;
    const data = {
        labels,
        datasets: [
            {
                label: 'Điểm kiểm tra',
                data: list_score_user_grade_exercise,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const history = useHistory();
    const routeChange = () =>{ 
        let path = '/class/exercise-student'; 
        history.push({
            pathname: path,
        });
    }


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
                <TopCard title="BÀI TẬP ĐÃ NỘP" text={`${numberSubmittedCount}`} icon="book" class="primary" />
                <TopCard title="BÀI TẬP CHƯA NỘP" text={`${numberNotSubmitNowCount}`} icon="book" class="danger" />
                <TopCard title="SỐ BUỔI NGHỈ" text={`${numberStudentLeaveCount}`} icon="book" class="danger" />
                {/* <div className="col-xl-6 col-md-4 mb-4" id="content-button-create-teacher-level">
                    <button className="btn btn-success btn-green" id="btn-create-teacher-level" onClick={() =>
                    dispatch(setModificationState(TeacherRegisterQuantificationModificationStatus.Create))}>
                        <i className="fas fa fa-plus"></i>
                        Đăng kí trình độ
                    </button>
                </div> */}
            </div>
            <div className="row">
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Thông tin học sinh</h3>
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-center">
                                            <h4 id="full-name">Tên : {users.teachers.length > 0 ? users.teachers[0].username : ""}</h4>
                                        </div>
                                        <div className="row no-gutters justify-content-center">
                                            <p id="username-teacher">Giới tính: {users.teachers.length > 0 ? users.teachers[0].sex : ""}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <i className={`fas fa-phone fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Số điện thoại: {users.teachers.length > 0 ? users.teachers[0].phone : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Ngày sinh: {users.teachers.length > 0 ? users.teachers[0].dateOfBirth : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Email: {users.teachers.length > 0 ? users.teachers[0].email : ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-md-12 mb-4">
                            <h3 className=" mb-2" id="level-teacher">Thông tin giáo viên</h3>
                            <div className="col-xl-12 col-md-12 mb-4">
                                <div className={`card shadow h-100 py-2`} id="topcard-user">
                                    <div className="card-body">
                                        <div className="row no-gutters justify-content-center">
                                            <h4 id="full-name">Tên : {users.parents.length > 0 ? users.parents[0].username : ""}</h4>
                                        </div>
                                        <div className="row no-gutters justify-content-center">
                                            <p id="username-teacher">Giới tính: {users.parents.length > 0 ? users.parents[0].sex : ""}</p>
                                        </div>
                                        <div className="row no-gutters">
                                            <i className={`fas fa-phone fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Số điện thoại: {users.parents.length > 0 ? users.parents[0].phone : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-calendar fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Ngày sinh: {users.parents.length > 0 ? users.parents[0].dateOfBirth : ""}</p>
                                        </div>

                                        <div className="row no-gutters">
                                            <i className={`fas fa-envelope fa-2x`} id="icon-phone"></i>
                                            <p id="phone">Email: {users.parents.length > 0 ? users.parents[0].email : ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <TopCardLevel title="TRÌNH ĐỘ ĐÃ DUYỆT" text={`2`} icon="book" class="primary" />
                    <TopCardLevel title="TRÌNH ĐỘ CHƯA DUYỆT" text={`1`} icon="book" class="danger" /> */}
                </div>

                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="row">
                        <h3 className=" mb-2" id="level-teacher">Thống kê điểm</h3>
                        <div className="col-xl-12 col-md-12 mb-4">
                            <div className={`card shadow h-100 py-2`} id="topcard-user">
                                <div className="card-body">
                                    <div className="row no-gutters">
                                        <ChartLine data={data} />
                                    </div>
                                    <div className="row justify-content-center">
                                        <button 
                                            className="btn btn-success btn-green" 
                                            id="btn-into-class-student"
                                            onClick={() => {routeChange()}}
                                        >
                                            Xem chi tiết
                                            <i className={`fas fa-arrow-right fa-1x`} id="icon-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>              
                </div>
            </div>

        </Fragment>
    );
};

export default ManageClassesDoing;
