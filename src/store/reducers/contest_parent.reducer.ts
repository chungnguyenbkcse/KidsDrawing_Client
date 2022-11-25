import { IContestParentState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST_PARENT_OPENING, CHANGE_CONTEST_PARENT_OPENING_PENDING_EDIT, EDIT_CONTEST_PARENT_OPENING, REMOVE_CONTEST_PARENT_OPENING,
    CLEAR_CONTEST_PARENT_OPENING_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CONTEST_PARENT_OPENING, REMOVE_CONTEST_PARENT_OPENING_ALL, INITIAL_CONTEST_PARENT_NEW, ADD_CONTEST_PARENT_NEW, EDIT_CONTEST_PARENT_NEW, REMOVE_CONTEST_PARENT_NEW, REMOVE_CONTEST_PARENT_NEW_ALL, CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT, CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT, INITIAL_CONTEST_PARENT_END, EDIT_CONTEST_PARENT_END, ADD_CONTEST_PARENT_END, REMOVE_CONTEST_PARENT_END, REMOVE_CONTEST_PARENT_END_ALL, CHANGE_CONTEST_PARENT_END_PENDING_EDIT, CLEAR_CONTEST_PARENT_END_PENDING_EDIT, INITIAL_CONTEST_PARENT_NOT_OPEN_NOW, ADD_CONTEST_PARENT_NOT_OPEN_NOW, EDIT_CONTEST_PARENT_NOT_OPEN_NOW, REMOVE_CONTEST_PARENT_NOT_OPEN_NOW, REMOVE_CONTEST_PARENT_NOT_OPEN_NOW_ALL, CHANGE_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT, CLEAR_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT} from "../actions/contest_parent.action";
import { IContestParent, ContestParentModificationStatus } from "../models/contest_parent.interface";



const initialState: IContestParentState = {
    modificationState: ContestParentModificationStatus.None,
    selectedContestParent: null,
    contest_opening: [],
    contest_not_open_now: [],
    contest_end: [],
    contest_new: []
};

function contestParentsReducer(state: IContestParentState = initialState, action: IActionBase): IContestParentState {
    switch (action.type) {
        case INITIAL_CONTEST_PARENT_OPENING: {
            return { ...state, contest_opening : [...state.contest_opening, action.contest]};
        }
        case ADD_CONTEST_PARENT_OPENING: {
            return { ...state, contest_opening: [...state.contest_opening, action.contest]};
        }
        case EDIT_CONTEST_PARENT_OPENING: {
            const foundIndex: number = state.contest_opening.findIndex(pr => pr.id === action.contest.id);
            let contest_opening: IContestParent[] = state.contest_opening;
            contest_opening[foundIndex] = action.contest;
            return { ...state, contest_opening: contest_opening };
        }
        case REMOVE_CONTEST_PARENT_OPENING: {
            return { ...state, contest_opening: state.contest_opening.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_PARENT_OPENING_ALL: {
            return { ...state, contest_opening: [] };
        }
        case CHANGE_CONTEST_PARENT_OPENING_PENDING_EDIT: {
            return { ...state, selectedContestParent: action.contest };
        }
        case CLEAR_CONTEST_PARENT_OPENING_PENDING_EDIT: {
            return { ...state, selectedContestParent: null };
        }


        case INITIAL_CONTEST_PARENT_END: {
            return { ...state, contest_end : [...state.contest_end, action.contest]};
        }
        case ADD_CONTEST_PARENT_END: {
            return { ...state, contest_end: [...state.contest_end, action.contest]};
        }
        case EDIT_CONTEST_PARENT_END: {
            const foundIndex: number = state.contest_end.findIndex(pr => pr.id === action.contest.id);
            let contest_end: IContestParent[] = state.contest_end;
            contest_end[foundIndex] = action.contest;
            return { ...state, contest_end: contest_end };
        }
        case REMOVE_CONTEST_PARENT_END: {
            return { ...state, contest_end: state.contest_end.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_PARENT_END_ALL: {
            return { ...state, contest_end: [] };
        }
        case CHANGE_CONTEST_PARENT_END_PENDING_EDIT: {
            return { ...state, selectedContestParent: action.contest };
        }
        case CLEAR_CONTEST_PARENT_END_PENDING_EDIT: {
            return { ...state, selectedContestParent: null };
        }



        case INITIAL_CONTEST_PARENT_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now : [...state.contest_not_open_now, action.contest]};
        }
        case ADD_CONTEST_PARENT_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: [...state.contest_not_open_now, action.contest]};
        }
        case EDIT_CONTEST_PARENT_NOT_OPEN_NOW: {
            const foundIndex: number = state.contest_not_open_now.findIndex(pr => pr.id === action.contest.id);
            let contest_not_open_now: IContestParent[] = state.contest_not_open_now;
            contest_not_open_now[foundIndex] = action.contest;
            return { ...state, contest_not_open_now: contest_not_open_now };
        }
        case REMOVE_CONTEST_PARENT_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: state.contest_not_open_now.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_PARENT_NOT_OPEN_NOW_ALL: {
            return { ...state, contest_not_open_now: [] };
        }
        case CHANGE_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContestParent: action.contest };
        }
        case CLEAR_CONTEST_PARENT_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContestParent: null };
        }



        case INITIAL_CONTEST_PARENT_NEW: {
            return { ...state, contest_new : [...state.contest_new, action.contest]};
        }
        case ADD_CONTEST_PARENT_NEW: {
            return { ...state, contest_new: [...state.contest_new, action.contest]};
        }
        case EDIT_CONTEST_PARENT_NEW: {
            const foundIndex: number = state.contest_new.findIndex(pr => pr.id === action.contest.id);
            let contest_new: IContestParent[] = state.contest_new;
            contest_new[foundIndex] = action.contest;
            return { ...state, contest_new: contest_new };
        }
        case REMOVE_CONTEST_PARENT_NEW: {
            return { ...state, contest_new: state.contest_new.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_PARENT_NEW_ALL: {
            return { ...state, contest_new: [] };
        }
        case CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT: {
            return { ...state, selectedContestParent: action.contest };
        }
        case CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT: {
            return { ...state, selectedContestParent: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default contestParentsReducer;