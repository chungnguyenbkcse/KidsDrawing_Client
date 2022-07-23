import { ILessonState, IActionBase } from "../models/root.interface";
import { ADD_LESSON, CHANGE_LESSON_PENDING_EDIT, EDIT_LESSON, REMOVE_LESSON,
    CLEAR_LESSON_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_LESSON, REMOVE_LESSON_ALL} from "../actions/lesson.action";
import { ILesson, LessonModificationStatus } from "../models/lesson.interface";



const initialState: ILessonState = {
    modificationState: LessonModificationStatus.None,
    selectedLesson: null,
    lessons: []
};

function lessonsReducer(state: ILessonState = initialState, action: IActionBase): ILessonState {
    switch (action.type) {
        case INITIAL_LESSON: {
            return { ...state, lessons : [...state.lessons, action.lesson]};
        }
        case ADD_LESSON: {
            return { ...state, lessons: [...state.lessons, action.lesson]};
        }
        case EDIT_LESSON: {
            const foundIndex: number = state.lessons.findIndex(pr => pr.id === action.lesson.id);
            let lessons: ILesson[] = state.lessons;
            lessons[foundIndex] = action.lesson;
            return { ...state, lessons: lessons };
        }
        case REMOVE_LESSON: {
            return { ...state, lessons: state.lessons.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_LESSON_ALL: {
            return { ...state, lessons: [] };
        }
        case CHANGE_LESSON_PENDING_EDIT: {
            return { ...state, selectedLesson: action.lesson };
        }
        case CLEAR_LESSON_PENDING_EDIT: {
            return { ...state, selectedLesson: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default lessonsReducer;