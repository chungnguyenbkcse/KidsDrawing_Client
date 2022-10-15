import { ICourseTeacherNewState, IActionBase } from "../models/root.interface";
import { ADD_COURSE_TEACHER_NEW, CHANGE_COURSE_TEACHER_NEW_PENDING_EDIT, EDIT_COURSE_TEACHER_NEW, REMOVE_COURSE_TEACHER_NEW,
    CLEAR_COURSE_TEACHER_NEW_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_COURSE_TEACHER_NEW, REMOVE_COURSE_TEACHER_NEW_ALL} from "../actions/course_teacher_new.action";
import { ICourseTeacherNew, CourseTeacherNewModificationStatus } from "../models/course_teacher_new.interface";



const initialState: ICourseTeacherNewState = {
    modificationState: CourseTeacherNewModificationStatus.None,
    selectedCourseTeacherNew: null,
    courses: []
};

function course_teacher_newsReducer(state: ICourseTeacherNewState = initialState, action: IActionBase): ICourseTeacherNewState {
    switch (action.type) {
        case INITIAL_COURSE_TEACHER_NEW: {
            return { ...state, courses : [...state.courses, action.course_teacher_new]};
        }
        case ADD_COURSE_TEACHER_NEW: {
            return { ...state, courses: [...state.courses, action.course_teacher_new]};
        }
        case EDIT_COURSE_TEACHER_NEW: {
            const foundIndex: number = state.courses.findIndex(pr => pr.id === action.course_teacher_new.id);
            let courses: ICourseTeacherNew[] = state.courses;
            courses[foundIndex] = action.course_teacher_new;
            return { ...state, courses: courses };
        }
        case REMOVE_COURSE_TEACHER_NEW: {
            return { ...state, courses: state.courses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_COURSE_TEACHER_NEW_ALL: {
            return { ...state, courses: [] };
        }
        case CHANGE_COURSE_TEACHER_NEW_PENDING_EDIT: {
            return { ...state, selectedCourseTeacherNew: action.course_teacher_new };
        }
        case CLEAR_COURSE_TEACHER_NEW_PENDING_EDIT: {
            return { ...state, selectedCourseTeacherNew: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default course_teacher_newsReducer;