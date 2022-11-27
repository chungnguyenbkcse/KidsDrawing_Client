import { ICourseState, IActionBase } from "../models/root.interface";
import { ADD_COURSE, CHANGE_COURSE_PENDING_EDIT, EDIT_COURSE, REMOVE_COURSE,
    CLEAR_COURSE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_COURSE, REMOVE_COURSE_ALL} from "../actions/course.action";
import { ICourse, CourseModificationStatus } from "../models/course.interface";



const initialState: ICourseState = {
    modificationState: CourseModificationStatus.None,
    selectedCourse: null,
    courses: []
};

function coursesReducer(state: ICourseState = initialState, action: IActionBase): ICourseState {
    switch (action.type) {
        case INITIAL_COURSE: {
            return { ...state, courses : [...state.courses, action.course]};
        }
        case ADD_COURSE: {
            return { ...state, courses: [...state.courses, action.course]};
        }
        case EDIT_COURSE: {
            const foundIndex: number = state.courses.findIndex(pr => pr.id === action.course.id);
            let courses: ICourse[] = state.courses;
            courses[foundIndex] = action.course;
            return { ...state, courses: courses };
        }
        case REMOVE_COURSE: {
            return { ...state, courses: state.courses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_COURSE_ALL: {
            return { ...state, courses: [] };
        }
        case CHANGE_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourse: action.course };
        }
        case CLEAR_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourse: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default coursesReducer;