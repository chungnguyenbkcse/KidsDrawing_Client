import { ITimeScheduleState, IActionBase } from "../models/root.interface";
import { ADD_TIME_SCHEDULE, CHANGE_TIME_SCHEDULE_PENDING_EDIT, EDIT_TIME_SCHEDULE, REMOVE_TIME_SCHEDULE,
    CLEAR_TIME_SCHEDULE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TIME_SCHEDULE, REMOVE_TIME_SCHEDULE_ALL} from "../actions/time_schedule.action";
import { ITimeSchedule, TimeScheduleModificationStatus } from "../models/time_schedule.interface";



const initialState: ITimeScheduleState = {
    modificationState: TimeScheduleModificationStatus.None,
    selectedTimeSchedule: null,
    timeSchedules: []
};

function time_schedulesReducer(state: ITimeScheduleState = initialState, action: IActionBase): ITimeScheduleState {
    switch (action.type) {
        case INITIAL_TIME_SCHEDULE: {
            return { ...state, timeSchedules : [...state.timeSchedules, action.time_schedule]};
        }
        case ADD_TIME_SCHEDULE: {
            return { ...state, timeSchedules: [...state.timeSchedules, action.time_schedule]};
        }
        case EDIT_TIME_SCHEDULE: {
            let time_schedules: ITimeSchedule[] = state.timeSchedules;
            time_schedules[0] = action.time_schedule;
            return { ...state, timeSchedules: time_schedules };
        }
        case REMOVE_TIME_SCHEDULE: {
            return { ...state, timeSchedules: [] };
        }
        case REMOVE_TIME_SCHEDULE_ALL: {
            return { ...state, timeSchedules: [] };
        }
        case CHANGE_TIME_SCHEDULE_PENDING_EDIT: {
            return { ...state, selectedTimeSchedule: action.time_schedule };
        }
        case CLEAR_TIME_SCHEDULE_PENDING_EDIT: {
            return { ...state, selectedTimeSchedule: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default time_schedulesReducer;