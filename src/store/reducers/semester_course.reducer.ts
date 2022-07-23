import { ISemesterCourseState, IActionBase } from "../models/root.interface";
import { ADD_SEMESTER_COURSE, CHANGE_SEMESTER_COURSE_PENDING_EDIT, EDIT_SEMESTER_COURSE, REMOVE_SEMESTER_COURSE,
    CLEAR_SEMESTER_COURSE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_SEMESTER_COURSE, REMOVE_SEMESTER_COURSE_ALL} from "../actions/semester_course.action";
import { ISemesterCourse, SemesterCourseModificationStatus } from "../models/semester_course.interface";



const initialState: ISemesterCourseState = {
    modificationState: SemesterCourseModificationStatus.None,
    selectedSemesterCourse: null,
    semesterCourses: []
};

function semesterCoursesReducer(state: ISemesterCourseState = initialState, action: IActionBase): ISemesterCourseState {
    switch (action.type) {
        case INITIAL_SEMESTER_COURSE: {
            return { ...state, semesterCourses : [...state.semesterCourses, action.semesterCourse]};
        }
        case ADD_SEMESTER_COURSE: {
            return { ...state, semesterCourses: [...state.semesterCourses, action.semesterCourse]};
        }
        case EDIT_SEMESTER_COURSE: {
            const foundIndex: number = state.semesterCourses.findIndex(pr => pr.id === action.semesterCourse.id);
            let semesterCourses: ISemesterCourse[] = state.semesterCourses;
            semesterCourses[foundIndex] = action.semesterCourse;
            return { ...state, semesterCourses: semesterCourses };
        }
        case REMOVE_SEMESTER_COURSE: {
            return { ...state, semesterCourses: state.semesterCourses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SEMESTER_COURSE_ALL: {
            return { ...state, semesterCourses: [] };
        }
        case CHANGE_SEMESTER_COURSE_PENDING_EDIT: {
            return { ...state, selectedSemesterCourse: action.semesterCourse };
        }
        case CLEAR_SEMESTER_COURSE_PENDING_EDIT: {
            return { ...state, selectedSemesterCourse: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default semesterCoursesReducer;