import { ITutorialState, IActionBase } from "../models/root.interface";
import { 
    ADD_TUTORIAL, EDIT_TUTORIAL, REMOVE_TUTORIAL,INITIAL_TUTORIAL, REMOVE_TUTORIAL_ALL, 
    CLEAR_TUTORIAL_PENDING_EDIT, CHANGE_TUTORIAL_PENDING_EDIT, SET_MODIFICATION_STATE

} from "../actions/tutorial.action";
import { ITutorial, TutorialModificationStatus } from "../models/tutorial.interface";

const initialState: ITutorialState = {
    modificationState: TutorialModificationStatus.None,
    selectedTutorial: null,
    tutorials: []
};

function studentLeaveReducer(state: ITutorialState = initialState, action: IActionBase): ITutorialState {
    switch (action.type) {
        case INITIAL_TUTORIAL: {
            return { ...state, tutorials : [...state.tutorials, action.tutorial]};
        }
        case REMOVE_TUTORIAL_ALL: {
            return { ...state, tutorials: [] };
        }
        case ADD_TUTORIAL: {
            return { ...state, tutorials: [...state.tutorials, action.tutorial]};
        }
        case EDIT_TUTORIAL: {
            const foundIndex: number = state.tutorials.findIndex(pr => pr.id === action.tutorial.id);
            let tutorials: ITutorial[] = state.tutorials;
            tutorials[foundIndex] = action.tutorial;
            return { ...state, tutorials: tutorials };
        }
        case REMOVE_TUTORIAL: {
            return { ...state, tutorials: state.tutorials.filter(x=>x.id !== action.tutorial.id)};
        }
        
        case CHANGE_TUTORIAL_PENDING_EDIT: {
            return { ...state, selectedTutorial: action.tutorial };
        }
        case CLEAR_TUTORIAL_PENDING_EDIT: {
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