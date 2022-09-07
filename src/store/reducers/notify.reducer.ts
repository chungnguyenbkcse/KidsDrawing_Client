import { INotifyState, IActionBase } from "../models/root.interface";
import { ADD_NOTIFY, CHANGE_NOTIFY_PENDING_EDIT, EDIT_NOTIFY, REMOVE_NOTIFY,
    CLEAR_NOTIFY_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_NOTIFY, REMOVE_NOTIFY_ALL} from "../actions/notify.action";
import { INotify, NotifyModificationStatus } from "../models/notify.interface";



const initialState: INotifyState = {
    modificationState: NotifyModificationStatus.None,
    selectedNotify: null,
    notifys: []
};

function notifysReducer(state: INotifyState = initialState, action: IActionBase): INotifyState {
    switch (action.type) {
        case INITIAL_NOTIFY: {
            return { ...state, notifys: [...state.notifys, action.notify]};
        }
        case ADD_NOTIFY: {
            return { ...state, notifys: [...state.notifys, action.notify]};
        }
        case EDIT_NOTIFY: {
            const foundIndex: number = state.notifys.findIndex(pr => pr.idx === action.notify.id);
            let notifys: INotify[] = state.notifys;
            notifys[foundIndex] = action.notify;
            return { ...state, notifys: notifys };
        }
        case REMOVE_NOTIFY: {
            return { ...state, notifys: state.notifys.filter(pr => pr.idx !== action.id) };
        }
        case REMOVE_NOTIFY_ALL: {
            return { ...state, notifys: [] };
        }
        case CHANGE_NOTIFY_PENDING_EDIT: {
            return { ...state, selectedNotify: action.notify };
        }
        case CLEAR_NOTIFY_PENDING_EDIT: {
            return { ...state, selectedNotify: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default notifysReducer;