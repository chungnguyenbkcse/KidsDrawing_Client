import { ITutorialTemplateState, IActionBase } from "../models/root.interface";
import { ADD_TUTORIAL_TEMPLATE, CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT, EDIT_TUTORIAL_TEMPLATE, REMOVE_TUTORIAL_TEMPLATE,
    CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TUTORIAL_TEMPLATE, REMOVE_TUTORIAL_TEMPLATE_ALL} from "../actions/tutorial_template.action";
import { ITutorialTemplate, TutorialTemplateModificationStatus } from "../models/tutorial_template.interface";



const initialState: ITutorialTemplateState = {
    modificationState: TutorialTemplateModificationStatus.None,
    selectedTutorialTemplate: null,
    tutorialTemplates: []
};

function tutorialTemplatesReducer(state: ITutorialTemplateState = initialState, action: IActionBase): ITutorialTemplateState {
    switch (action.type) {
        case INITIAL_TUTORIAL_TEMPLATE: {
            return { ...state, tutorialTemplates : [...state.tutorialTemplates, action.tutorial_template]};
        }
        case ADD_TUTORIAL_TEMPLATE: {
            return { ...state, tutorialTemplates: [...state.tutorialTemplates, action.tutorial_template]};
        }
        case EDIT_TUTORIAL_TEMPLATE: {
            const foundIndex: number = state.tutorialTemplates.findIndex(pr => pr.id === action.tutorial_template.id);
            let tutorialTemplates: ITutorialTemplate[] = state.tutorialTemplates;
            tutorialTemplates[foundIndex] = action.tutorial_template;
            return { ...state, tutorialTemplates: tutorialTemplates };
        }
        case REMOVE_TUTORIAL_TEMPLATE: {
            return { ...state, tutorialTemplates: state.tutorialTemplates.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TUTORIAL_TEMPLATE_ALL: {
            return { ...state, tutorialTemplates: [] };
        }
        case CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT: {
            return { ...state, selectedTutorialTemplate: action.tutorial_template };
        }
        case CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT: {
            return { ...state, selectedTutorialTemplate: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default tutorialTemplatesReducer;