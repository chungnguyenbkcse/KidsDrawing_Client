import { IClassesStudentState, IActionBase } from "../models/root.interface";
import { ADD_DOING_CLASS, CHANGE_DOING_CLASS_PENDING_EDIT, EDIT_DOING_CLASS, REMOVE_DOING_CLASS,
    CLEAR_DOING_CLASS_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_DOING_CLASS, REMOVE_DOING_CLASS_ALL, INITIAL_DONE_CLASS, ADD_DONE_CLASS, EDIT_DONE_CLASS, REMOVE_DONE_CLASS, REMOVE_DONE_CLASS_ALL, CHANGE_DONE_CLASS_PENDING_EDIT, CLEAR_DONE_CLASS_PENDING_EDIT} from "../actions/classes_student.action";
import { IClassesStudent, ClassesStudentModificationStatus } from "../models/classes_student.interface";



const initialState: IClassesStudentState = {
    modificationState: ClassesStudentModificationStatus.None,
    selectedClassesStudent: null,
    classes_doing: [],
    classes_done: []
};

function classesStudentsReducer(state: IClassesStudentState = initialState, action: IActionBase): IClassesStudentState {
    switch (action.type) {
        case INITIAL_DOING_CLASS: {
            return { ...state, classes_doing : [...state.classes_doing, action.classes_student]};
        }
        case ADD_DOING_CLASS: {
            return { ...state, classes_doing: [...state.classes_doing, action.classes_student]};
        }
        case EDIT_DOING_CLASS: {
            const foundIndex: number = state.classes_doing.findIndex(pr => pr.id === action.classes_student.id);
            let classes_doing: IClassesStudent[] = state.classes_doing;
            classes_doing[foundIndex] = action.classes_student;
            return { ...state, classes_doing: classes_doing };
        }
        case REMOVE_DOING_CLASS: {
            return { ...state, classes_doing: state.classes_doing.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_DOING_CLASS_ALL: {
            return { ...state, classes_doing: [] };
        }
        case CHANGE_DOING_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassesStudent: action.classes_student };
        }
        case CLEAR_DOING_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassesStudent: null };
        }

        case INITIAL_DONE_CLASS: {
            return { ...state, classes_done : [...state.classes_done, action.classes_student]};
        }
        case ADD_DONE_CLASS: {
            return { ...state, classes_done: [...state.classes_done, action.classes_student]};
        }
        case EDIT_DONE_CLASS: {
            const foundIndex: number = state.classes_done.findIndex(pr => pr.id === action.classes_student.id);
            let classes_done: IClassesStudent[] = state.classes_done;
            classes_done[foundIndex] = action.classes_student;
            return { ...state, classes_done: classes_done };
        }
        case REMOVE_DONE_CLASS: {
            return { ...state, classes_done: state.classes_done.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_DONE_CLASS_ALL: {
            return { ...state, classes_done: [] };
        }
        case CHANGE_DONE_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassesStudent: action.classes_student };
        }
        case CLEAR_DONE_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassesStudent: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default classesStudentsReducer;