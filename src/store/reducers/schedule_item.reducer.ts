import { IScheduleItemState, IActionBase } from "../models/root.interface";
import { ADD_SCHEDULE_ITEM, CHANGE_SCHEDULE_ITEM_PENDING_EDIT, EDIT_SCHEDULE_ITEM, REMOVE_SCHEDULE_ITEM,
    CLEAR_SCHEDULE_ITEM_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_SCHEDULE_ITEM, REMOVE_SCHEDULE_ITEM_ALL} from "../actions/schedule_item.action";
import { IScheduleItem, ScheduleItemModificationStatus } from "../models/schedule_item.interface";



const initialState: IScheduleItemState = {
    modificationState: ScheduleItemModificationStatus.None,
    selectedScheduleItem: null,
    schedule_items: []
};

function schedule_itemsReducer(state: IScheduleItemState = initialState, action: IActionBase): IScheduleItemState {
    switch (action.type) {
        case INITIAL_SCHEDULE_ITEM: {
            return { ...state, schedule_items : [...state.schedule_items, action.schedule_item]};
        }
        case ADD_SCHEDULE_ITEM: {
            return { ...state, schedule_items: [...state.schedule_items, action.schedule_item]};
        }
        case EDIT_SCHEDULE_ITEM: {
            const foundIndex: number = state.schedule_items.findIndex(pr => pr.id === action.schedule_item.id);
            let schedule_items: IScheduleItem[] = state.schedule_items;
            schedule_items[foundIndex] = action.schedule_item;
            return { ...state, schedule_items: schedule_items };
        }
        case REMOVE_SCHEDULE_ITEM: {
            return { ...state, schedule_items: state.schedule_items.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SCHEDULE_ITEM_ALL: {
            return { ...state, schedule_items: [] };
        }
        case CHANGE_SCHEDULE_ITEM_PENDING_EDIT: {
            return { ...state, selectedScheduleItem: action.schedule_item };
        }
        case CLEAR_SCHEDULE_ITEM_PENDING_EDIT: {
            return { ...state, selectedScheduleItem: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default schedule_itemsReducer;