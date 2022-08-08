import { ITeacherRegisterQuantificationState, IActionBase } from "../models/root.interface";
import { ADD_TEACHER_REGISTER_QUANTIFICATION, CHANGE_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT, EDIT_TEACHER_REGISTER_QUANTIFICATION, REMOVE_TEACHER_REGISTER_QUANTIFICATION,
    CLEAR_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TEACHER_REGISTER_QUANTIFICATION, REMOVE_TEACHER_REGISTER_QUANTIFICATION_ALL} from "../actions/teacher_register_quantification.action";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../models/teacher_register_quantification.interface";



const initialState: ITeacherRegisterQuantificationState = {
    modificationState: TeacherRegisterQuantificationModificationStatus.None,
    selectedTeacherRegisterQuantification: null,
    teacherRegisterQuantifications: []
};

function teacher_register_quantificationsReducer(state: ITeacherRegisterQuantificationState = initialState, action: IActionBase): ITeacherRegisterQuantificationState {
    switch (action.type) {
        case INITIAL_TEACHER_REGISTER_QUANTIFICATION: {
            return { ...state, teacherRegisterQuantifications : [...state.teacherRegisterQuantifications, action.teacher_register_quantification]};
        }
        case ADD_TEACHER_REGISTER_QUANTIFICATION: {
            return { ...state, teacherRegisterQuantifications: [...state.teacherRegisterQuantifications, action.teacher_register_quantification]};
        }
        case EDIT_TEACHER_REGISTER_QUANTIFICATION: {
            const foundIndex: number = state.teacherRegisterQuantifications.findIndex(pr => pr.id === action.teacher_register_quantification.id);
            let teacher_register_quantifications: ITeacherRegisterQuantification[] = state.teacherRegisterQuantifications;
            teacher_register_quantifications[foundIndex] = action.teacher_register_quantification;
            return { ...state, teacherRegisterQuantifications: teacher_register_quantifications };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION: {
            return { ...state, teacherRegisterQuantifications: state.teacherRegisterQuantifications.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION_ALL: {
            return { ...state, teacherRegisterQuantifications: [] };
        }
        case CHANGE_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT: {
            return { ...state, selectedTeacherRegisterQuantification: action.teacher_register_quantification };
        }
        case CLEAR_TEACHER_REGISTER_QUANTIFICATION_PENDING_EDIT: {
            return { ...state, selectedTeacherRegisterQuantification: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default teacher_register_quantificationsReducer;