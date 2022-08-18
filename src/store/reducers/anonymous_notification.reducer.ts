import { IAnonymousNotificationState, IActionBase } from "../models/root.interface";
import { ADD_ANONYMOUS_NOTIFICATION, CHANGE_ANONYMOUS_NOTIFICATION_PENDING_EDIT, EDIT_ANONYMOUS_NOTIFICATION, REMOVE_ANONYMOUS_NOTIFICATION,
    CLEAR_ANONYMOUS_NOTIFICATION_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_ANONYMOUS_NOTIFICATION, REMOVE_ANONYMOUS_NOTIFICATION_ALL} from "../actions/anonymous_notification.action";
import { IAnonymousNotification, AnonymousNotificationModificationStatus } from "../models/anonymous_notification.interface";



const initialState: IAnonymousNotificationState = {
    modificationState: AnonymousNotificationModificationStatus.None,
    selectedAnonymousNotification: null,
    notifications: []
};

function anonymousNotificationsReducer(state: IAnonymousNotificationState = initialState, action: IActionBase): IAnonymousNotificationState {
    switch (action.type) {
        case INITIAL_ANONYMOUS_NOTIFICATION: {
            return { ...state, notifications : [...state.notifications, action.anonymous_notification]};
        }
        case ADD_ANONYMOUS_NOTIFICATION: {
            return { ...state, notifications: [...state.notifications, action.anonymous_notification]};
        }
        case EDIT_ANONYMOUS_NOTIFICATION: {
            const foundIndex: number = state.notifications.findIndex(pr => pr.id === action.anonymous_notification.id);
            let notifications: IAnonymousNotification[] = state.notifications;
            notifications[foundIndex] = action.anonymous_notification;
            return { ...state, notifications: notifications };
        }
        case REMOVE_ANONYMOUS_NOTIFICATION: {
            return { ...state, notifications: state.notifications.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_ANONYMOUS_NOTIFICATION_ALL: {
            return { ...state, notifications: [] };
        }
        case CHANGE_ANONYMOUS_NOTIFICATION_PENDING_EDIT: {
            return { ...state, selectedAnonymousNotification: action.anonymous_notification };
        }
        case CLEAR_ANONYMOUS_NOTIFICATION_PENDING_EDIT: {
            return { ...state, selectedAnonymousNotification: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default anonymousNotificationsReducer;