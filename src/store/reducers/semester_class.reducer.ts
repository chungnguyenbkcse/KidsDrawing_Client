import { ISemesterClassState, IActionBase } from "../models/root.interface";
import { ADD_SEMESTER_CLASS, CHANGE_SEMESTER_CLASS_PENDING_EDIT, EDIT_SEMESTER_CLASS, REMOVE_SEMESTER_CLASS,
    CLEAR_SEMESTER_CLASS_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_SEMESTER_CLASS, REMOVE_SEMESTER_CLASS_ALL} from "../actions/semester_class.action";
import { ISemesterClass, SemesterClassModificationStatus } from "../models/semester_class.interface";



const initialState: ISemesterClassState = {
    modificationState: SemesterClassModificationStatus.None,
    selectedSemesterClass: null,
    semesterClasses: []
};

function semesterClassesReducer(state: ISemesterClassState = initialState, action: IActionBase): ISemesterClassState {
    switch (action.type) {
        case INITIAL_SEMESTER_CLASS: {
            return { ...state, semesterClasses : [...state.semesterClasses, action.semester_class]};
        }
        case ADD_SEMESTER_CLASS: {
            return { ...state, semesterClasses: [...state.semesterClasses, action.semester_class]};
        }
        case EDIT_SEMESTER_CLASS: {
            const foundIndex: number = state.semesterClasses.findIndex(pr => pr.id === action.semester_class.id);
            let semesterClasses: ISemesterClass[] = state.semesterClasses;
            semesterClasses[foundIndex] = action.semester_class;
            return { ...state, semesterClasses: semesterClasses };
        }
        case REMOVE_SEMESTER_CLASS: {
            return { ...state, semesterClasses: state.semesterClasses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SEMESTER_CLASS_ALL: {
            return { ...state, semesterClasses: [] };
        }
        case CHANGE_SEMESTER_CLASS_PENDING_EDIT: {
            return { ...state, selectedSemesterClass: action.semester_class };
        }
        case CLEAR_SEMESTER_CLASS_PENDING_EDIT: {
            return { ...state, selectedSemesterClass: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default semesterClassesReducer;