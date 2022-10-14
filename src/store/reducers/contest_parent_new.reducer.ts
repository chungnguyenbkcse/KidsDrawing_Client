import { IContestParentNewState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST_PARENT_NEW, CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT, EDIT_CONTEST_PARENT_NEW, REMOVE_CONTEST_PARENT_NEW,
    CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CONTEST_PARENT_NEW, REMOVE_CONTEST_PARENT_NEW_ALL} from "../actions/contest_parent_new.action";
import { IContestParentNew, ContestParentNewModificationStatus } from "../models/contest_parent_new.interface";



const initialState: IContestParentNewState = {
    modificationState: ContestParentNewModificationStatus.None,
    selectedContestParentNew: null,
    contests: []
};

function contest_parent_newsReducer(state: IContestParentNewState = initialState, action: IActionBase): IContestParentNewState {
    switch (action.type) {
        case INITIAL_CONTEST_PARENT_NEW: {
            return { ...state, contests : [...state.contests, action.contest_parent_new]};
        }
        case ADD_CONTEST_PARENT_NEW: {
            return { ...state, contests: [...state.contests, action.contest_parent_new]};
        }
        case EDIT_CONTEST_PARENT_NEW: {
            const foundIndex: number = state.contests.findIndex(pr => pr.id === action.contest_parent_new.id);
            let contests: IContestParentNew[] = state.contests;
            contests[foundIndex] = action.contest_parent_new;
            return { ...state, contests: contests };
        }
        case REMOVE_CONTEST_PARENT_NEW: {
            return { ...state, contests: state.contests.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_PARENT_NEW_ALL: {
            return { ...state, contests: [] };
        }
        case CHANGE_CONTEST_PARENT_NEW_PENDING_EDIT: {
            return { ...state, selectedContestParentNew: action.contest_parent_new };
        }
        case CLEAR_CONTEST_PARENT_NEW_PENDING_EDIT: {
            return { ...state, selectedContestParentNew: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default contest_parent_newsReducer;