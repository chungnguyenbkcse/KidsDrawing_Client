import React, { useState, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotify } from "../../common/service/Notify/GetNotify";
import { getUserReadNotification } from "../../common/service/UserReadNotification/GetUserReadNotificationByUser";
import { putUserReadNotification } from "../../common/service/UserReadNotification/PutUserReadNotification";
import { logout } from "../../store/actions/account.actions";
import { INotifyState, IStateType, IUserReadNotificationState } from "../../store/models/root.interface";
import "./TopNotification.css"

type Options = {
  notification_id: number;
  user_id: number;
  notification_name: string;
  notification_desciption: string;
  notification_time: string;
  is_read: boolean;
}

function TopMenuNotification(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const notifys: INotifyState = useSelector((state: IStateType) => state.notifys);
  const user_read_notifications: IUserReadNotificationState = useSelector((state: IStateType) => state.user_read_notifications);
  const [isShow, setShow] = useState(false);

  var id_x = localStorage.getItem('id');
  let user_id: number = 0;
  if (id_x !== null) {
    user_id = parseInt(id_x)
  }

  useEffect(() => {
    dispatch(getUserReadNotification(user_id))
    dispatch(getNotify())
  }, [dispatch, user_id])

  console.log(notifys.notifys)
  console.log(user_read_notifications.user_not_readed_notifications)

  let data_not_read: Options[] = [];
  let total = 0;
  user_read_notifications.user_not_readed_notifications.map((ele, idx) => {
    return notifys.notifys.map(notification => {
      if (notification.idx === ele.notification_id){
        let item: Options = {
          notification_id: ele.notification_id,
          notification_name: notification.name,
          user_id: ele.user_id,
          notification_time: notification.time,
          notification_desciption: notification.description,
          is_read: ele.is_read
        }
        total ++;
        return data_not_read.push(item)
      }
      return notification
    })
  })

  let data_readed: Options[] = [];
  user_read_notifications.user_readed_notifications.map((ele, idx) => {
    return notifys.notifys.map(notification => {
      if (notification.idx === ele.notification_id && total <= 6){
        let item: Options = {
          notification_id: ele.notification_id,
          notification_name: notification.name,
          user_id: ele.user_id,
          notification_time: notification.time,
          notification_desciption: notification.description,
          is_read: ele.is_read
        }
        total ++;
        return data_not_read.push(item)
      }
      return notification
    })
  })

  const history = useHistory();
  const routeChange = (props: Options) =>{ 
      setShow(!isShow)
      dispatch(putUserReadNotification({
        user_id: user_id,
        notification_id: props.notification_id,
        is_read: true
      }))
      localStorage.removeItem('notification_id');
      localStorage.setItem('notification_id', props.notification_id.toString());
      localStorage.removeItem('user_id');
      localStorage.setItem('user_id', props.user_id.toString());
      localStorage.removeItem('notification_name');
      localStorage.setItem('notification_name', props.notification_name);
      localStorage.removeItem('notification_desciption');
      localStorage.setItem('notification_desciption', props.notification_desciption);
      localStorage.removeItem('notification_time');
      localStorage.setItem('notification_time', props.notification_time);
      let path = '/notification/detail'; 
      history.push({
          pathname: path,
      });
  }

  return (

    <li className="nav-item dropdown no-arrow">


      <p className="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" onClick={() => {
        setShow(!isShow);
      }}>
        <span className="badge badge-danger ml-2">{user_read_notifications.user_not_readed_notifications.length}</span>
        <i className="fas fa-bell"></i>
      </p>

      <div className={`dropdown-menu dropdown-menu-right shadow dropdown-secondary animated--grow-in ${(isShow) ? "show" : ""} notification`}
        aria-labelledby="userDropdown">
          <ul className="list-notify">
            {
              data_not_read.map((ele, idx) => {
                return (
                  <li key={idx}>
                    <p className="dropdown-item waves-light"
                      onClick={() => {routeChange(ele)}}
                      data-toggle="modal"
                      data-target="#logoutModal">
                      <i className="fas fa-bell fa-sm fa-fw mr-2"></i>
                      {ele.notification_name}
                      <span className="badge badge-danger ml-2">*</span>
                    </p>
                  </li>
                )
              })
            }


            {
              data_readed.map((ele, idx) => {
                return (
                  <li>
                    <p className="dropdown-item waves-light"
                      onClick={() => dispatch(logout())}
                      data-toggle="modal"
                      data-target="#logoutModal">
                      <i className="fas fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
                      {ele.notification_name}
                    </p>
                  </li>
                )
              })
            }
          </ul>
          <div className="view-all-notify text-center">
            <a href="/notification">Xem toàn bộ</a>
          </div>
      </div>
    </li>
  );
};

export default TopMenuNotification;
