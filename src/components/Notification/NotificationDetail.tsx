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
                    <div className="col-xl-12 col-md-12 mb-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 mb-2">
                                <div className="col-xl-12 col-md-12 mb-2">
                                    <div className={`card shadow h-100 py-2`} id="normal-tutorial">
                                        <div className="card-body">
                                            <div className="row no-gutters justify-content-left">
                                                <h4 id="full-name">Nội dung thông báo</h4>
                                            </div>
                                            <div className="row no-gutters">
                                                <h5 id="phone">Tiêu đề: {notification_name}</h5>
                                            </div>

                                            <div className="row no-gutters">
                                                <p id="phone">Nội dung: {notification_desciption}</p>
                                            </div>

                                            <div className="row no-gutters">
                                                <h6 id="phone">Thời gian: {notification_time.replaceAll("T", " ").substring(0,16)}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
    </Fragment >
  );
};

export default NotificationDetail;