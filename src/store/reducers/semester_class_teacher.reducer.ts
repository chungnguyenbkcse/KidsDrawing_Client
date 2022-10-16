import { ISemesterClassTeacherState, IActionBase } from "../models/root.interface";
import { ADD_SEMESTER_CLASS_TEACHER, CHANGE_SEMESTER_CLASS_TEACHER_PENDING_EDIT, EDIT_SEMESTER_CLASS_TEACHER, REMOVE_SEMESTER_CLASS_TEACHER,
    CLEAR_SEMESTER_CLASS_TEACHER_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_SEMESTER_CLASS_TEACHER, REMOVE_SEMESTER_CLASS_TEACHER_ALL} from "../actions/semester_class_teacher.action";
import { ISemesterClassTeacher, SemesterClassTeacherModificationStatus } from "../models/semester_class_teacher.interface";



const initialState: ISemesterClassTeacherState = {
    modificationState: SemesterClassTeacherModificationStatus.None,
    selectedSemesterClassTeacher: null,
    semester_class_teachers: []
};

function semester_class_teachersReducer(state: ISemesterClassTeacherState = initialState, action: IActionBase): ISemesterClassTeacherState {
    switch (action.type) {
        case INITIAL_SEMESTER_CLASS_TEACHER: {
            return { ...state, semester_class_teachers : [...state.semester_class_teachers, action.semester_class_teacher]};
        }
        case ADD_SEMESTER_CLASS_TEACHER: {
            return { ...state, semester_class_teachers: [...state.semester_class_teachers, action.semester_class_teacher]};
        }
        case EDIT_SEMESTER_CLASS_TEACHER: {
            const foundIndex: number = state.semester_class_teachers.findIndex(pr => pr.id === action.semester_class_teacher.id);
            let semester_class_teachers: ISemesterClassTeacher[] = state.semester_class_teachers;
            semester_class_teachers[foundIndex] = action.semester_class_teacher;
            return { ...state, semester_class_teachers: semester_class_teachers };
        }
        case REMOVE_SEMESTER_CLASS_TEACHER: {
            return { ...state, semester_class_teachers: state.semester_class_teachers.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SEMESTER_CLASS_TEACHER_ALL: {
            return { ...state, semester_class_teachers: [] };
        }
        case CHANGE_SEMESTER_CLASS_TEACHER_PENDING_EDIT: {
            return { ...state, selectedSemesterClassTeacher: action.semester_class_teacher };
        }
        case CLEAR_SEMESTER_CLASS_TEACHER_PENDING_EDIT: {
            return { ...state, selectedSemesterClassTeacher: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default semester_class_teachersReducer;