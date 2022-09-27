import { ICourseNewState, IActionBase } from "../models/root.interface";
import { ADD_COURSE_NEW, CHANGE_COURSE_NEW_PENDING_EDIT, EDIT_COURSE_NEW, REMOVE_COURSE_NEW,
    CLEAR_COURSE_NEW_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_COURSE_NEW, REMOVE_COURSE_NEW_ALL} from "../actions/course_new.action";
import { ICourseNew, CourseNewModificationStatus } from "../models/course_new.interface";



const initialState: ICourseNewState = {
    modificationState: CourseNewModificationStatus.None,
    selectedCourseNew: null,
    course_news: []
};

function course_newsReducer(state: ICourseNewState = initialState, action: IActionBase): ICourseNewState {
    switch (action.type) {
        case INITIAL_COURSE_NEW: {
            return { ...state, course_news : [...state.course_news, action.course_new]};
        }
        case ADD_COURSE_NEW: {
            return { ...state, course_news: [...state.course_news, action.course_new]};
        }
        case EDIT_COURSE_NEW: {
            const foundIndex: number = state.course_news.findIndex(pr => pr.id === action.course_new.id);
            let course_news: ICourseNew[] = state.course_news;
            course_news[foundIndex] = action.course_new;
            return { ...state, course_news: course_news };
        }
        case REMOVE_COURSE_NEW: {
            return { ...state, course_news: state.course_news.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_COURSE_NEW_ALL: {
            return { ...state, course_news: [] };
        }
        case CHANGE_COURSE_NEW_PENDING_EDIT: {
            return { ...state, selectedCourseNew: action.course_new };
        }
        case CLEAR_COURSE_NEW_PENDING_EDIT: {
            return { ...state, selectedCourseNew: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default course_newsReducer;