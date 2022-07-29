import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Account/Login";
//import Admin from "./components/Admin/Admin";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";
import Routers from "./Routers/Routers";

const App: React.FC = () => {
  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <PrivateRoute path="/">
            <Routers />
          </PrivateRoute>
          <AccountRoute path="/login"><Login /></AccountRoute>
          {/* <Route path={`/aut`}><Login /></Route>
          <Route path={`/landing-page`}><LandingPage /></Route>
          <Route path={`/`}><Routers /></Route>
          <Route path={`/`}>
            <Redirect to="/landing-page" />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
