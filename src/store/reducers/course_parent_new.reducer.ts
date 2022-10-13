import { ICourseParentNewState, IActionBase } from "../models/root.interface";
import { ADD_COURSE_PARENT_NEW, CHANGE_COURSE_PARENT_NEW_PENDING_EDIT, EDIT_COURSE_PARENT_NEW, REMOVE_COURSE_PARENT_NEW,
    CLEAR_COURSE_PARENT_NEW_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_COURSE_PARENT_NEW, REMOVE_COURSE_PARENT_NEW_ALL} from "../actions/course_parent_new.action";
import { ICourseParentNew, CourseParentNewModificationStatus } from "../models/course_parent_new.interface";



const initialState: ICourseParentNewState = {
    modificationState: CourseParentNewModificationStatus.None,
    selectedCourseParentNew: null,
    courses: []
};

function course_parent_newsReducer(state: ICourseParentNewState = initialState, action: IActionBase): ICourseParentNewState {
    switch (action.type) {
        case INITIAL_COURSE_PARENT_NEW: {
            return { ...state, courses : [...state.courses, action.course_parent_new]};
        }
        case ADD_COURSE_PARENT_NEW: {
            return { ...state, courses: [...state.courses, action.course_parent_new]};
        }
        case EDIT_COURSE_PARENT_NEW: {
            const foundIndex: number = state.courses.findIndex(pr => pr.id === action.course_parent_new.id);
            let courses: ICourseParentNew[] = state.courses;
            courses[foundIndex] = action.course_parent_new;
            return { ...state, courses: courses };
        }
        case REMOVE_COURSE_PARENT_NEW: {
            return { ...state, courses: state.courses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_COURSE_PARENT_NEW_ALL: {
            return { ...state, courses: [] };
        }
        case CHANGE_COURSE_PARENT_NEW_PENDING_EDIT: {
            return { ...state, selectedCourseParentNew: action.course_parent_new };
        }
        case CLEAR_COURSE_PARENT_NEW_PENDING_EDIT: {
            return { ...state, selectedCourseParentNew: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default course_parent_newsReducer;