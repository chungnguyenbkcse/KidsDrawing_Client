import { ISemesterClassStudentState, IActionBase } from "../models/root.interface";
import { 
    ADD_NOT_PAYED_NOW, EDIT_NOT_PAYED_NOW, REMOVE_NOT_PAYED_NOW,INITIAL_NOT_PAYED_NOW, REMOVE_NOT_PAYED_NOW_ALL, 
    ADD_PAYED, EDIT_PAYED, REMOVE_PAYED, INITIAL_PAYED, REMOVE_PAYED_ALL, 
    ADD_NOT_PAYED, EDIT_NOT_PAYED, REMOVE_NOT_PAYED , INITIAL_NOT_PAYED, REMOVE_NOT_PAYED_ALL,
    CLEAR_NOT_PAYED_NOW_PENDING_EDIT, CHANGE_NOT_PAYED_NOW_PENDING_EDIT, SET_MODIFICATION_STATE

} from "../actions/semester_class_student.action";
import { ISemesterClassStudent, SemesterClassStudentModificationStatus } from "../models/semester_class_student.interface";

const initialState: ISemesterClassStudentState = {
    modificationState: SemesterClassStudentModificationStatus.None,
    selectedSemesterClassStudent: null,
    not_payed_now: [],
    payed: [],
    not_payed: []
};

function semesterClassStudentReducer(state: ISemesterClassStudentState = initialState, action: IActionBase): ISemesterClassStudentState {
    switch (action.type) {
        case INITIAL_NOT_PAYED_NOW: {
            return { ...state, not_payed_now : [...state.not_payed_now, action.semester_class_student]};
        }
        case REMOVE_NOT_PAYED_NOW_ALL: {
            return { ...state, not_payed_now: [] };
        }
        case ADD_NOT_PAYED_NOW: {
            return { ...state, not_payed_now: [...state.not_payed_now, action.semester_class_student]};
        }
        case EDIT_NOT_PAYED_NOW: {
            const foundIndex: number = state.not_payed_now.findIndex(pr => pr.id === action.semester_class_student.id);
            let not_payed_now: ISemesterClassStudent[] = state.not_payed_now;
            not_payed_now[foundIndex] = action.semester_class_student;
            return { ...state, not_payed_now: not_payed_now };
        }
        case REMOVE_NOT_PAYED_NOW: {
            return { ...state, not_payed_now: state.not_payed_now.filter(x=>x.id !== action.semester_class_student.id)};
        }

        case INITIAL_PAYED: {
            return { ...state, payed : [...state.payed, action.semester_class_student]};
        }
        case REMOVE_PAYED_ALL: {
            return { ...state, payed: [] };
        }
        case ADD_PAYED: {
            return { ...state, payed: [...state.payed, action.semester_class_student]};
        }
        case EDIT_PAYED: {
            const foundIndex: number = state.payed.findIndex(pr => pr.id === action.semester_class_student.id);
            let accept_not_payed_now: ISemesterClassStudent[] = state.payed;
            accept_not_payed_now[foundIndex] = action.semester_class_student;
            return { ...state, payed: accept_not_payed_now };
        }
        case REMOVE_PAYED: {
            return { ...state, payed: state.payed.filter(x=>x.id !== action.semester_class_student.id)};
        }

        case INITIAL_NOT_PAYED: {
            return { ...state, not_payed : [...state.not_payed, action.semester_class_student]};
        }
        case REMOVE_NOT_PAYED_ALL: {
            return { ...state, not_payed: [] };
        }
        case ADD_NOT_PAYED: {
            return { ...state, not_payed: [...state.not_payed, action.semester_class_student]};
        }
        case EDIT_NOT_PAYED: {
            const foundIndex: number = state.not_payed.findIndex(pr => pr.id === action.semester_class_student.id);
            let remove_not_payed_now: ISemesterClassStudent[] = state.not_payed;
            remove_not_payed_now[foundIndex] = action.semester_class_student;
            return { ...state, not_payed: remove_not_payed_now };
        }
        case REMOVE_NOT_PAYED: {
            return { ...state, not_payed: state.not_payed.filter(x=>x.id !== action.semester_class_student.id)};
        }
        
        case CHANGE_NOT_PAYED_NOW_PENDING_EDIT: {
            return { ...state, selectedSemesterClassStudent: action.semester_class_student };
        }
        case CLEAR_NOT_PAYED_NOW_PENDING_EDIT: {
            return { ...state, selectedSemesterClassStudent: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default semesterClassStudentReducer;