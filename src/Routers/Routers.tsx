import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
import LeftMenu from "../components/LeftMenu/LeftMenu";
import TopMenu from "../components/TopMenu/TopMenu";
import Users from "../components/Users/Users";
import Products from "../components/Products/Products";
import Orders from "../components/Orders/Orders";
import Home from "../components/Home/Home";
import Notifications from "../common/components/Notification";

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
                            <Route path="/home"><Home /></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Routers;