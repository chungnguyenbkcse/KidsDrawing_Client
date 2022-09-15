import { ICourseParentState, IActionBase } from "../models/root.interface";
import { ADD_DOING_COURSE, CHANGE_DOING_COURSE_PENDING_EDIT, EDIT_DOING_COURSE, REMOVE_DOING_COURSE,
    CLEAR_DOING_COURSE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_DOING_COURSE, REMOVE_DOING_COURSE_ALL, INITIAL_DONE_COURSE, ADD_DONE_COURSE, EDIT_DONE_COURSE, REMOVE_DONE_COURSE, REMOVE_DONE_COURSE_ALL, CHANGE_DONE_COURSE_PENDING_EDIT, CLEAR_DONE_COURSE_PENDING_EDIT} from "../actions/course_parent.action";
import { ICourseParent, CourseParentModificationStatus } from "../models/course_parent.interface";



const initialState: ICourseParentState = {
    modificationState: CourseParentModificationStatus.None,
    selectedCourseParent: null,
    courses_registed: [],
    courses_not_registed_now: []
};

function courseParentsReducer(state: ICourseParentState = initialState, action: IActionBase): ICourseParentState {
    switch (action.type) {
        case INITIAL_DOING_COURSE: {
            return { ...state, courses_not_registed_now : [...state.courses_not_registed_now, action.course_parent]};
        }
        case ADD_DOING_COURSE: {
            return { ...state, courses_not_registed_now: [...state.courses_not_registed_now, action.course_parent]};
        }
        case EDIT_DOING_COURSE: {
            const foundIndex: number = state.courses_not_registed_now.findIndex(pr => pr.id === action.course_parent.id);
            let courses_not_registed_now: ICourseParent[] = state.courses_not_registed_now;
            courses_not_registed_now[foundIndex] = action.course_parent;
            return { ...state, courses_not_registed_now: courses_not_registed_now };
        }
        case REMOVE_DOING_COURSE: {
            return { ...state, courses_not_registed_now: state.courses_not_registed_now.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_DOING_COURSE_ALL: {
            return { ...state, courses_not_registed_now: [] };
        }
        case CHANGE_DOING_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseParent: action.course_parent };
        }
        case CLEAR_DOING_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseParent: null };
        }

        case INITIAL_DONE_COURSE: {
            return { ...state, courses_registed : [...state.courses_registed, action.course_parent]};
        }
        case ADD_DONE_COURSE: {
            return { ...state, courses_registed: [...state.courses_registed, action.course_parent]};
        }
        case EDIT_DONE_COURSE: {
            const foundIndex: number = state.courses_registed.findIndex(pr => pr.id === action.course_parent.id);
            let courses_registed: ICourseParent[] = state.courses_not_registed_now;
            courses_registed[foundIndex] = action.course_parent;
            return { ...state, courses_registed: courses_registed };
        }
        case REMOVE_DONE_COURSE: {
            return { ...state, courses_registed: state.courses_registed.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_DONE_COURSE_ALL: {
            return { ...state, courses_registed: [] };
        }
        case CHANGE_DONE_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseParent: action.course_parent };
        }
        case CLEAR_DONE_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseParent: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default courseParentsReducer;