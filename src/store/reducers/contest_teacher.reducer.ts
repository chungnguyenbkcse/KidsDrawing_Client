import { IContestTeacherState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST_TEACHER_OPENING, CHANGE_CONTEST_TEACHER_OPENING_PENDING_EDIT, EDIT_CONTEST_TEACHER_OPENING, REMOVE_CONTEST_TEACHER_OPENING,
    CLEAR_CONTEST_TEACHER_OPENING_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CONTEST_TEACHER_OPENING, REMOVE_CONTEST_TEACHER_OPENING_ALL, INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, ADD_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, EDIT_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER, REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_ALL, CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT, CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT, INITIAL_CONTEST_TEACHER_END, EDIT_CONTEST_TEACHER_END, ADD_CONTEST_TEACHER_END, REMOVE_CONTEST_TEACHER_END, REMOVE_CONTEST_TEACHER_END_ALL, CHANGE_CONTEST_TEACHER_END_PENDING_EDIT, CLEAR_CONTEST_TEACHER_END_PENDING_EDIT, INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW, ADD_CONTEST_TEACHER_NOT_OPEN_NOW, EDIT_CONTEST_TEACHER_NOT_OPEN_NOW, REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW, REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_ALL, CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT, CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT} from "../actions/contest_teacher.action";
import { IContestTeacher, ContestTeacherModificationStatus } from "../models/contest_teacher.interface";



const initialState: IContestTeacherState = {
    modificationState: ContestTeacherModificationStatus.None,
    selectedContestTeacher: null,
    contest_opening: [],
    contest_not_open_now: [],
    contest_end: [],
    contest_not_open_now_not_teacher: []
};

function contestTeachersReducer(state: IContestTeacherState = initialState, action: IActionBase): IContestTeacherState {
    switch (action.type) {
        case INITIAL_CONTEST_TEACHER_OPENING: {
            return { ...state, contest_opening : [...state.contest_opening, action.contest]};
        }
        case ADD_CONTEST_TEACHER_OPENING: {
            return { ...state, contest_opening: [...state.contest_opening, action.contest]};
        }
        case EDIT_CONTEST_TEACHER_OPENING: {
            const foundIndex: number = state.contest_opening.findIndex(pr => pr.id === action.contest.id);
            let contest_opening: IContestTeacher[] = state.contest_opening;
            contest_opening[foundIndex] = action.contest;
            return { ...state, contest_opening: contest_opening };
        }
        case REMOVE_CONTEST_TEACHER_OPENING: {
            return { ...state, contest_opening: state.contest_opening.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_TEACHER_OPENING_ALL: {
            return { ...state, contest_opening: [] };
        }
        case CHANGE_CONTEST_TEACHER_OPENING_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: action.contest };
        }
        case CLEAR_CONTEST_TEACHER_OPENING_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: null };
        }


        case INITIAL_CONTEST_TEACHER_END: {
            return { ...state, contest_end : [...state.contest_end, action.contest]};
        }
        case ADD_CONTEST_TEACHER_END: {
            return { ...state, contest_end: [...state.contest_end, action.contest]};
        }
        case EDIT_CONTEST_TEACHER_END: {
            const foundIndex: number = state.contest_end.findIndex(pr => pr.id === action.contest.id);
            let contest_end: IContestTeacher[] = state.contest_end;
            contest_end[foundIndex] = action.contest;
            return { ...state, contest_end: contest_end };
        }
        case REMOVE_CONTEST_TEACHER_END: {
            return { ...state, contest_end: state.contest_end.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_TEACHER_END_ALL: {
            return { ...state, contest_end: [] };
        }
        case CHANGE_CONTEST_TEACHER_END_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: action.contest };
        }
        case CLEAR_CONTEST_TEACHER_END_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: null };
        }



        case INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now : [...state.contest_not_open_now, action.contest]};
        }
        case ADD_CONTEST_TEACHER_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: [...state.contest_not_open_now, action.contest]};
        }
        case EDIT_CONTEST_TEACHER_NOT_OPEN_NOW: {
            const foundIndex: number = state.contest_not_open_now.findIndex(pr => pr.id === action.contest.id);
            let contest_not_open_now: IContestTeacher[] = state.contest_not_open_now;
            contest_not_open_now[foundIndex] = action.contest;
            return { ...state, contest_not_open_now: contest_not_open_now };
        }
        case REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: state.contest_not_open_now.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_ALL: {
            return { ...state, contest_not_open_now: [] };
        }
        case CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: action.contest };
        }
        case CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: null };
        }



        case INITIAL_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: {
            return { ...state, contest_not_open_now_not_teacher : [...state.contest_not_open_now_not_teacher, action.contest]};
        }
        case ADD_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: {
            return { ...state, contest_not_open_now_not_teacher: [...state.contest_not_open_now_not_teacher, action.contest]};
        }
        case EDIT_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: {
            const foundIndex: number = state.contest_not_open_now_not_teacher.findIndex(pr => pr.id === action.contest.id);
            let contest_not_open_now_not_teacher: IContestTeacher[] = state.contest_not_open_now_not_teacher;
            contest_not_open_now_not_teacher[foundIndex] = action.contest;
            return { ...state, contest_not_open_now_not_teacher: contest_not_open_now_not_teacher };
        }
        case REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER: {
            return { ...state, contest_not_open_now_not_teacher: state.contest_not_open_now_not_teacher.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_ALL: {
            return { ...state, contest_not_open_now_not_teacher: [] };
        }
        case CHANGE_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: action.contest };
        }
        case CLEAR_CONTEST_TEACHER_NOT_OPEN_NOW_NOT_TEACHER_PENDING_EDIT: {
            return { ...state, selectedContestTeacher: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default contestTeachersReducer;