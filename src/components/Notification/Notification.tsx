import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotifyDb } from "../../common/service/NotifyDb/GetNotifyDb";
import { getUserReadNotification } from "../../common/service/UserReadNotification/GetUserReadNotificationByUser";
import { putUserReadNotification } from "../../common/service/UserReadNotification/PutUserReadNotification";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { INotifyDbState, IStateType, IUserReadNotificationState } from "../../store/models/root.interface";
import './Notification.css'

type Options = {
    notification_id: number;
    user_id: number;
    notification_name: string;
    notification_desciption: string;
    notification_time: string;
    is_read: boolean;
}

const Notification: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Thông báo", "Danh sách"));

    const notificationDbs: INotifyDbState = useSelector((state: IStateType) => state.notify_dbs);
    const user_read_notifications: IUserReadNotificationState = useSelector((state: IStateType) => state.user_read_notifications);

    var id_x = localStorage.getItem('id');
    let user_id: number = 0;
    if (id_x !== null) {
        user_id = parseInt(id_x)
    }

    useEffect(() => {
        dispatch(getNotifyDb())
        dispatch(getUserReadNotification(user_id))
    }, [dispatch, user_id])

    let data_not_read: Options[] = [];
    user_read_notifications.user_not_readed_notifications.map((ele, idx) => {
        let notification = notificationDbs.notify_dbs.find(o => o.id = ele.notification_id);
        if (notification !== undefined) {
            let item: Options = {
                notification_id: ele.notification_id,
                notification_name: notification.name,
                user_id: ele.user_id,
                notification_time: notification.time,
                notification_desciption: notification.description,
                is_read: ele.is_read
            }
            return data_not_read.push(item)
        }
        return idx
    })

    let data_readed: Options[] = [];
    user_read_notifications.user_readed_notifications.map((ele, idx) => {
        let notification = notificationDbs.notify_dbs.find(o => o.id = ele.notification_id);
        if (notification !== undefined) {
            let item: Options = {
                notification_id: ele.notification_id,
                notification_name: notification.name,
                user_id: ele.user_id,
                notification_time: notification.time,
                notification_desciption: notification.description,
                is_read: ele.is_read
            }
            return data_readed.push(item)
        }
        return idx
    })

    const history = useHistory();
    const routeChange = (props: Options) => {
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
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Danh sách thông báo</h1>
            {
                data_not_read.map((ele, idx) => {
                    return (
                        <div className="row" onClick={() => {
                            routeChange(ele)
                        }}>
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-green">{ele.notification_name}</h6>
                                        <div className="header-buttons">
                                        </div>
                                    </div>
                                    <div className="card-body has-view">
                                        <p>Thời gian: {ele.notification_time.replaceAll("T", " ").substring(0,16)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }


            {
                data_readed.map((ele, idx) => {
                    return (
                        <div className="row" onClick={() => {
                            routeChange(ele)
                        }}>
                            <div className="col-xl-12 col-lg-12">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-green">{ele.notification_name}</h6>
                                        <div className="header-buttons">
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p>Thời gian: {ele.notification_time.replaceAll("T", " ").substring(0,16)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment >
    );
};

export default Notification;
