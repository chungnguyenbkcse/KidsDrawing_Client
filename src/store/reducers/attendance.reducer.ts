import { IAttendanceState, IActionBase } from "../models/root.interface";
import { ADD_ATTENDANCE, CHANGE_ATTENDANCE_PENDING_EDIT, EDIT_ATTENDANCE, REMOVE_ATTENDANCE,
    CLEAR_ATTENDANCE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_ATTENDANCE, REMOVE_ATTENDANCE_ALL} from "../actions/attendance.action";
import { IAttendance, AttendanceModificationStatus } from "../models/attendance.interface";



const initialState: IAttendanceState = {
    modificationState: AttendanceModificationStatus.None,
    selectedAttendance: null,
    attendances: []
};

function attendancesReducer(state: IAttendanceState = initialState, action: IActionBase): IAttendanceState {
    switch (action.type) {
        case INITIAL_ATTENDANCE: {
            return { ...state, attendances : [...state.attendances, action.attendance]};
        }
        case ADD_ATTENDANCE: {
            return { ...state, attendances: [...state.attendances, action.attendance]};
        }
        case EDIT_ATTENDANCE: {
            const foundIndex: number = state.attendances.findIndex(pr => pr.id === action.attendance.id);
            let attendances: IAttendance[] = state.attendances;
            attendances[foundIndex] = action.attendance;
            return { ...state, attendances: attendances };
        }
        case REMOVE_ATTENDANCE: {
            return { ...state, attendances: state.attendances.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_ATTENDANCE_ALL: {
            return { ...state, attendances: [] };
        }
        case CHANGE_ATTENDANCE_PENDING_EDIT: {
            return { ...state, selectedAttendance: action.attendance };
        }
        case CLEAR_ATTENDANCE_PENDING_EDIT: {
            return { ...state, selectedAttendance: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default attendancesReducer;