import { IUserReadNotificationState, IActionBase } from "../models/root.interface";
import { ADD_USER_READED_NOTIFICATION, CHANGE_USER_READED_NOTIFICATION_PENDING_EDIT, EDIT_USER_READED_NOTIFICATION, REMOVE_USER_READED_NOTIFICATION,
    CLEAR_USER_READED_NOTIFICATION_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_USER_READED_NOTIFICATION, REMOVE_USER_READED_NOTIFICATION_ALL, INITIAL_USER_NOT_READED_NOTIFICATION, ADD_USER_NOT_READED_NOTIFICATION, EDIT_USER_NOT_READED_NOTIFICATION, REMOVE_USER_NOT_READED_NOTIFICATION, REMOVE_USER_NOT_READED_NOTIFICATION_ALL, CHANGE_USER_NOT_READED_NOTIFICATION_PENDING_EDIT, CLEAR_USER_NOT_READED_NOTIFICATION_PENDING_EDIT} from "../actions/user_read_notification.action";
import { IUserReadNotification, UserReadNotificationModificationStatus } from "../models/user_read_notification.interface";



const initialState: IUserReadNotificationState = {
    modificationState: UserReadNotificationModificationStatus.None,
    selectedUserReadNotification: null,
    user_readed_notifications: [],
    user_not_readed_notifications: []
};

function userReadNotificationsReducer(state: IUserReadNotificationState = initialState, action: IActionBase): IUserReadNotificationState {
    switch (action.type) {
        case INITIAL_USER_READED_NOTIFICATION: {
            return { ...state, user_readed_notifications : [...state.user_readed_notifications, action.user_read_notification]};
        }
        case ADD_USER_READED_NOTIFICATION: {
            return { ...state, user_readed_notifications: [...state.user_readed_notifications, action.user_read_notification]};
        }
        case EDIT_USER_READED_NOTIFICATION: {
            const foundIndex: number = state.user_readed_notifications.findIndex(pr => pr.notification_id === action.user_read_notification.notification_id);
            let user_readed_notifications: IUserReadNotification[] = state.user_readed_notifications;
            user_readed_notifications[foundIndex] = action.user_read_notification;
            return { ...state, user_readed_notifications: user_readed_notifications };
        }
        case REMOVE_USER_READED_NOTIFICATION: {
            return { ...state, user_readed_notifications: state.user_readed_notifications.filter(pr => pr.notification_id !== action.notification_id) };
        }
        case REMOVE_USER_READED_NOTIFICATION_ALL: {
            return { ...state, user_readed_notifications: [] };
        }
        case CHANGE_USER_READED_NOTIFICATION_PENDING_EDIT: {
            return { ...state, selectedUserReadNotification: action.user_read_notification };
        }
        case CLEAR_USER_READED_NOTIFICATION_PENDING_EDIT: {
            return { ...state, selectedUserReadNotification: null };
        }

        case INITIAL_USER_NOT_READED_NOTIFICATION: {
            return { ...state, user_not_readed_notifications : [...state.user_not_readed_notifications, action.user_read_notification]};
        }
        case ADD_USER_NOT_READED_NOTIFICATION: {
            return { ...state, user_not_readed_notifications: [...state.user_not_readed_notifications, action.user_read_notification]};
        }
        case EDIT_USER_NOT_READED_NOTIFICATION: {
            const foundIndex: number = state.user_not_readed_notifications.findIndex(pr => pr.notification_id === action.user_read_notification.notification_id);
            let user_not_readed_notifications: IUserReadNotification[] = state.user_not_readed_notifications;
            user_not_readed_notifications[foundIndex] = action.user_read_notification;
            return { ...state, user_not_readed_notifications: user_not_readed_notifications };
        }
        case REMOVE_USER_NOT_READED_NOTIFICATION: {
            return { ...state, user_not_readed_notifications: state.user_not_readed_notifications.filter(pr => pr.notification_id !== action.notification_id) };
        }
        case REMOVE_USER_NOT_READED_NOTIFICATION_ALL: {
            return { ...state, user_not_readed_notifications: [] };
        }
        case CHANGE_USER_NOT_READED_NOTIFICATION_PENDING_EDIT: {
            return { ...state, selectedUserReadNotification: action.user_read_notification };
        }
        case CLEAR_USER_NOT_READED_NOTIFICATION_PENDING_EDIT: {
            return { ...state, selectedUserReadNotification: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default userReadNotificationsReducer;