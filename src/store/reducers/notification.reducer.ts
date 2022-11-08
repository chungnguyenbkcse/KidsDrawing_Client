import { IActionBase, INotificationState } from "../models/root.interface";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/notifications.action";

const initialState: INotificationState = {
    notifications: [{id: 0, date: new Date(), text: "", title: "Xin chào"}]
};

function notificationReducer(state: INotificationState = initialState, action: IActionBase): INotificationState {
    switch (action.type) {
        case ADD_NOTIFICATION: {
            return {...state, notifications: [...state.notifications, action.notification]};
        }
        case REMOVE_NOTIFICATION: {
            return {...state, notifications: state.notifications
                .filter(Notification => Notification.id !== action.id)};
        }
        default:
            return state;
    }
}


export default notificationReducer;