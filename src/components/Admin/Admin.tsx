import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import TopMenu from "../TopMenu/TopMenu";
import Routers from '../../Routers/Routers'
import Notifications from "../../common/components/Notification";

const Admin: React.FC = () => {

  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopMenu />
          <div className="container-fluid">
            <Routers />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
