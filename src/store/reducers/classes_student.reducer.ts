import { IClassesStudentState, IActionBase } from "../models/root.interface";
import { ADD_CLASSES_STUDENT, CHANGE_CLASSES_STUDENT_PENDING_EDIT, EDIT_CLASSES_STUDENT, REMOVE_CLASSES_STUDENT,
    CLEAR_CLASSES_STUDENT_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CLASSES_STUDENT, REMOVE_CLASSES_STUDENT_ALL} from "../actions/classes_student.action";
import { IClassesStudent, ClassesStudentModificationStatus } from "../models/classes_student.interface";



const initialState: IClassesStudentState = {
    modificationState: ClassesStudentModificationStatus.None,
    selectedClassesStudent: null,
    classes_students: []
};

function classes_studentsReducer(state: IClassesStudentState = initialState, action: IActionBase): IClassesStudentState {
    switch (action.type) {
        case INITIAL_CLASSES_STUDENT: {
            return { ...state, classes_students : [...state.classes_students, action.classes_student]};
        }
        case ADD_CLASSES_STUDENT: {
            return { ...state, classes_students: [...state.classes_students, action.classes_student]};
        }
        case EDIT_CLASSES_STUDENT: {
            const foundIndex: number = state.classes_students.findIndex(pr => pr.id === action.classes_student.id);
            let classes_students: IClassesStudent[] = state.classes_students;
            classes_students[foundIndex] = action.classes_student;
            return { ...state, classes_students: classes_students };
        }
        case REMOVE_CLASSES_STUDENT: {
            return { ...state, classes_students: state.classes_students.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CLASSES_STUDENT_ALL: {
            return { ...state, classes_students: [] };
        }
        case CHANGE_CLASSES_STUDENT_PENDING_EDIT: {
            return { ...state, selectedClassesStudent: action.classes_student };
        }
        case CLEAR_CLASSES_STUDENT_PENDING_EDIT: {
            return { ...state, selectedClassesStudent: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default classes_studentsReducer;