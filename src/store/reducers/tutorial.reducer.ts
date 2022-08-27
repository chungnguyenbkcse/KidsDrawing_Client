import { ITutorialState, IActionBase } from "../models/root.interface";
import { 
    ADD_TUTORIAL_NOT_APPROVED_NOW, EDIT_TUTORIAL_NOT_APPROVED_NOW, REMOVE_TUTORIAL_NOT_APPROVED_NOW,INITIAL_TUTORIAL_NOT_APPROVED_NOW, REMOVE_TUTORIAL_NOT_APPROVED_NOW_ALL, 
    ADD_TUTORIAL_APPROVED, EDIT_TUTORIAL_APPROVED, REMOVE_TUTORIAL_APPROVED, INITIAL_TUTORIAL_APPROVED, REMOVE_TUTORIAL_APPROVED_ALL, 
    ADD_TUTORIAL_NOT_APPROVED, EDIT_TUTORIAL_NOT_APPROVED, REMOVE_TUTORIAL_NOT_APPROVED , INITIAL_TUTORIAL_NOT_APPROVED, REMOVE_TUTORIAL_NOT_APPROVED_ALL,
    CLEAR_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT, CHANGE_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT, SET_MODIFICATION_STATE

} from "../actions/tutorial.action";
import { ITutorial, TutorialModificationStatus } from "../models/tutorial.interface";

const initialState: ITutorialState = {
    modificationState: TutorialModificationStatus.None,
    selectedTutorial: null,
    tutorial_not_approved_nows: [],
    tutorial_not_approveds: [],
    tutorial_approved: []
};

function studentLeaveReducer(state: ITutorialState = initialState, action: IActionBase): ITutorialState {
    switch (action.type) {
        case INITIAL_TUTORIAL_NOT_APPROVED_NOW: {
            return { ...state, tutorial_not_approved_nows : [...state.tutorial_not_approved_nows, action.tutorial]};
        }
        case REMOVE_TUTORIAL_NOT_APPROVED_NOW_ALL: {
            return { ...state, tutorial_not_approved_nows: [] };
        }
        case ADD_TUTORIAL_NOT_APPROVED_NOW: {
            return { ...state, tutorial_not_approved_nows: [...state.tutorial_not_approved_nows, action.tutorial]};
        }
        case EDIT_TUTORIAL_NOT_APPROVED_NOW: {
            const foundIndex: number = state.tutorial_not_approved_nows.findIndex(pr => pr.id === action.tutorial.id);
            let tutorial_not_approved_nows: ITutorial[] = state.tutorial_not_approved_nows;
            tutorial_not_approved_nows[foundIndex] = action.tutorial;
            return { ...state, tutorial_not_approved_nows: tutorial_not_approved_nows };
        }
        case REMOVE_TUTORIAL_NOT_APPROVED_NOW: {
            return { ...state, tutorial_not_approved_nows: state.tutorial_not_approved_nows.filter(x=>x.id !== action.tutorial.id)};
        }

        case INITIAL_TUTORIAL_APPROVED: {
            return { ...state, tutorial_approved : [...state.tutorial_approved, action.tutorial]};
        }
        case REMOVE_TUTORIAL_APPROVED_ALL: {
            return { ...state, tutorial_approved: [] };
        }
        case ADD_TUTORIAL_APPROVED: {
            return { ...state, tutorial_approved: [...state.tutorial_approved, action.tutorial]};
        }
        case EDIT_TUTORIAL_APPROVED: {
            const foundIndex: number = state.tutorial_approved.findIndex(pr => pr.id === action.tutorial.id);
            let tutorial_approved: ITutorial[] = state.tutorial_approved;
            tutorial_approved[foundIndex] = action.tutorial;
            return { ...state, tutorial_approved: tutorial_approved };
        }
        case REMOVE_TUTORIAL_APPROVED: {
            return { ...state, tutorial_approved: state.tutorial_approved.filter(x=>x.id !== action.tutorial.id)};
        }

        case INITIAL_TUTORIAL_NOT_APPROVED: {
            return { ...state, tutorial_approved : [...state.tutorial_approved, action.tutorial]};
        }
        case REMOVE_TUTORIAL_NOT_APPROVED_ALL: {
            return { ...state, tutorial_approved: [] };
        }
        case ADD_TUTORIAL_NOT_APPROVED: {
            return { ...state, tutorial_approved: [...state.tutorial_approved, action.tutorial]};
        }
        case EDIT_TUTORIAL_NOT_APPROVED: {
            const foundIndex: number = state.tutorial_approved.findIndex(pr => pr.id === action.tutorial.id);
            let tutorial_approved: ITutorial[] = state.tutorial_approved;
            tutorial_approved[foundIndex] = action.tutorial;
            return { ...state, tutorial_approved: tutorial_approved };
        }
        case REMOVE_TUTORIAL_NOT_APPROVED: {
            return { ...state, tutorial_approved: state.tutorial_approved.filter(x=>x.id !== action.tutorial.id)};
        }
        
        case CHANGE_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: {
            return { ...state, selectedTutorial: action.tutorial };
        }
        case CLEAR_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: {
            return { ...state, selectedTutorial: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default studentLeaveReducer;