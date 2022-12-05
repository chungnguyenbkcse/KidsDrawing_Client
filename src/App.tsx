import React, { lazy } from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./common/components/PrivateRoute";

const Routers = lazy(()=> import("./Routers/Routers"));
const LandingPage = lazy(()=> import("./components/LandingPage/LandingPage"));
const ForgotPassword = lazy(()=> import("./components/Account/ForgotPassword"));
const UpdatePassword = lazy(()=> import("./components/Account/UpdatePassword"));
const RegisterForm = lazy(()=> import("./components/Account/RegisterForm"));
const PaymentSuccessfull = lazy(()=> import("./components/Discovery/PaymentSuccessfull"));
const Login = lazy(()=> import("./components/Account/Login"));


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
          <Route path={`/payment-successfull`}><PaymentSuccessfull /></Route>
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
