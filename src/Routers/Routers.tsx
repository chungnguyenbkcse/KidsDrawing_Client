import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
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
import Schedule from "../components/Schedule/Schedule";
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
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopMenu />
                        <div className="container-fluid">
                            <Switch>
                                <Route path={`/change-password`}><ChangePassword /></Route>
                                <Route path={`/account`}><Account /></Route>
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
                            <Route path={`/class`}><Class /></Route>
                            <Route path={`/schedules`}><Schedule /></Route>
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