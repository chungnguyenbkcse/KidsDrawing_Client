import { IContestState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST_OPENING, CHANGE_CONTEST_OPENING_PENDING_EDIT, EDIT_CONTEST_OPENING, REMOVE_CONTEST_OPENING,
    CLEAR_CONTEST_OPENING_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CONTEST_OPENING, REMOVE_CONTEST_OPENING_ALL, INITIAL_CONTEST_END, EDIT_CONTEST_END, ADD_CONTEST_END, REMOVE_CONTEST_END, REMOVE_CONTEST_END_ALL, CHANGE_CONTEST_END_PENDING_EDIT, CLEAR_CONTEST_END_PENDING_EDIT, INITIAL_CONTEST_NOT_OPEN_NOW, ADD_CONTEST_NOT_OPEN_NOW, EDIT_CONTEST_NOT_OPEN_NOW, REMOVE_CONTEST_NOT_OPEN_NOW, REMOVE_CONTEST_NOT_OPEN_NOW_ALL, CHANGE_CONTEST_NOT_OPEN_NOW_PENDING_EDIT, CLEAR_CONTEST_NOT_OPEN_NOW_PENDING_EDIT} from "../actions/contest.action";
import { IContest, ContestModificationStatus } from "../models/contest.interface";



const initialState: IContestState = {
    modificationState: ContestModificationStatus.None,
    selectedContest: null,
    contest_opening: [],
    contest_not_open_now: [],
    contest_end: []
};

function contestsReducer(state: IContestState = initialState, action: IActionBase): IContestState {
    switch (action.type) {
        case INITIAL_CONTEST_OPENING: {
            return { ...state, contest_opening : [...state.contest_opening, action.contest]};
        }
        case ADD_CONTEST_OPENING: {
            return { ...state, contest_opening: [...state.contest_opening, action.contest]};
        }
        case EDIT_CONTEST_OPENING: {
            const foundIndex: number = state.contest_opening.findIndex(pr => pr.id === action.contest.id);
            let contest_opening: IContest[] = state.contest_opening;
            contest_opening[foundIndex] = action.contest;
            return { ...state, contest_opening: contest_opening };
        }
        case REMOVE_CONTEST_OPENING: {
            return { ...state, contest_opening: state.contest_opening.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_OPENING_ALL: {
            return { ...state, contest_opening: [] };
        }
        case CHANGE_CONTEST_OPENING_PENDING_EDIT: {
            return { ...state, selectedContest: action.contest };
        }
        case CLEAR_CONTEST_OPENING_PENDING_EDIT: {
            return { ...state, selectedContest: null };
        }


        case INITIAL_CONTEST_END: {
            return { ...state, contest_end : [...state.contest_end, action.contest]};
        }
        case ADD_CONTEST_END: {
            return { ...state, contest_end: [...state.contest_end, action.contest]};
        }
        case EDIT_CONTEST_END: {
            const foundIndex: number = state.contest_end.findIndex(pr => pr.id === action.contest.id);
            let contest_end: IContest[] = state.contest_end;
            contest_end[foundIndex] = action.contest;
            return { ...state, contest_end: contest_end };
        }
        case REMOVE_CONTEST_END: {
            return { ...state, contest_end: state.contest_end.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_END_ALL: {
            return { ...state, contest_end: [] };
        }
        case CHANGE_CONTEST_END_PENDING_EDIT: {
            return { ...state, selectedContest: action.contest };
        }
        case CLEAR_CONTEST_END_PENDING_EDIT: {
            return { ...state, selectedContest: null };
        }



        case INITIAL_CONTEST_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now : [...state.contest_not_open_now, action.contest]};
        }
        case ADD_CONTEST_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: [...state.contest_not_open_now, action.contest]};
        }
        case EDIT_CONTEST_NOT_OPEN_NOW: {
            const foundIndex: number = state.contest_not_open_now.findIndex(pr => pr.id === action.contest.id);
            let contest_not_open_now: IContest[] = state.contest_not_open_now;
            contest_not_open_now[foundIndex] = action.contest;
            return { ...state, contest_not_open_now: contest_not_open_now };
        }
        case REMOVE_CONTEST_NOT_OPEN_NOW: {
            return { ...state, contest_not_open_now: state.contest_not_open_now.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_NOT_OPEN_NOW_ALL: {
            return { ...state, contest_not_open_now: [] };
        }
        case CHANGE_CONTEST_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContest: action.contest };
        }
        case CLEAR_CONTEST_NOT_OPEN_NOW_PENDING_EDIT: {
            return { ...state, selectedContest: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default contestsReducer;