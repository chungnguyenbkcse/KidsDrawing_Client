import { IUserRegisterJoinSemesterState, IActionBase } from "../models/root.interface";
import { ADD_COMPLETED, CHANGE_COMPLETED_PENDING_EDIT, EDIT_COMPLETED, REMOVE_COMPLETED,
    CLEAR_COMPLETED_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_COMPLETED, REMOVE_COMPLETED_ALL, INITIAL_WAITING, ADD_WAITING, EDIT_WAITING, REMOVE_WAITING, REMOVE_WAITING_ALL, CHANGE_WAITING_PENDING_EDIT, CLEAR_WAITING_PENDING_EDIT} from "../actions/user_register_join_semester.action";
import { IUserRegisterJoinSemester, UserRegisterJoinSemesterModificationStatus } from "../models/user_register_join_semester.interface";



const initialState: IUserRegisterJoinSemesterState = {
    modificationState: UserRegisterJoinSemesterModificationStatus.None,
    selectedUserRegisterJoinSemester: null,
    completed: [],
    waiting: []
};

function user_register_join_semestersReducer(state: IUserRegisterJoinSemesterState = initialState, action: IActionBase): IUserRegisterJoinSemesterState {
    switch (action.type) {
        case INITIAL_COMPLETED: {
            return { ...state, completed : [...state.completed, action.user_register_join_semester]};
        }
        case ADD_COMPLETED: {
            return { ...state, completed: [...state.completed, action.user_register_join_semester]};
        }
        case EDIT_COMPLETED: {
            const foundIndex: number = state.completed.findIndex(pr => pr.id === action.user_register_join_semester.id);
            let completed: IUserRegisterJoinSemester[] = state.completed;
            completed[foundIndex] = action.user_register_join_semester;
            return { ...state, completed: completed };
        }
        case REMOVE_COMPLETED: {
            return { ...state, completed: state.completed.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_COMPLETED_ALL: {
            return { ...state, completed: [] };
        }
        case CHANGE_COMPLETED_PENDING_EDIT: {
            return { ...state, selectedUserRegisterJoinSemester: action.user_register_join_semester };
        }
        case CLEAR_COMPLETED_PENDING_EDIT: {
            return { ...state, selectedUserRegisterJoinSemester: null };
        }

        case INITIAL_WAITING: {
            return { ...state, waiting : [...state.waiting, action.user_register_join_semester]};
        }
        case ADD_WAITING: {
            return { ...state, waiting: [...state.waiting, action.user_register_join_semester]};
        }
        case EDIT_WAITING: {
            const foundIndex: number = state.waiting.findIndex(pr => pr.id === action.user_register_join_semester.id);
            let waiting: IUserRegisterJoinSemester[] = state.waiting;
            waiting[foundIndex] = action.user_register_join_semester;
            return { ...state, waiting: waiting };
        }
        case REMOVE_WAITING: {
            return { ...state, waiting: state.waiting.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_WAITING_ALL: {
            return { ...state, waiting: [] };
        }
        case CHANGE_WAITING_PENDING_EDIT: {
            return { ...state, selectedUserRegisterJoinSemester: action.user_register_join_semester };
        }
        case CLEAR_WAITING_PENDING_EDIT: {
            return { ...state, selectedUserRegisterJoinSemester: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default user_register_join_semestersReducer;