import React, { useState } from "react";
import './LeftMenuNew.css'
import { Switch, Route } from "react-router";
import "../../Routers/Routers.css"
import TopMenu from "../TopMenu/TopMenu";
import Home from "../Home/Home";
import Teacher from "../Teachers/Teacher";
import DetailTeacher from "../Teachers/DetailTeacher";
import Student from "../Student/Student";
import DetailStudent from "../Student/DetailStudent";
import Parent from "../Parent/Parent";
import DetailParent from "../Parent/DetailParent";
import Semester from "../Semester/Semester";
import Lesson from "../Lesson/Lesson";
import Art from "../Art/Art";
import Course from "../Course/Course";
import Class from "../Class/Class";
import DetailClass from "../Class/DetailClass";
import DetailLesson from "../Class/DetailLesson";
import Turnover from "../Turnover/Turnover";
import TeacherRequest from "../Request/TeacherRequest";
import RequestConfirmLevel from "../Request/RequestConfirmLevel";
import LessonPlan from "../Course/LessonPlan";
import Contest from "../Contest/Contest";
import DegreePhoto from "../Request/DegreePhoto";
import CourseNomalForm from "../Course/CourseNomalForm";
import ContestForm from "../Contest/ContestForm";
import CourseNomalFormEdit from "../Course/CourseNomalFormEdit";
import Account from "../Account/Account";
import ChangePassword from "../Account/ChangePassword";
import ResultContest from "../Contest/ResultContest";
import SectionTemplate from "../SectionTemplate/SectionTemplate";
import SectionTemplateForm from "../SectionTemplate/SectionTemplateForm";
import TeacherHome from "../Home/TeacherHome";
import ScheduleClass from "../Class/ScheduleClass";
import CourseTeacher from "../Course/CourseTeacher";
import ScheduleTeacher from "../Schedule/ScheduleTeacher";
import CourseTeacherDetail from "../Course/CourseTeacherDetail";
import TeacherLevel from "../TeacherLevel/TeacherLevel";
import TeacherLevelDetail from "../TeacherLevel/TeacherLevelDetail";
import ClassTeacher from "../Class/ClassTeacher";
import ClassTeacherDetail from "../Class/ClassTeacherDetail";
import ContestTeacher from "../Contest/ContestTeacher";
import ManageStudent from "../ManageStudent/ManageStudent";
import ExerciseStudentList from "../ManageStudent/ExerciseStudentList";
import DetailExerciseStudent from "../ManageStudent/DetailExerciseStudent";
import DetailClassTeacher from "../Class/DetailClassTeacher";
import GradeExamTeacher from "../Exam/GradeExamTeacher";
import ResultGradeExamTeacher from "../Exam/ResultGradeExamTeacher";
import AnalytisResultGradeExamTeacher from "../Exam/AnalytisScoreExamTeacher";
import SectionTeacher from "../SectionTeacher/SectionTeacher";
import EditSectionTeacher from "../SectionTeacher/EditSectionTeacher";
import ViewSectionTeacher from "../SectionTeacher/ViewSectionTeacher";
import RequestTeacher from "../RequestTeacher/RequestTeacher";
import ExamTeacher from "../Exam/ExamTeacher";
import StudentLeaveDetail from "../RequestTeacher/StudentLeaveDetail";
import DetailTeacherRequest from "../Request/DetailTeacherRequest";
import TutorialEditRequest from "../Request/TutorialEditRequest";
import ContestDetailTeacher from "../Contest/ContestDetailTeacher";
import GradeContestTeacher from "../Contest/GradeContestTeacher";
import ResultGradeContestTeacher from "../Contest/ResultGradeContestTeacher";
import AnalytisResultGradeContestTeacher from "../Contest/AnalytisResultGradeContestTeacher";
import DetailContestTeacher from "../Contest/DetailContestTeacher";
import NotificationDetail from "../Notification/NotificationDetail";
import Notification from "../Notification/Notification";
import ParentHome from "../Home/ParentHome";
import GuessColor from "../GuessColor";
import CourseParent from "../Course/CourseParent";
import ContestParent from "../Contest/ContestParent";
import ScheduleParent from "../Schedule/ScheduleParent";
import CourseStudent from "../Course/CourseStudent";
import ScheduleStudent from "../Schedule/ScheduleStudent";
import ContestStudent from "../Contest/ContestStudent";
import StudentHome from "../Home/StudentHome";
import ManageChild from "../ManageChild/ManageChild";
import ManageClassesDone from "../ManageChild/ManageClassesDone";
import ClassParent from "../ClassParent/ClassParent";
import ManageClassesDoing from "../ManageChild/ManageClassesDoing";
import Discovery from "../Discovery/Discovery";
import SemesterClassDetail from "../Discovery/SemesterClassDetail";
import ConestDetail from "../Discovery/ContestDetail";
import CartForm from "../Discovery/CartForm";
import DetailContestStudent from "../ManageStudent/DetailContestStudent";
import Attendance from "../SectionTeacher/Attendance";
import ClassStudent from "../ClassStudent/ClassStudent";
import DiscoveryStudent from "../DiscoveryStudent/Discovery";
import ConestDetailStudent from "../Discovery/ContestDetail";
import SemesterClassDetailStudent from "../DiscoveryStudent/SemesterClassDetail";
import DetailClassStudent from "../ClassStudent/DetailClassStudent";
import SectionStudent from "../ClassStudent/SectionStudent";
import ViewSectionStudent from "../ClassStudent/ViewSectionStudent";
import DetailExerciseStudent1 from "../ManageStudent/DetailExerciseStudent1";
import FormSubmit from "../ClassStudent/FormSubmit";
import FormSubmitContestStudent from "../Contest/FormSubmitContestStudent";
import ScheduleClassStudent from "../ClassStudent/ScheduleClassStudent";
import ViewExerciseSubmission from "../Exercise/ViewExerciseSubmission";
import SemesterClassStudentNew from "../DiscoveryStudent/SemesterClasssStudentNew";
import ReivewClassDone from "../ClassStudent/ReviewClassDone";
import ExerciseStudentList1 from "../ClassStudent/ExerciseStudentList1";
import ReviewStart from "../ClassStudent/ReviewStart";
import SemesterClassParentNew from "../Discovery/SemesterClassParentNew";
import SemesterClassTeacherNew from "../Course/SemesterClassTeacherNew";

