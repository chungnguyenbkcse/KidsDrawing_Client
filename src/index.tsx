import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Provider} from "react-redux";
import store from "./store/store";
import Loading from "react-loading";



ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={
            <div className="row" id="search-box">
                <div className="col-xl-12 col-lg-12">
                  <div className="input-group" id="search-content" style={{marginTop: "200px"}}>
                    <div className="form-outline">
                      <Loading type={"spin"} color={"rgb(53, 126, 221)"} />
                      Đang tải
                    </div>
                  </div>
                </div>
          </div>
        }>
            <App />
        </Suspense>
    </Provider>
, document.getElementById('root'));

// f you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
