import { IClassHasRegisterJoinSemesterState, IActionBase } from "../models/root.interface";
import { ADD_CLASS_HAS_REGISTER_JOIN_SEMESTER, CHANGE_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT, EDIT_CLASS_HAS_REGISTER_JOIN_SEMESTER, REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER,
    CLEAR_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CLASS_HAS_REGISTER_JOIN_SEMESTER, REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER_ALL} from "../actions/class_has_register_join_semester.action";
import { IClassHasRegisterJoinSemester, ClassHasRegisterJoinSemesterModificationStatus } from "../models/class_has_register_join_semester.interface";



const initialState: IClassHasRegisterJoinSemesterState = {
    modificationState: ClassHasRegisterJoinSemesterModificationStatus.None,
    selectedClassHasRegisterJoinSemester: null,
    class_has_register_join_semesters: []
};

function class_has_register_join_semestersReducer(state: IClassHasRegisterJoinSemesterState = initialState, action: IActionBase): IClassHasRegisterJoinSemesterState {
    switch (action.type) {
        case INITIAL_CLASS_HAS_REGISTER_JOIN_SEMESTER: {
            return { ...state, class_has_register_join_semesters : [...state.class_has_register_join_semesters, action.class_has_register_join_semester]};
        }
        case ADD_CLASS_HAS_REGISTER_JOIN_SEMESTER: {
            return { ...state, class_has_register_join_semesters: [...state.class_has_register_join_semesters, action.class_has_register_join_semester]};
        }
        case EDIT_CLASS_HAS_REGISTER_JOIN_SEMESTER: {
            const foundIndex: number = state.class_has_register_join_semesters.findIndex(pr => pr.classes_id === action.class_has_register_join_semester.classes_id);
            let class_has_register_join_semesters: IClassHasRegisterJoinSemester[] = state.class_has_register_join_semesters;
            class_has_register_join_semesters[foundIndex] = action.class_has_register_join_semester;
            return { ...state, class_has_register_join_semesters: class_has_register_join_semesters };
        }
        case REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER: {
            return { ...state, class_has_register_join_semesters: state.class_has_register_join_semesters.filter(pr => pr.classes_id !== action.id) };
        }
        case REMOVE_CLASS_HAS_REGISTER_JOIN_SEMESTER_ALL: {
            return { ...state, class_has_register_join_semesters: [] };
        }
        case CHANGE_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedClassHasRegisterJoinSemester: action.class_has_register_join_semester };
        }
        case CLEAR_CLASS_HAS_REGISTER_JOIN_SEMESTER_PENDING_EDIT: {
            return { ...state, selectedClassHasRegisterJoinSemester: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default class_has_register_join_semestersReducer;