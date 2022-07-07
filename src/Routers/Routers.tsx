import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
import LeftMenu from "../components/LeftMenu/LeftMenu";
import TopMenu from "../components/TopMenu/TopMenu";
import Users from "../components/Users/Users";
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

const Routers: React.FC = () => {
    return (
        <Fragment>
            <Notifications />
            <LeftMenu />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopMenu />
                    <div className="container-fluid">
                        <Switch>
                            <Route path={`/users`}><Users /></Route>
                            <Route path={`/products`}><Products /></Route>
                            <Route path={`/orders`}><Orders /></Route>
                            <Route path={`/parents/detail`}><DetailParent /></Route>
                            <Route path={`/parents`}><Parent /></Route>
                            <Route path={`/students/detail`}><DetailStudent /></Route>
                            <Route path={`/students`}><Student /></Route>
                            <Route path={`/semesters`}><Semester /></Route>
                            <Route path={`/lessons`}><Lesson /></Route>
                            <Route path={`/schedules`}><Schedule /></Route>
                            <Route path="/teachers/detail"><DetailTeacher /></Route>
                            <Route path={`/teachers`}><Teacher /></Route>
                            <Route path="/home"><Home /></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Routers;