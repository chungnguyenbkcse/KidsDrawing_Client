import { IContestStudentState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST_STUDENT_OPENING, CHANGE_CONTEST_STUDENT_OPENING_PENDING_EDIT, EDIT_CONTEST_STUDENT_OPENING, REMOVE_CONTEST_STUDENT_OPENING,
    CLEAR_CONTEST_STUDENT_OPENING_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CONTEST_STUDENT_OPENING, REMOVE_CONTEST_STUDENT_OPENING_ALL, INITIAL_CONTEST_STUDENT_NEW, ADD_CONTEST_STUDENT_NEW, EDIT_CONTEST_STUDENT_NEW, REMOVE_CONTEST_STUDENT_NEW, REMOVE_CONTEST_STUDENT_NEW_ALL, CHANGE_CONTEST_STUDENT_NEW_PENDING_EDIT, CLEAR_CONTEST_STUDENT_NEW_PENDING_EDIT, INITIAL_CONTEST_STUDENT_END, EDIT_CONTEST_STUDENT_END, ADD_CONTEST_STUDENT_END, REMOVE_CONTEST_STUDENT_END, REMOVE_CONTEST_STUDENT_END_ALL, CHANGE_CONTEST_STUDENT_END_PENDING_EDIT, CLEAR_CONTEST_STUDENT_END_PENDING_EDIT, INITIAL_CONTEST_STUDENT_NOT_OPEN_NOW, ADD_CONTEST_STUDENT_NOT_OPEN_NOW, EDIT_CONTEST_STUDENT_NOT_OPEN_NOW, REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW, REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW_ALL, CHANGE_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT, CLEAR_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT} from "../actions/contest_student.action";
import { IContestStudent, ContestStudentModificationStatus } from "../models/contest_student.interface";



const initialState: IContestStudentState = {
    modificationState: ContestStudentModificationStatus.None,
    selectedContestStudent: null,
    contest_opening: [],
    contest_not_open_now: [],
    contest_end: [],
    contest_new: []
};

function contestStudentsReducer(state: IContestStudentState = initialState, action: IActionBase): IContestStudentState {
    switch (action.type) {
        case INITIAL_CONTEST_STUDENT_OPENING: {
            return { ...state, contest_opening : [...state.contest_opening, action.contest]};
        }
        case ADD_CONTEST_STUDENT_OPENING: {
            return { ...state, contest_opening: [...state.contest_opening, action.contest]};
        }
        case EDIT_CONTEST_STUDENT_OPENING: {
            const foundIndex: number = state.contest_opening.findIndex(pr => pr.id === action.contest.id);
            let contest_opening: IContestStudent[] = state.contest_opening;
            contest_opening[foundIndex] = action.contest;
            return { ...state, contest_opening: contest_opening };
        }
        case REMOVE_CONTEST_STUDENT_OPENING: {
            return { ...state, contest_opening: state.contest_opening.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_STUDENT_OPENING_ALL: {
            return { ...state, contest_opening: [] };
        }
        case CHANGE_CONTEST_STUDENT_OPENING_PENDING_EDIT: {
            return { ...state, selectedContestStudent: action.contest };
        }
        case CLEAR_CONTEST_STUDENT_OPENING_PENDING_EDIT: {
            return { ...state, selectedContestStudent: null };
        }


        case INITIAL_CONTEST_STUDENT_END: {
            return { ...state, contest_end : [...state.contest_end, action.contest]};
        }
        case ADD_CONTEST_STUDENT_END: {
            return { ...state, contest_end: [...state.contest_end, action.contest]};
        }
        case EDIT_CONTEST_STUDENT_END: {
            const foundIndex: number = state.contest_end.findIndex(pr => pr.id === action.contest.id);
            let contest_end: IContestStudent[] = state.contest_end;
            contest_end[foundIndex] = action.contest;
            return { ...state, contest_end: contest_end };
        }
        case REMOVE_CONTEST_STUDENT_END: {
            return { ...state, contest_end: state.contest_end.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_STUDENT_END_ALL: {
            return { ...state, contest_end: [] };
        }
        case CHANGE_CONTEST_STUDENT_END_PENDING_EDIT: {
            return { ...state, selectedContestStudent: action.contest };
        }
        case CLEAR_CONTEST_STUDENT_END_PENDING_EDIT: {
            return { ...state, selectedContestStudent: null };
        }



        case INITIAL_CONTEST_STUDENT_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now : [...state.contest_not_open_now, action.contest]};
        }
        case ADD_CONTEST_STUDENT_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: [...state.contest_not_open_now, action.contest]};
        }
        case EDIT_CONTEST_STUDENT_NOT_OPEN_NOW: {
            const foundIndex: number = state.contest_not_open_now.findIndex(pr => pr.id === action.contest.id);
            let contest_not_open_now: IContestStudent[] = state.contest_not_open_now;
            contest_not_open_now[foundIndex] = action.contest;
            return { ...state, contest_not_open_now: contest_not_open_now };
        }
        case REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: state.contest_not_open_now.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_STUDENT_NOT_OPEN_NOW_ALL: {
            return { ...state, contest_not_open_now: [] };
        }
        case CHANGE_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContestStudent: action.contest };
        }
        case CLEAR_CONTEST_STUDENT_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContestStudent: null };
        }



        case INITIAL_CONTEST_STUDENT_NEW: {
            return { ...state, contest_new : [...state.contest_new, action.contest]};
        }
        case ADD_CONTEST_STUDENT_NEW: {
            return { ...state, contest_new: [...state.contest_new, action.contest]};
        }
        case EDIT_CONTEST_STUDENT_NEW: {
            const foundIndex: number = state.contest_new.findIndex(pr => pr.id === action.contest.id);
            let contest_new: IContestStudent[] = state.contest_new;
            contest_new[foundIndex] = action.contest;
            return { ...state, contest_new: contest_new };
        }
        case REMOVE_CONTEST_STUDENT_NEW: {
            return { ...state, contest_new: state.contest_new.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_STUDENT_NEW_ALL: {
            return { ...state, contest_new: [] };
        }
        case CHANGE_CONTEST_STUDENT_NEW_PENDING_EDIT: {
            return { ...state, selectedContestStudent: action.contest };
        }
        case CLEAR_CONTEST_STUDENT_NEW_PENDING_EDIT: {
            return { ...state, selectedContestStudent: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default contestStudentsReducer;