import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Account/Login";
import { PrivateRoute } from "./common/components/PrivateRoute";
import Routers from "./Routers/Routers";
import LandingPage from "./components/LandingPage/LandingPage";
import ForgotPassword from "./components/Account/ForgotPassword";
import UpdatePassword from "./components/Account/UpdatePassword";
import RegisterForm from "./components/Account/RegisterForm";


const App: React.FC = () => {
  // Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.

  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <Route path="/landing-page"><LandingPage /></Route>
          <Route path={`/forgot-password`}><ForgotPassword /></Route>
          <Route path={`/update-password`}><UpdatePassword /></Route>
          <Route path={`/register`}><RegisterForm /></Route>
          <Route path="/auth"><Login /></Route>
          <PrivateRoute path="/">
            <Routers />
          </PrivateRoute>
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
