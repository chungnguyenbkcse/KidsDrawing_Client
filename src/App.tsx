import React from "react";
import "./App.css";
import "./styles/sb-admin-2.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Account/Login";
//import Admin from "./components/Admin/Admin";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { AccountRoute } from "./common/components/AccountRoute";
import Routers from "./Routers/Routers";
import LandingPage from "./components/LandingPage/LandingPage";

import firebase from "./firebase";


const App: React.FC = () => {
  // Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.

React.useEffect(()=>{
  const msg=firebase.messaging();
  msg.requestPermission().then(()=>{
    return msg.getToken({vapidKey: "BFGgI654DXnQc4a5KvcZqfSZaq-f3828-2z2839DCR52BpWlAA9eACK5QrSIrFNf-DcEsP75PCUB74aGLRn3znc"});
  }).then((data: any)=>{
    console.warn("token",data)
  })

  msg.onMessage(res => {
    console.log(res)
  })
})

  return (
    <div className="App" id="wrapper">
      <Router>
        <Switch>
          <Route path="/landing-page"><LandingPage /></Route>
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
