import { IUserState, IActionBase } from "../models/root.interface";
import { 
    ADD_ADMIN, EDIT_ADMIN, REMOVE_ADMIN,
    ADD_TEACHER, EDIT_TEACHER, REMOVE_TEACHER,INITIAL_TEACHER, REMOVE_TEACHER_ALL, 
    ADD_STUDENT, EDIT_STUDENT, REMOVE_STUDENT, INITIAL_STUDENT, REMOVE_STUDENT_ALL, 
    ADD_PARENT, EDIT_PARENT, REMOVE_PARENT , INITIAL_PARENT, REMOVE_PARENT_ALL,
    CHANGE_USER_PENDING_EDIT, CLEAR_USER_PENDING_EDIT, SET_MODIFICATION_STATE

} from "../actions/users.action";
import { IUser, UserModificationStatus } from "../models/user.interface";

const initialState: IUserState = {
    modificationState: UserModificationStatus.None,
    selectedUser: null,
    admins: [],
    teachers: [],
    students: [],
    parents: []
};

function userReducer(state: IUserState = initialState, action: IActionBase): IUserState {
    switch (action.type) {
        case ADD_ADMIN: {
            return { ...state, admins: [...state.admins, action.user]};
        }
        case EDIT_ADMIN: {
            const foundIndex: number = state.admins.findIndex(pr => pr.username === action.user.username);
            let admins: IUser[] = state.admins;
            admins[foundIndex] = action.user;
            return { ...state, admins: admins };
        }
        case REMOVE_ADMIN: {
            return { ...state, admins: state.admins.filter(x=>x.username !== action.user.username)};
        }

        case INITIAL_TEACHER: {
            return { ...state, teachers : [...state.teachers, action.user]};
        }
        case REMOVE_TEACHER_ALL: {
            return { ...state, teachers: [] };
        }
        case ADD_TEACHER: {
            return { ...state, teachers: [...state.teachers, action.user]};
        }
        case EDIT_TEACHER: {
            const foundIndex: number = state.teachers.findIndex(pr => pr.username === action.user.username);
            let teachers: IUser[] = state.teachers;
            teachers[foundIndex] = action.user;
            return { ...state, teachers: teachers };
        }
        case REMOVE_TEACHER: {
            return { ...state, teachers: state.teachers.filter(x=>x.username !== action.user.username)};
        }

        case INITIAL_STUDENT: {
            return { ...state, students : [...state.students, action.user]};
        }
        case REMOVE_STUDENT_ALL: {
            return { ...state, students: [] };
        }
        case ADD_STUDENT: {
            return { ...state, students: [...state.students, action.user]};
        }
        case EDIT_STUDENT: {
            const foundIndex: number = state.students.findIndex(pr => pr.username === action.user.username);
            let students: IUser[] = state.students;
            students[foundIndex] = action.user;
            return { ...state, students: students };
        }
        case REMOVE_STUDENT: {
            return { ...state, students: state.students.filter(x=>x.username !== action.user.username)};
        }

        case INITIAL_PARENT: {
            return { ...state, parents : [...state.parents, action.user]};
        }
        case REMOVE_PARENT_ALL: {
            return { ...state, parents: [] };
        }
        case ADD_PARENT: {
            return { ...state, parents: [...state.parents, action.user]};
        }
        case EDIT_PARENT: {
            const foundIndex: number = state.parents.findIndex(pr => pr.username === action.user.username);
            let parents: IUser[] = state.parents;
            parents[foundIndex] = action.user;
            return { ...state, parents: parents };
        }
        case REMOVE_PARENT: {
            return { ...state, parents: state.parents.filter(x=>x.username !== action.user.username)};
        }
        
        case CHANGE_USER_PENDING_EDIT: {
            return { ...state, selectedUser: action.user };
        }
        case CLEAR_USER_PENDING_EDIT: {
            return { ...state, selectedUser: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default userReducer;