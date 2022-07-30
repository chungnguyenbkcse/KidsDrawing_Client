import { IUserRegisterJoinSemesterState, IActionBase } from "../models/root.interface";
import { ADD_USER_REGISTER_JOIN_SEMESTER, CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT, EDIT_USER_REGISTER_JOIN_SEMESTER, REMOVE_USER_REGISTER_JOIN_SEMESTER,
    CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_USER_REGISTER_JOIN_SEMESTER, REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL} from "../actions/user_register_join_semester.action";
import { IUserRegisterJoinSemester, UserRegisterJoinSemesterModificationStatus } from "../models/user_register_join_semester.interface";



const initialState: IUserRegisterJoinSemesterState = {
    modificationState: UserRegisterJoinSemesterModificationStatus.None,
    selectedUserRegisterJoinSemester: null,
    userRegisterJoinSemesters: []
};

function userRegisterJoinSemestersReducer(state: IUserRegisterJoinSemesterState = initialState, action: IActionBase): IUserRegisterJoinSemesterState {
    switch (action.type) {
        case INITIAL_USER_REGISTER_JOIN_SEMESTER: {
            return { ...state, userRegisterJoinSemesters : [...state.userRegisterJoinSemesters, action.user_register_join_semester]};
        }
        case ADD_USER_REGISTER_JOIN_SEMESTER: {
            return { ...state, userRegisterJoinSemesters: [...state.userRegisterJoinSemesters, action.user_register_join_semester]};
        }
        case EDIT_USER_REGISTER_JOIN_SEMESTER: {
            const foundIndex: number = state.userRegisterJoinSemesters.findIndex(pr => pr.id === action.user_register_join_semester.id);
            let userRegisterJoinSemesters: IUserRegisterJoinSemester[] = state.userRegisterJoinSemesters;
            userRegisterJoinSemesters[foundIndex] = action.user_register_join_semester;
            return { ...state, userRegisterJoinSemesters: userRegisterJoinSemesters };
        }
        case REMOVE_USER_REGISTER_JOIN_SEMESTER: {
            return { ...state, userRegisterJoinSemesters: state.userRegisterJoinSemesters.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_USER_REGISTER_JOIN_SEMESTER_ALL: {
            return { ...state, userRegisterJoinSemesters: [] };
        }
        case CHANGE_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedUserRegisterJoinSemester: action.user_register_join_semester };
        }
        case CLEAR_USER_REGISTER_JOIN_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedUserRegisterJoinSemester: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default userRegisterJoinSemestersReducer;