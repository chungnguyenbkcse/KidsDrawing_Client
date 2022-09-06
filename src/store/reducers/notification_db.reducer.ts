import { INotificationDbState, IActionBase } from "../models/root.interface";
import { ADD_NOTIFICATION_DB, CHANGE_NOTIFICATION_DB_PENDING_EDIT, EDIT_NOTIFICATION_DB, REMOVE_NOTIFICATION_DB,
    CLEAR_NOTIFICATION_DB_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_NOTIFICATION_DB, REMOVE_NOTIFICATION_DB_ALL} from "../actions/notification_db.action";
import { INotificationDb, NotificationDbModificationStatus } from "../models/notification_db.interface";



const initialState: INotificationDbState = {
    modificationState: NotificationDbModificationStatus.None,
    selectedNotificationDb: null,
    notification_dbs: []
};

function notification_dbsReducer(state: INotificationDbState = initialState, action: IActionBase): INotificationDbState {
    switch (action.type) {
        case INITIAL_NOTIFICATION_DB: {
            return { ...state, notification_dbs : [...state.notification_dbs, action.notification_db]};
        }
        case ADD_NOTIFICATION_DB: {
            return { ...state, notification_dbs: [...state.notification_dbs, action.notification_db]};
        }
        case EDIT_NOTIFICATION_DB: {
            const foundIndex: number = state.notification_dbs.findIndex(pr => pr.id === action.notification_db.id);
            let notification_dbs: INotificationDb[] = state.notification_dbs;
            notification_dbs[foundIndex] = action.notification_db;
            return { ...state, notification_dbs: notification_dbs };
        }
        case REMOVE_NOTIFICATION_DB: {
            return { ...state, notification_dbs: state.notification_dbs.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_NOTIFICATION_DB_ALL: {
            return { ...state, notification_dbs: [] };
        }
        case CHANGE_NOTIFICATION_DB_PENDING_EDIT: {
            return { ...state, selectedNotificationDb: action.notification_db };
        }
        case CLEAR_NOTIFICATION_DB_PENDING_EDIT: {
            return { ...state, selectedNotificationDb: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default notification_dbsReducer;