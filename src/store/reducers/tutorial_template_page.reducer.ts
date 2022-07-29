import { ITutorialTemplatePageState, IActionBase } from "../models/root.interface";
import { ADD_TUTORIAL_TEMPLATE_PAGE, CHANGE_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT, EDIT_TUTORIAL_TEMPLATE_PAGE, REMOVE_TUTORIAL_TEMPLATE_PAGE,
    CLEAR_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TUTORIAL_TEMPLATE_PAGE, REMOVE_TUTORIAL_TEMPLATE_PAGE_ALL} from "../actions/tutorial_template_page.action";
import { ITutorialTemplatePage, TutorialTemplatePageModificationStatus } from "../models/tutorial_template_page.interface";



const initialState: ITutorialTemplatePageState = {
    modificationState: TutorialTemplatePageModificationStatus.None,
    selectedTutorialTemplatePage: null,
    tutorialTemplatePages: []
};

function tutorialTemplatePagesReducer(state: ITutorialTemplatePageState = initialState, action: IActionBase): ITutorialTemplatePageState {
    switch (action.type) {
        case INITIAL_TUTORIAL_TEMPLATE_PAGE: {
            return { ...state, tutorialTemplatePages : [...state.tutorialTemplatePages, action.tutorial_template_page]};
        }
        case ADD_TUTORIAL_TEMPLATE_PAGE: {
            return { ...state, tutorialTemplatePages: [...state.tutorialTemplatePages, action.tutorial_template_page]};
        }
        case EDIT_TUTORIAL_TEMPLATE_PAGE: {
            const foundIndex: number = state.tutorialTemplatePages.findIndex(pr => pr.id === action.tutorial_template_page.id);
            let tutorialTemplatePages: ITutorialTemplatePage[] = state.tutorialTemplatePages;
            tutorialTemplatePages[foundIndex] = action.tutorial_template_page;
            return { ...state, tutorialTemplatePages: tutorialTemplatePages };
        }
        case REMOVE_TUTORIAL_TEMPLATE_PAGE: {
            return { ...state, tutorialTemplatePages: state.tutorialTemplatePages.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TUTORIAL_TEMPLATE_PAGE_ALL: {
            return { ...state, tutorialTemplatePages: [] };
        }
        case CHANGE_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT: {
            return { ...state, selectedTutorialTemplatePage: action.tutorial_template_page };
        }
        case CLEAR_TUTORIAL_TEMPLATE_PAGE_PENDING_EDIT: {
            return { ...state, selectedTutorialTemplatePage: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default tutorialTemplatePagesReducer;