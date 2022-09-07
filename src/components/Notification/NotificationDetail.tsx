import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";

const NotificationDetail: React.FC = () => {


  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Thông báo", "Chi tiết"));

  var id_x = localStorage.getItem('notification_name');
  let notification_name = "";
  if (id_x !== null){
    notification_name = id_x;
  }

  var id_y = localStorage.getItem('notification_desciption');
  let notification_desciption = "";
  if (id_y !== null){
    notification_desciption = id_y;
  }

  var id_z = localStorage.getItem('notification_time');
  let notification_time = "";
  if (id_z !== null){
    notification_time = id_z;
  }

  return (
    <Fragment>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">{notification_name}</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
                <p>{notification_desciption}</p>
                <p>{notification_time}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default NotificationDetail;