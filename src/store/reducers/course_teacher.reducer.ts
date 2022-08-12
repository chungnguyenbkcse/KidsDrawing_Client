import { ICourseTeacherState, IActionBase } from "../models/root.interface";
import { ADD_REGISTER_SUCCESSFULL_COURSE, CHANGE_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT, EDIT_REGISTER_SUCCESSFULL_COURSE, REMOVE_REGISTER_SUCCESSFULL_COURSE,
    CLEAR_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_REGISTER_SUCCESSFULL_COURSE, REMOVE_REGISTER_SUCCESSFULL_COURSE_ALL, INITIAL_NOT_REGISTER_COURSE, ADD_NOT_REGISTER_COURSE, EDIT_NOT_REGISTER_COURSE, REMOVE_NOT_REGISTER_COURSE, REMOVE_NOT_REGISTER_COURSE_ALL, CHANGE_NOT_REGISTER_COURSE_PENDING_EDIT, CLEAR_NOT_REGISTER_COURSE_PENDING_EDIT} from "../actions/course_teacher.action";
import { ICourseTeacher, CourseTeacherModificationStatus } from "../models/course_teacher.interface";



const initialState: ICourseTeacherState = {
    modificationState: CourseTeacherModificationStatus.None,
    selectedCourseTeacher: null,
    register_successfull_courses: [],
    not_register_courses: []
};

function courseTeachersReducer(state: ICourseTeacherState = initialState, action: IActionBase): ICourseTeacherState {
    switch (action.type) {
        case INITIAL_REGISTER_SUCCESSFULL_COURSE: {
            return { ...state, register_successfull_courses : [...state.register_successfull_courses, action.course]};
        }
        case ADD_REGISTER_SUCCESSFULL_COURSE: {
            return { ...state, register_successfull_courses: [...state.register_successfull_courses, action.course]};
        }
        case EDIT_REGISTER_SUCCESSFULL_COURSE: {
            const foundIndex: number = state.register_successfull_courses.findIndex(pr => pr.id === action.course.id);
            let register_successfull_courses: ICourseTeacher[] = state.register_successfull_courses;
            register_successfull_courses[foundIndex] = action.course;
            return { ...state, register_successfull_courses: register_successfull_courses };
        }
        case REMOVE_REGISTER_SUCCESSFULL_COURSE: {
            return { ...state, register_successfull_courses: state.register_successfull_courses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_REGISTER_SUCCESSFULL_COURSE_ALL: {
            return { ...state, register_successfull_courses: [] };
        }
        case CHANGE_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseTeacher: action.course };
        }
        case CLEAR_REGISTER_SUCCESSFULL_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseTeacher: null };
        }

        case INITIAL_NOT_REGISTER_COURSE: {
            return { ...state, not_register_courses : [...state.not_register_courses, action.course]};
        }
        case ADD_NOT_REGISTER_COURSE: {
            return { ...state, register_successfull_courses: [...state.register_successfull_courses, action.course]};
        }
        case EDIT_NOT_REGISTER_COURSE: {
            const foundIndex: number = state.not_register_courses.findIndex(pr => pr.id === action.course.id);
            let not_register_courses: ICourseTeacher[] = state.not_register_courses;
            not_register_courses[foundIndex] = action.course;
            return { ...state, not_register_courses: not_register_courses };
        }
        case REMOVE_NOT_REGISTER_COURSE: {
            return { ...state, not_register_courses: state.not_register_courses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_NOT_REGISTER_COURSE_ALL: {
            return { ...state, not_register_courses: [] };
        }
        case CHANGE_NOT_REGISTER_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseTeacher: action.course };
        }
        case CLEAR_NOT_REGISTER_COURSE_PENDING_EDIT: {
            return { ...state, selectedCourseTeacher: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default courseTeachersReducer;