import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
import "./Routers.css"
import LeftMenu from "../components/LeftMenu/LeftMenu";
import TopMenu from "../components/TopMenu/TopMenu";
import Products from "../components/Products/Products";
import Orders from "../components/Orders/Orders";
import Home from "../components/Home/Home";
import Notifications from "../common/components/Notification";
import Teacher from "../components/Teachers/Teacher";
import DetailTeacher from "../components/Teachers/DetailTeacher";
import Student from "../components/Student/Student";
import DetailStudent from "../components/Student/DetailStudent";
import Parent from "../components/Parent/Parent";
import DetailParent from "../components/Parent/DetailParent";
import Semester from "../components/Semester/Semester";
import Lesson from "../components/Lesson/Lesson";
import Art from "../components/Art/Art";
import Course from "../components/Course/Course";
import Class from "../components/Class/Class";
import DetailClass from "../components/Class/DetailClass";
import DetailLesson from "../components/Class/DetailLesson";
import Turnover from "../components/Turnover/Turnover";
import StudentRequest from "../components/Request/StudentRequest";
import TeacherRequest from "../components/Request/TeacherRequest";
import RequestConfirmLevel from "../components/Request/RequestConfirmLevel";
import LessonPlan from "../components/Course/LessonPlan";
import Contest from "../components/Contest/Contest";
import DegreePhoto from "../components/Request/DegreePhoto";
import CourseNomalForm from "../components/Course/CourseNomalForm";
import ContestForm from "../components/Contest/ContestForm";
import CourseNomalFormEdit from "../components/Course/CourseNomalFormEdit";
import Account from "../components/Account/Account";
import ChangePassword from "../components/Account/ChangePassword";
import ResultContest from "../components/Contest/ResultContest";
import SectionTemplate from "../components/Section/SectionTemplate";
import SectionTemplateForm from "../components/Section/SectionTemplateForm";
import TeacherHome from "../components/Home/TeacherHome";
import ScheduleClass from "../components/Class/ScheduleClass";
import CourseTeacher from "../components/Course/CourseTeacher";
import ScheduleTeacher from "../components/Schedule/ScheduleTeacher";
import CourseTeacherDetail from "../components/Course/CourseTeacherDetail";
import TeacherLevel from "../components/TeacherLevel/TeacherLevel";
import TeacherLevelDetail from "../components/TeacherLevel/TeacherLevelDetail";
import ClassTeacher from "../components/Class/ClassTeacher";
import ClassTeacherDetail from "../components/Class/ClassTeacherDetail";
import ContestTeacher from "../components/Contest/ContestTeacher";
import ManageStudent from "../components/ManageStudent/ManageStudent";
import ExerciseStudentList from "../components/ManageStudent/ExerciseStudentList";
import DetailExerciseStudent from "../components/ManageStudent/DetailExerciseStudent";
import DetailClassTeacher from "../components/Class/DetailClassTeacher";
import GradeExamTeacher from "../components/Exam/GradeExamTeacher";
import ResultGradeExamTeacher from "../components/Exam/ResultGradeExamTeacher";
import AnalytisResultGradeExamTeacher from "../components/Exam/AnalytisScoreExamTeacher";
import SectionTeacher from "../components/SectionTeacher/SectionTeacher";
import EditSectionTeacher from "../components/SectionTeacher/EditSectionTeacher";
import ViewSectionTeacher from "../components/SectionTeacher/ViewSectionTeacher";
import RequestTeacher from "../components/RequestTeacher/RequestTeacher";
import ExamTeacher from "../components/Exam/ExamTeacher";

const Routers: React.FC = () => {
    var role_privilege = localStorage.getItem('role_privilege')
    var rolePrivilege:string[] =[]
    var roleUser :string =""
    if (role_privilege !== null) {
        rolePrivilege = role_privilege.split(',')
        roleUser = rolePrivilege[0]
    }
    if (roleUser === "TEACHER_USER"){
        return (
            <Fragment>
                <Notifications />
                <LeftMenu />
                <div id="content-wrapper" className="d-flex flex-column content-wrapper-teacher">
                    <div id="content" className="teacher-content">
                        <TopMenu />
                        <div className="container-fluid">
                            <Switch>
                                <Route path={`/change-password`}><ChangePassword /></Route>
                                <Route path={`/account`}><Account /></Route>
                                <Route path={`/teacher-level/detail`}><TeacherLevelDetail /></Route>                              
                                <Route path={`/teacher-level`}><TeacherLevel /></Route>
                                <Route path={`/courses/detail`}><CourseTeacherDetail /></Route>
                                <Route path={`/courses`}><CourseTeacher /></Route>
                                <Route path={`/contests`}><ContestTeacher /></Route>
                                <Route path={`/classes/detail-student`}><DetailClassTeacher /></Route>
                                <Route path={`/exercise/grade`}><GradeExamTeacher /></Route>
                                <Route path={`/exercise/result-analytis`}><AnalytisResultGradeExamTeacher /></Route>
                                <Route path={`/classes/section`}><SectionTeacher /></Route>
                                <Route path={`/section/edit`}><EditSectionTeacher /></Route>
                                <Route path={`/section/view`}><ViewSectionTeacher /></Route>
                                <Route path={`/request`}><RequestTeacher /></Route>
                                <Route path={`/exercise/result-grade`}><ResultGradeExamTeacher /></Route>
                                <Route path={`/exercise`}><ExamTeacher /></Route>
                                <Route path={`/class/exercise-student`}><ExerciseStudentList /></Route>
                                <Route path={`/classes/detail`}><ClassTeacherDetail /></Route>
                                <Route path={`/classes`}><ClassTeacher /></Route>
                                <Route path={`/schedule-teacher`}><ScheduleTeacher /></Route>
                                <Route path={`/manage-student`}><ManageStudent /></Route>
                                <Route path={`/exercise/detail`}><DetailExerciseStudent /></Route>
                                <Route path="/"><TeacherHome /></Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <Notifications />
            <LeftMenu />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopMenu />
                    <div className="container-fluid">
                        <Switch>
                            <Route path={`/products`}><Products /></Route>
                            <Route path={`/orders`}><Orders /></Route>
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
                            <Route path={`/request-student-off`}><StudentRequest /></Route>
                            <Route path={`/request-teacher-off`}><TeacherRequest /></Route>
                            <Route path={`/teachers/request-level/degree-photo`}><DegreePhoto /></Route>
                            <Route path={`/teachers/request-level`}><RequestConfirmLevel /></Route>
                            <Route path="/teachers/detail"><DetailTeacher /></Route>
                            <Route path={`/teachers`}><Teacher /></Route>
                            <Route path="/"><Home /></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Routers;