import { ITutorialPageState, IActionBase } from "../models/root.interface";
import { ADD_TUTORIAL_PAGE, CHANGE_TUTORIAL_PAGE_PENDING_EDIT, EDIT_TUTORIAL_PAGE, REMOVE_TUTORIAL_PAGE,
    CLEAR_TUTORIAL_PAGE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TUTORIAL_PAGE, REMOVE_TUTORIAL_PAGE_ALL} from "../actions/tutorial_page.action";
import { ITutorialPage, TutorialPageModificationStatus } from "../models/tutorial_page.interface";



const initialState: ITutorialPageState = {
    modificationState: TutorialPageModificationStatus.None,
    selectedTutorialPage: null,
    tutorialPages: []
};

function tutorialPagesReducer(state: ITutorialPageState = initialState, action: IActionBase): ITutorialPageState {
    switch (action.type) {
        case INITIAL_TUTORIAL_PAGE: {
            return { ...state, tutorialPages : [...state.tutorialPages, action.tutorial_page]};
        }
        case ADD_TUTORIAL_PAGE: {
            return { ...state, tutorialPages: [...state.tutorialPages, action.tutorial_page]};
        }
        case EDIT_TUTORIAL_PAGE: {
            const foundIndex: number = state.tutorialPages.findIndex(pr => pr.id === action.tutorial_page.id);
            let tutorialPages: ITutorialPage[] = state.tutorialPages;
            tutorialPages[foundIndex] = action.tutorial_page;
            return { ...state, tutorialPages: tutorialPages };
        }
        case REMOVE_TUTORIAL_PAGE: {
            return { ...state, tutorialPages: state.tutorialPages.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TUTORIAL_PAGE_ALL: {
            return { ...state, tutorialPages: [] };
        }
        case CHANGE_TUTORIAL_PAGE_PENDING_EDIT: {
            return { ...state, selectedTutorialPage: action.tutorial_page };
        }
        case CLEAR_TUTORIAL_PAGE_PENDING_EDIT: {
            return { ...state, selectedTutorialPage: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default tutorialPagesReducer;