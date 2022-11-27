import { IClassTeacherState, IActionBase } from "../models/root.interface";
import { ADD_DOING_CLASS, CHANGE_DOING_CLASS_PENDING_EDIT, EDIT_DOING_CLASS, REMOVE_DOING_CLASS,
    CLEAR_DOING_CLASS_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_DOING_CLASS, REMOVE_DOING_CLASS_ALL, INITIAL_DONE_CLASS, ADD_DONE_CLASS, EDIT_DONE_CLASS, REMOVE_DONE_CLASS, REMOVE_DONE_CLASS_ALL, CHANGE_DONE_CLASS_PENDING_EDIT, CLEAR_DONE_CLASS_PENDING_EDIT} from "../actions/class_teacher.action";
import { IClassTeacher, ClassTeacherModificationStatus } from "../models/class_teacher.interface";



const initialState: IClassTeacherState = {
    modificationState: ClassTeacherModificationStatus.None,
    selectedClassTeacher: null,
    class_doing: [],
    class_done: []
};

function classTeachersReducer(state: IClassTeacherState = initialState, action: IActionBase): IClassTeacherState {
    switch (action.type) {
        case INITIAL_DOING_CLASS: {
            return { ...state, class_doing : [...state.class_doing, action.class_teacher]};
        }
        case ADD_DOING_CLASS: {
            return { ...state, class_doing: [...state.class_doing, action.class_teacher]};
        }
        case EDIT_DOING_CLASS: {
            const foundIndex: number = state.class_doing.findIndex(pr => pr.id === action.class_teacher.id);
            let class_doing: IClassTeacher[] = state.class_doing;
            class_doing[foundIndex] = action.class_teacher;
            return { ...state, class_doing: class_doing };
        }
        case REMOVE_DOING_CLASS: {
            return { ...state, class_doing: state.class_doing.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_DOING_CLASS_ALL: {
            return { ...state, class_doing: [] };
        }
        case CHANGE_DOING_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassTeacher: action.class_teacher };
        }
        case CLEAR_DOING_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassTeacher: null };
        }

        case INITIAL_DONE_CLASS: {
            return { ...state, class_done : [...state.class_done, action.class_teacher]};
        }
        case ADD_DONE_CLASS: {
            return { ...state, class_done: [...state.class_done, action.class_teacher]};
        }
        case EDIT_DONE_CLASS: {
            const foundIndex: number = state.class_done.findIndex(pr => pr.id === action.class_teacher.id);
            let class_done: IClassTeacher[] = state.class_done;
            class_done[foundIndex] = action.class_teacher;
            return { ...state, class_done: class_done };
        }
        case REMOVE_DONE_CLASS: {
            return { ...state, class_done: state.class_done.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_DONE_CLASS_ALL: {
            return { ...state, class_done: [] };
        }
        case CHANGE_DONE_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassTeacher: action.class_teacher };
        }
        case CLEAR_DONE_CLASS_PENDING_EDIT: {
            return { ...state, selectedClassTeacher: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default classTeachersReducer;