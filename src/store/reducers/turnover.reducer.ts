import { ITurnoverState, IActionBase } from "../models/root.interface";
import { ADD_TURNOVER_NOW, CHANGE_TURNOVER_NOW_PENDING_EDIT, EDIT_TURNOVER_NOW, REMOVE_TURNOVER_NOW,
    CLEAR_TURNOVER_NOW_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TURNOVER_NOW, REMOVE_TURNOVER_NOW_ALL, INITIAL_TURNOVER_LAST, ADD_TURNOVER_LAST, EDIT_TURNOVER_LAST, REMOVE_TURNOVER_LAST, REMOVE_TURNOVER_LAST_ALL, CHANGE_TURNOVER_LAST_PENDING_EDIT, CLEAR_TURNOVER_LAST_PENDING_EDIT} from "../actions/turnover.action";
import { ITurnover, TurnoverModificationStatus } from "../models/turnover.interface";



const initialState: ITurnoverState = {
    modificationState: TurnoverModificationStatus.None,
    selectedTurnover: null,
    turnover_now: [],
    turnover_last: []
};

function turnoversReducer(state: ITurnoverState = initialState, action: IActionBase): ITurnoverState {
    switch (action.type) {
        case INITIAL_TURNOVER_NOW: {
            return { ...state, turnover_now : [...state.turnover_now, action.turnover]};
        }
        case ADD_TURNOVER_NOW: {
            return { ...state, turnover_now: [...state.turnover_now, action.turnover]};
        }
        case EDIT_TURNOVER_NOW: {
            const foundIndex: number = state.turnover_now.findIndex(pr => pr.turnover === action.turnover.turnover);
            let turnover_now: ITurnover[] = state.turnover_now;
            turnover_now[foundIndex] = action.turnover;
            return { ...state, turnover_now: turnover_now };
        }
        case REMOVE_TURNOVER_NOW: {
            return { ...state, turnover_now: state.turnover_now.filter(pr => pr.turnover !== action.turnover) };
        }
        case REMOVE_TURNOVER_NOW_ALL: {
            return { ...state, turnover_now: [] };
        }
        case CHANGE_TURNOVER_NOW_PENDING_EDIT: {
            return { ...state, selectedTurnover: action.turnover };
        }
        case CLEAR_TURNOVER_NOW_PENDING_EDIT: {
            return { ...state, selectedTurnover: null };
        }

        case INITIAL_TURNOVER_LAST: {
            return { ...state, turnover_last : [...state.turnover_last, action.turnover]};
        }
        case ADD_TURNOVER_LAST: {
            return { ...state, turnover_last: [...state.turnover_last, action.turnover]};
        }
        case EDIT_TURNOVER_LAST: {
            const foundIndex: number = state.turnover_last.findIndex(pr => pr.turnover === action.turnover.turnover);
            let turnover_last: ITurnover[] = state.turnover_last;
            turnover_last[foundIndex] = action.turnover;
            return { ...state, turnover_last: turnover_last };
        }
        case REMOVE_TURNOVER_LAST: {
            return { ...state, turnover_last: state.turnover_last.filter(pr => pr.turnover !== action.turnover) };
        }
        case REMOVE_TURNOVER_LAST_ALL: {
            return { ...state, turnover_last: [] };
        }
        case CHANGE_TURNOVER_LAST_PENDING_EDIT: {
            return { ...state, selectedTurnover: action.turnover };
        }
        case CLEAR_TURNOVER_LAST_PENDING_EDIT: {
            return { ...state, selectedTurnover: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default turnoversReducer;