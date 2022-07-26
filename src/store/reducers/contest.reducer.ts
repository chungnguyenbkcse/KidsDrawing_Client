import { IContestState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST, CHANGE_CONTEST_PENDING_EDIT, EDIT_CONTEST, REMOVE_CONTEST,
    CLEAR_CONTEST_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CONTEST, REMOVE_CONTEST_ALL} from "../actions/contest.action";
import { IContest, ContestModificationStatus } from "../models/contest.interface";



const initialState: IContestState = {
    modificationState: ContestModificationStatus.None,
    selectedContest: null,
    contests: []
};

function contestsReducer(state: IContestState = initialState, action: IActionBase): IContestState {
    switch (action.type) {
        case INITIAL_CONTEST: {
            return { ...state, contests : [...state.contests, action.contest]};
        }
        case ADD_CONTEST: {
            return { ...state, contests: [...state.contests, action.contest]};
        }
        case EDIT_CONTEST: {
            const foundIndex: number = state.contests.findIndex(pr => pr.id === action.contest.id);
            let contests: IContest[] = state.contests;
            contests[foundIndex] = action.contest;
            return { ...state, contests: contests };
        }
        case REMOVE_CONTEST: {
            return { ...state, contests: state.contests.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_ALL: {
            return { ...state, contests: [] };
        }
        case CHANGE_CONTEST_PENDING_EDIT: {
            return { ...state, selectedContest: action.contest };
        }
        case CLEAR_CONTEST_PENDING_EDIT: {
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