import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { BsMap } from "react-icons/bs";
import { AiOutlineBook, AiOutlineFileText } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { GiVideoConference } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";

const LeftMenu = () => {
    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
    var role = localStorage.getItem('role')
    var rolePrivilege = []
    var roleUser = ""
    if (role !== null) {
        rolePrivilege = role.split(',')
        roleUser = rolePrivilege[0]
    }

    return (
        <>
            <div className="container-fluid mt-3">

                <nav className="navbar navbar-expand-lgsidebar-dark bg-white shadow-md">
                    <div className="container-fluid p-2">
                        <a className="navbar-brand text-primary mr-0">KidsDrawing</a>
                        <div className="form-inline ml-auto">
                            <div className="btn btn-primary" onClick={ToggleSidebar} >
                                <i className="fa fa-bars"></i>
                            </div>
                        </div>
                    </div>
                </nav>
                {
                    function () {
                        if (roleUser === "TEACHER") {
                            return (
                                <div id="content-wrapper" className="d-flex flex-column content-wrapper-teacher">
                                    <div id="content" className="teacher-content">
                                        <TopMenu />
                                        <div className="container-fluid">
                                            <Switch>
                                                <Route path={`/change-password`}><ChangePassword /></Route>
                                                <Route path={`/account`}><Account /></Route>
                                                <Route path={`/attendance`}><Attendance /></Route>
                                                <Route path={`/student-leave/detail`}><StudentLeaveDetail /></Route>
                                                <Route path={`/teacher-level/detail`}><TeacherLevelDetail /></Route>
                                                <Route path={`/teacher-level`}><TeacherLevel /></Route>
                                                <Route path={`/courses/semester-classes`}><SemesterClassTeacherNew /></Route>
                                                <Route path={`/semester-class/detail`}><CourseTeacherDetail /></Route>
                                                <Route path={`/courses`}><CourseTeacher /></Route>
                                                <Route path={`/contests/detail`}><ContestDetailTeacher /></Route>
                                                <Route path={`/contests/detail-contest`}><DetailContestTeacher /></Route>
                                                <Route path={`/contest/result-grade`}><ResultGradeContestTeacher /></Route>
                                                <Route path={`/contest/result-analytis`}><AnalytisResultGradeContestTeacher /></Route>
                                                <Route path={`/contest/grade`}><GradeContestTeacher /></Route>
                                                <Route path={`/contests`}><ContestTeacher /></Route>
                                                <Route path={`/classes/detail-student`}><DetailClassTeacher /></Route>
                                                <Route path={`/exercise/grade`}><GradeExamTeacher /></Route>
                                                <Route path={`/exercise/result-analytis`}><AnalytisResultGradeExamTeacher /></Route>
                                                <Route path={`/classes/section`}><SectionTeacher /></Route>
                                                <Route path={`/section/edit`}><EditSectionTeacher /></Route>
                                                <Route path={`/section/view`}><ViewSectionTeacher /></Route>
                                                <Route path={`/request`}><RequestTeacher /></Route>
                                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                                <Route path={`/notification`}><Notification /></Route>
                                                <Route path={`/exercise/result-grade`}><ResultGradeExamTeacher /></Route>
                                                <Route path={`/class/exercise-student`}><ExerciseStudentList /></Route>
                                                <Route path={`/classes/detail`}><ClassTeacherDetail /></Route>
                                                <Route path={`/classes`}><ClassTeacher /></Route>
                                                <Route path={`/schedule-teacher`}><ScheduleTeacher /></Route>
                                                <Route path={`/manage-student`}><ManageStudent /></Route>
                                                <Route path={`/exercise/detail`}><DetailExerciseStudent /></Route>
                                                <Route path={`/exercise`}><ExamTeacher /></Route>
                                                <Route path="/"><TeacherHome /></Route>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else if (roleUser === "PARENT") {
                            return (
                                <div id="content-wrapper" className="d-flex flex-column">
                                    <div id="content">
                                        <TopMenu />
                                        <div className="container-fluid content-page">
                                            <Switch>
                                                <Route path={`/teacher-request/detail`}><DetailTeacherRequest /></Route>
                                                <Route path={`/change-password`}><ChangePassword /></Route>
                                                <Route path={`/account`}><Account /></Route>
                                                <Route path={`/courses/semester-classes`}><SemesterClassParentNew /></Route>
                                                <Route path={`/contests/detail`}><ContestDetailTeacher /></Route>
                                                <Route path={`/contests/detail-contest`}><DetailContestTeacher /></Route>
                                                <Route path={`/contest/result-grade`}><ResultGradeContestTeacher /></Route>
                                                <Route path={`/contest/result-analytis`}><AnalytisResultGradeContestTeacher /></Route>
                                                <Route path={`/cart`}><CartForm /></Route>
                                                <Route path={`/discover`}><Discovery /></Route>
                                                <Route path={`/exercise-submission/view`}><ViewExerciseSubmission /></Route>
                                                <Route path={`/class/exercise-student`}><ExerciseStudentList /></Route>
                                                <Route path={`/exercise/detail`}><DetailExerciseStudent /></Route>
                                                <Route path={`/contest/detail`}><DetailContestStudent /></Route>
                                                <Route path={`/student/classes-doing`}><ManageClassesDoing /></Route>
                                                <Route path={`/students/detail`}><ManageChild /></Route>
                                                <Route path={`/student/class`}><ManageClassesDone /></Route>
                                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                                <Route path={`/notification`}><Notification /></Route>
                                                <Route path={`/semester-class/detail`}><SemesterClassDetail /></Route>
                                                <Route path={`/courses`}><CourseParent /></Route>
                                                <Route path={`/classes`}><ClassParent /></Route>
                                                <Route path={`/contests/register`}><ConestDetail /></Route>
                                                <Route path={`/contests`}><ContestParent /></Route>
                                                <Route path={`/schedules`}><ScheduleParent /></Route>
                                                <Route path="/"><ParentHome /></Route>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else if (roleUser === "STUDENT") {
                            return (
                                <div id="content-wrapper" className="d-flex flex-column">
                                    <div id="content">
                                        <TopMenu />
                                        <div className="container-fluid content-page">
                                            <Switch>
                                                <Route path={`/change-password`}><ChangePassword /></Route>
                                                <Route path={`/account`}><Account /></Route>
                                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                                <Route path={`/notification`}><Notification /></Route>
                                                <Route path={`/exercise-submission/view`}><ViewExerciseSubmission /></Route>
                                                <Route path={`/contests/submit`}><FormSubmitContestStudent /></Route>
                                                <Route path={`/contests/detail-contest`}><DetailContestTeacher /></Route>
                                                <Route path={`/contest/result-grade`}><ResultGradeContestTeacher /></Route>
                                                <Route path={`/contest/result-analytis`}><AnalytisResultGradeContestTeacher /></Route>
                                                <Route path={`/semester-class/detail`}><SemesterClassDetailStudent /></Route>
                                                <Route path={`/classes/section`}><SectionStudent /></Route>
                                                <Route path={`/section/view`}><ViewSectionStudent /></Route>
                                                <Route path={`/courses/semester-classes`}><SemesterClassStudentNew /></Route>
                                                <Route path={`/courses`}><CourseStudent /></Route>
                                                <Route path={`/exercise/detail`}><DetailExerciseStudent1 /></Route>
                                                <Route path={`/exercise/score`}><DetailExerciseStudent /></Route>
                                                <Route path={`/classes/form-review`}><ReviewStart /></Route>
                                                <Route path={`/exercise/submit`}><FormSubmit /></Route>
                                                <Route path={`/discover`}><DiscoveryStudent /></Route>
                                                <Route path={`/classes/exercise-student`}><ExerciseStudentList1 /></Route>
                                                <Route path={`/classes/review`}><ReivewClassDone /></Route>
                                                <Route path={`/classes/schedule`}><ScheduleClassStudent /></Route>
                                                <Route path={`/classes/detail-student`}><DetailClassStudent /></Route>
                                                <Route path={`/contests/register`}><ConestDetailStudent /></Route>
                                                <Route path={`/contests`}><ContestStudent /></Route>
                                                <Route path={`/classes`}><ClassStudent /></Route>
                                                <Route path={`/schedules`}><ScheduleStudent /></Route>
                                                <Route path={`/game/guess-color`}><GuessColor /></Route>
                                                <Route path="/"><StudentHome /></Route>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div id="content-wrapper" className="d-flex flex-column">
                                    <div id="content">
                                        <div className="container-fluid">
                                            <Switch>
                                                <Route path={`/teacher-request/detail`}><DetailTeacherRequest /></Route>
                                                <Route path={`/change-password`}><ChangePassword /></Route>
                                                <Route path={`/account`}><Account /></Route>
                                                <Route path={`/parents/detail`}><DetailParent /></Route>
                                                <Route path={`/parents`}><Parent /></Route>
                                                <Route path={`/students/detail`}><DetailStudent /></Route>
                                                <Route path={`/students`}><Student /></Route>
                                                <Route path={`/semesters`}><Semester /></Route>
                                                <Route path={`/lessons`}><Lesson /></Route>
                                                <Route path={`/arts`}><Art /></Route>
                                                <Route path={`/class/lesson`}><DetailLesson /></Route>
                                                <Route path={`/class/detail`}><DetailClass /></Route>
                                                <Route path={`/class/schedule`}><ScheduleClass /></Route>
                                                <Route path={`/class`}><Class /></Route>
                                                <Route path={`/section-template/edit`}><SectionTemplateForm /></Route>
                                                <Route path={`/courses/section-template`}><SectionTemplate /></Route>
                                                <Route path={`/courses/lesson-plan`}><LessonPlan /></Route>
                                                <Route path={`/courses/create-course`}><CourseNomalForm /></Route>
                                                <Route path={`/courses/edit-course`}><CourseNomalFormEdit /></Route>
                                                <Route path={`/courses/:id_course`}><CourseNomalForm /></Route>
                                                <Route path={`/courses`}><Course /></Route>
                                                <Route path={`/contests/result`}><ResultContest /></Route>
                                                <Route path={`/contests/edit-contest`}><ContestForm /></Route>
                                                <Route path={`/contests/:id_contest`}><ContestForm /></Route>
                                                <Route path={`/contests`}><Contest /></Route>
                                                <Route path={`/turnovers`}><Turnover /></Route>
                                                <Route path={`/tutorial-edit`}><TutorialEditRequest /></Route>
                                                <Route path={`/request-teacher-off`}><TeacherRequest /></Route>
                                                <Route path={`/teachers/request-level/degree-photo`}><DegreePhoto /></Route>
                                                <Route path={`/teachers/request-level`}><RequestConfirmLevel /></Route>
                                                <Route path="/teachers/detail"><DetailTeacher /></Route>
                                                <Route path={`/teachers`}><Teacher /></Route>
                                                <Route path={`/notification/detail`}><NotificationDetail /></Route>
                                                <Route path={`/notification`}><Notification /></Route>
                                                <Route path="/"><Home /></Route>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }()
                }
                <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <h4 className="mb-0">KidsDrawing</h4>
                        <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
                    </div>
                    <div className="sd-body">
                        <ul>
                            {
                                function () {
                                    if (roleUser === 'ADMIN') {
                                        return (
                                            <>
                                                <hr className="sidebar-divider my-0" />

                                                <li className="nav-item active">

                                                    <Link className="nav-link" to="/Home">
                                                        <i className="fas fa-fw fa-tachometer-alt"></i>
                                                        <span>Trang chủ</span>
                                                    </Link>
                                                </li>

                                                <hr className="sidebar-divider" />
                                                <div className="sidebar-heading">
                                                    Quản lý người dùng
                                                </div>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/teachers`}>
                                                        <FaChalkboardTeacher />
                                                        <span> Giáo viên</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/students`}>
                                                        <FaChild />
                                                        <span> Học sinh</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/parents`}>
                                                        <RiParentFill />
                                                        <span> Phụ huynh</span>
                                                    </Link>
                                                </li>

                                                <hr className="sidebar-divider" />

                                                <div className="sidebar-heading">
                                                    Quản lý hệ thống
                                                </div>


                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/semesters`}>
                                                        <BsMap />
                                                        <span> Học kì</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/lessons`}>
                                                        <AiOutlineBook />
                                                        <span> Tiết học</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/arts`}>
                                                        <FaPaintBrush />
                                                        <span> Nghệ thuật</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/courses`}>
                                                        <MdSchool />
                                                        <span> Khóa học</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/class`}>
                                                        <GiVideoConference />
                                                        <span> Lớp</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/contests`}>
                                                        <AiOutlineFileText />
                                                        <span> Cuộc thi</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/turnovers`}>
                                                        <BsCashCoin />
                                                        <span> Phân tích</span>
                                                    </Link>
                                                </li>

                                                <hr className="sidebar-divider" />

                                                <hr className="sidebar-divider" />

                                                <div className="sidebar-heading">
                                                    Yêu cầu người dùng
                                                </div>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/tutorial-edit`}>
                                                        <span>Yêu cầu chỉnh giáo án</span>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link" to={`/request-teacher-off`}>
                                                        <span>Nghỉ dạy</span>
                                                    </Link>
                                                </li>


                                                <hr className="sidebar-divider d-none d-md-block" />
                                            </>
                                        )
                                    }
                                }()
                            }
                        </ul>
                    </div>
                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
            </div>

        </>
    )
}

export default LeftMenu;