import { ITimeScheduleTeacherState, IActionBase } from "../models/root.interface";
import { ADD_TIME_SCHEDULE_TEACHER, CHANGE_TIME_SCHEDULE_TEACHER_PENDING_EDIT, EDIT_TIME_SCHEDULE_TEACHER, REMOVE_TIME_SCHEDULE_TEACHER,
    CLEAR_TIME_SCHEDULE_TEACHER_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TIME_SCHEDULE_TEACHER, REMOVE_TIME_SCHEDULE_TEACHER_ALL} from "../actions/time_schedule_teacher.action";
import { ITimeScheduleTeacher, TimeScheduleTeacherModificationStatus } from "../models/time_schedule_teacher.interface";



const initialState: ITimeScheduleTeacherState = {
    modificationState: TimeScheduleTeacherModificationStatus.None,
    selectedTimeScheduleTeacher: null,
    timeScheduleTeachers: []
};

function time_schedule_teachersReducer(state: ITimeScheduleTeacherState = initialState, action: IActionBase): ITimeScheduleTeacherState {
    switch (action.type) {
        case INITIAL_TIME_SCHEDULE_TEACHER: {
            return { ...state, timeScheduleTeachers : [...state.timeScheduleTeachers, action.time_schedule_teacher]};
        }
        case ADD_TIME_SCHEDULE_TEACHER: {
            return { ...state, timeScheduleTeachers: [...state.timeScheduleTeachers, action.time_schedule_teacher]};
        }
        case EDIT_TIME_SCHEDULE_TEACHER: {
            let time_schedule_teachers: ITimeScheduleTeacher[] = state.timeScheduleTeachers;
            time_schedule_teachers[0] = action.time_schedule_teacher;
            return { ...state, timeScheduleTeachers: time_schedule_teachers };
        }
        case REMOVE_TIME_SCHEDULE_TEACHER: {
            return { ...state, timeScheduleTeachers: [] };
        }
        case REMOVE_TIME_SCHEDULE_TEACHER_ALL: {
            return { ...state, timeScheduleTeachers: [] };
        }
        case CHANGE_TIME_SCHEDULE_TEACHER_PENDING_EDIT: {
            return { ...state, selectedTimeScheduleTeacher: action.time_schedule_teacher };
        }
        case CLEAR_TIME_SCHEDULE_TEACHER_PENDING_EDIT: {
            return { ...state, selectedTimeScheduleTeacher: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default time_schedule_teachersReducer;