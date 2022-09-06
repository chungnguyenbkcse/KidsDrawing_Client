import { IScheduleTimeClassState, IActionBase } from "../models/root.interface";
import { ADD_TIME_SCHEDULE, CHANGE_TIME_SCHEDULE_PENDING_EDIT, EDIT_TIME_SCHEDULE, REMOVE_TIME_SCHEDULE,
    CLEAR_TIME_SCHEDULE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TIME_SCHEDULE, REMOVE_TIME_SCHEDULE_ALL} from "../actions/schedule_time_class.action";
import { IScheduleTimeClass, ScheduleTimeClassModificationStatus } from "../models/schedule_time_class.interface";



const initialState: IScheduleTimeClassState = {
    modificationState: ScheduleTimeClassModificationStatus.None,
    selectedScheduleTimeClass: null,
    schedule_time_classes: []
};

function schedule_time_classsReducer(state: IScheduleTimeClassState = initialState, action: IActionBase): IScheduleTimeClassState {
    switch (action.type) {
        case INITIAL_TIME_SCHEDULE: {
            return { ...state, schedule_time_classes : [...state.schedule_time_classes, action.schedule_time_class]};
        }
        case ADD_TIME_SCHEDULE: {
            return { ...state, schedule_time_classes: [...state.schedule_time_classes, action.schedule_time_class]};
        }
        case EDIT_TIME_SCHEDULE: {
            let schedule_time_classs: IScheduleTimeClass[] = state.schedule_time_classes;
            schedule_time_classs[0] = action.schedule_time_class;
            return { ...state, schedule_time_classes: schedule_time_classs };
        }
        case REMOVE_TIME_SCHEDULE: {
            return { ...state, schedule_time_classes: [] };
        }
        case REMOVE_TIME_SCHEDULE_ALL: {
            return { ...state, schedule_time_classes: [] };
        }
        case CHANGE_TIME_SCHEDULE_PENDING_EDIT: {
            return { ...state, selectedScheduleTimeClass: action.schedule_time_class };
        }
        case CLEAR_TIME_SCHEDULE_PENDING_EDIT: {
            return { ...state, selectedScheduleTimeClass: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default schedule_time_classsReducer;