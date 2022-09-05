import { IUserRegisterTutorialState, IActionBase } from "../models/root.interface";
import { 
    ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW, EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW, REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW,INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW, REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_ALL, 
    ADD_USER_REGISTER_TUTORIAL_APPROVED, EDIT_USER_REGISTER_TUTORIAL_APPROVED, REMOVE_USER_REGISTER_TUTORIAL_APPROVED, INITIAL_USER_REGISTER_TUTORIAL_APPROVED, REMOVE_USER_REGISTER_TUTORIAL_APPROVED_ALL, 
    ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED, EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED, REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED , INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED, REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_ALL,
    CLEAR_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT, CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE, REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE, REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_ALL, ADD_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE, EDIT_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE

} from "../actions/user_register_tutorial.action";
import { IUserRegisterTutorial, UserRegisterTutorialModificationStatus } from "../models/user_register_tutorial.interface";

const initialState: IUserRegisterTutorialState = {
    modificationState: UserRegisterTutorialModificationStatus.None,
    selectedUserRegisterTutorial: null,
    user_register_tutorial_not_approved_nows: [],
    user_register_tutorial_not_approveds: [],
    user_register_tutorial_approveds: [],
    user_register_tutorial_approved_to_tutorial_templates: []
};

function userRegisterTutorialReducer(state: IUserRegisterTutorialState = initialState, action: IActionBase): IUserRegisterTutorialState {
    switch (action.type) {
        case INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: {
            return { ...state, user_register_tutorial_not_approved_nows : [...state.user_register_tutorial_not_approved_nows, action.user_register_tutorial]};
        }
        case REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_ALL: {
            return { ...state, user_register_tutorial_not_approved_nows: [] };
        }
        case ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: {
            return { ...state, user_register_tutorial_not_approved_nows: [...state.user_register_tutorial_not_approved_nows, action.user_register_tutorial]};
        }
        case EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: {
            const foundIndex: number = state.user_register_tutorial_not_approved_nows.findIndex(pr => pr.id === action.user_register_tutorial.id);
            let user_register_tutorial_not_approved_nows: IUserRegisterTutorial[] = state.user_register_tutorial_not_approved_nows;
            user_register_tutorial_not_approved_nows[foundIndex] = action.user_register_tutorial;
            return { ...state, user_register_tutorial_not_approved_nows: user_register_tutorial_not_approved_nows };
        }
        case REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: {
            return { ...state, user_register_tutorial_not_approved_nows: state.user_register_tutorial_not_approved_nows.filter(x=>x.id !== action.user_register_tutorial.id)};
        }

        case INITIAL_USER_REGISTER_TUTORIAL_APPROVED: {
            return { ...state, user_register_tutorial_approveds : [...state.user_register_tutorial_approveds, action.user_register_tutorial]};
        }
        case REMOVE_USER_REGISTER_TUTORIAL_APPROVED_ALL: {
            return { ...state, user_register_tutorial_approveds: [] };
        }
        case ADD_USER_REGISTER_TUTORIAL_APPROVED: {
            return { ...state, user_register_tutorial_approveds: [...state.user_register_tutorial_approveds, action.user_register_tutorial]};
        }
        case EDIT_USER_REGISTER_TUTORIAL_APPROVED: {
            const foundIndex: number = state.user_register_tutorial_approveds.findIndex(pr => pr.id === action.user_register_tutorials.id);
            let user_register_tutorial_approveds: IUserRegisterTutorial[] = state.user_register_tutorial_approveds;
            user_register_tutorial_approveds[foundIndex] = action.user_register_tutorial;
            return { ...state, user_register_tutorial_approveds: user_register_tutorial_approveds };
        }
        case REMOVE_USER_REGISTER_TUTORIAL_APPROVED: {
            return { ...state, user_register_tutorial_approveds: state.user_register_tutorial_approveds.filter(x=>x.id !== action.user_register_tutorial.id)};
        }

        case INITIAL_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: {
            return { ...state, user_register_tutorial_approved_to_tutorial_templates : [...state.user_register_tutorial_approved_to_tutorial_templates, action.user_register_tutorial]};
        }
        case REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_ALL: {
            return { ...state, user_register_tutorial_approved_to_tutorial_templates: [] };
        }
        case ADD_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: {
            return { ...state, user_register_tutorial_approved_to_tutorial_templates: [...state.user_register_tutorial_approved_to_tutorial_templates, action.user_register_tutorial]};
        }
        case EDIT_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: {
            const foundIndex: number = state.user_register_tutorial_approved_to_tutorial_templates.findIndex(pr => pr.id === action.user_register_tutorials.id);
            let user_register_tutorial_approved_to_tutorial_templates: IUserRegisterTutorial[] = state.user_register_tutorial_approved_to_tutorial_templates;
            user_register_tutorial_approved_to_tutorial_templates[foundIndex] = action.user_register_tutorial;
            return { ...state, user_register_tutorial_approved_to_tutorial_templates: user_register_tutorial_approved_to_tutorial_templates };
        }
        case REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: {
            return { ...state, user_register_tutorial_approved_to_tutorial_templates: state.user_register_tutorial_approved_to_tutorial_templates.filter(x=>x.id !== action.user_register_tutorial.id)};
        }

        case INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED: {
            return { ...state, user_register_tutorial_approveds : [...state.user_register_tutorial_approveds, action.user_register_tutorial]};
        }
        case REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_ALL: {
            return { ...state, user_register_tutorial_approveds: [] };
        }
        case ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED: {
            return { ...state, user_register_tutorial_approveds: [...state.user_register_tutorial_approveds, action.user_register_tutorial]};
        }
        case EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED: {
            const foundIndex: number = state.user_register_tutorial_approveds.findIndex(pr => pr.id === action.user_register_tutorial.id);
            let user_register_tutorial_approveds: IUserRegisterTutorial[] = state.user_register_tutorial_approveds;
            user_register_tutorial_approveds[foundIndex] = action.user_register_tutorials;
            return { ...state, user_register_tutorial_approveds: user_register_tutorial_approveds };
        }
        case REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED: {
            return { ...state, user_register_tutorial_approveds: state.user_register_tutorial_approveds.filter(x=>x.id !== action.user_register_tutorial.id)};
        }
        
        case CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: {
            return { ...state, selectedUserRegisterTutorial: action.user_register_tutorial };
        }
        case CLEAR_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: {
            return { ...state, selectedUserRegisterTutorial: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default userRegisterTutorialReducer;