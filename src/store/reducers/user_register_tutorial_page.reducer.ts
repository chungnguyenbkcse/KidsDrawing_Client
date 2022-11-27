import { IUserRegisterTutorialPageState, IActionBase } from "../models/root.interface";
import { ADD_USER_REGISTER_JOIN_SEMESTER, CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT, EDIT_USER_REGISTER_JOIN_SEMESTER, REMOVE_USER_REGISTER_JOIN_SEMESTER,
    CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_USER_REGISTER_JOIN_SEMESTER, REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL} from "../actions/user_register_tutorial_page.action";
import { IUserRegisterTutorialPage, UserRegisterTutorialPageModificationStatus } from "../models/user_register_tutorial_page.interface";



const initialState: IUserRegisterTutorialPageState = {
    modificationState: UserRegisterTutorialPageModificationStatus.None,
    selectedUserRegisterTutorialPage: null,
    user_register_tutorial_pages: []
};

function user_register_tutorial_pagesReducer(state: IUserRegisterTutorialPageState = initialState, action: IActionBase): IUserRegisterTutorialPageState {
    switch (action.type) {
        case INITIAL_USER_REGISTER_JOIN_SEMESTER: {
            return { ...state, user_register_tutorial_pages : [...state.user_register_tutorial_pages, action.user_register_tutorial_page]};
        }
        case ADD_USER_REGISTER_JOIN_SEMESTER: {
            return { ...state, user_register_tutorial_pages: [...state.user_register_tutorial_pages, action.user_register_tutorial_page]};
        }
        case EDIT_USER_REGISTER_JOIN_SEMESTER: {
            const foundIndex: number = state.user_register_tutorial_pages.findIndex(pr => pr.id === action.user_register_tutorial_page.id);
            let user_register_tutorial_pages: IUserRegisterTutorialPage[] = state.user_register_tutorial_pages;
            user_register_tutorial_pages[foundIndex] = action.user_register_tutorial_page;
            return { ...state, user_register_tutorial_pages: user_register_tutorial_pages };
        }
        case REMOVE_USER_REGISTER_JOIN_SEMESTER: {
            return { ...state, user_register_tutorial_pages: state.user_register_tutorial_pages.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL: {
            return { ...state, user_register_tutorial_pages: [] };
        }
        case CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedUserRegisterTutorialPage: action.user_register_tutorial_page };
        }
        case CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedUserRegisterTutorialPage: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default user_register_tutorial_pagesReducer;