import { INotifyDbState, IActionBase } from "../models/root.interface";
import { ADD_NOTIFY_DB, CHANGE_NOTIFY_DB_PENDING_EDIT, EDIT_NOTIFY_DB, REMOVE_NOTIFY_DB,
    CLEAR_NOTIFY_DB_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_NOTIFY_DB, REMOVE_NOTIFY_DB_ALL} from "../actions/notify_db.action";
import { INotifyDb, NotifyDbModificationStatus } from "../models/notify_db.interface";



const initialState: INotifyDbState = {
    modificationState: NotifyDbModificationStatus.None,
    selectedNotifyDb: null,
    notify_dbs: []
};

function notify_dbsReducer(state: INotifyDbState = initialState, action: IActionBase): INotifyDbState {
    switch (action.type) {
        case INITIAL_NOTIFY_DB: {
            return { ...state, notify_dbs : [...state.notify_dbs, action.notify_db]};
        }
        case ADD_NOTIFY_DB: {
            return { ...state, notify_dbs: [...state.notify_dbs, action.notify_db]};
        }
        case EDIT_NOTIFY_DB: {
            const foundIndex: number = state.notify_dbs.findIndex(pr => pr.id === action.notify_db.id);
            let notify_dbs: INotifyDb[] = state.notify_dbs;
            notify_dbs[foundIndex] = action.notify_db;
            return { ...state, notify_dbs: notify_dbs };
        }
        case REMOVE_NOTIFY_DB: {
            return { ...state, notify_dbs: state.notify_dbs.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_NOTIFY_DB_ALL: {
            return { ...state, notify_dbs: [] };
        }
        case CHANGE_NOTIFY_DB_PENDING_EDIT: {
            return { ...state, selectedNotifyDb: action.notify_db };
        }
        case CLEAR_NOTIFY_DB_PENDING_EDIT: {
            return { ...state, selectedNotifyDb: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default notify_dbsReducer;