import { ITeacherRegisterQuantificationState, IActionBase } from "../models/root.interface";
import { ADD_TEACHER_REGISTER_QUANTIFICATION_APPROVED, CHANGE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT, 
    EDIT_TEACHER_REGISTER_QUANTIFICATION_APPROVED, REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED,
    CLEAR_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT,INITIAL_TEACHER_REGISTER_QUANTIFICATION_APPROVED, 
    REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_ALL,  
    ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED, CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT, 
    EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED, REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED,
    CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT,INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED, 
    REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_ALL,  
    ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW, CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT, 
    EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW, REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW,
    CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT,INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW, 
    REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_ALL, 
    SET_MODIFICATION_STATE} from "../actions/teacher_register_quantification.action";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "../models/teacher_register_quantification.interface";



const initialState: ITeacherRegisterQuantificationState = {
    modificationState: TeacherRegisterQuantificationModificationStatus.None,
    selectedTeacherRegisterQuantification: null,
    approveds: [],
    not_approved_now: [],
    not_approves: []
};

function teacher_register_quantificationsReducer(state: ITeacherRegisterQuantificationState = initialState, action: IActionBase): ITeacherRegisterQuantificationState {
    switch (action.type) {
        case INITIAL_TEACHER_REGISTER_QUANTIFICATION_APPROVED: {
            return { ...state, approveds : [...state.approveds, action.teacher_register_quantification_approved]};
        }
        case ADD_TEACHER_REGISTER_QUANTIFICATION_APPROVED: {
            return { ...state, approveds : [...state.approveds, action.teacher_register_quantification_approved]};
        }
        case EDIT_TEACHER_REGISTER_QUANTIFICATION_APPROVED: {
            const foundIndex: number = state.approveds.findIndex(pr => pr.id === action.teacher_register_quantification_approved.id);
            let approveds: ITeacherRegisterQuantification[] = state.approveds;
            approveds[foundIndex] = action.teacher_register_quantification_approved;
            return { ...state, approveds: approveds };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED: {
            return { ...state, approveds: state.approveds.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_ALL: {
            return { ...state, approveds: [] };
        }
        case CHANGE_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT: {
            return { ...state, selectedTeacherRegisterQuantification: action.teacher_register_quantification_approved };
        }
        case CLEAR_TEACHER_REGISTER_QUANTIFICATION_APPROVED_PENDING_EDIT: {
            return { ...state, selectedTeacherRegisterQuantification: null };
        }

        case INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: {
            return { ...state, not_approves : [...state.not_approves, action.teacher_register_quantification_not_approved]};
        }
        case ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: {
            return { ...state, not_approves : [...state.not_approves, action.teacher_register_quantification_not_approved]};
        }
        case EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: {
            const foundIndex: number = state.not_approves.findIndex(pr => pr.id === action.teacher_register_quantification_not_approved.id);
            let not_approveds: ITeacherRegisterQuantification[] = state.not_approves;
            not_approveds[foundIndex] = action.teacher_register_quantification_not_approved;
            return { ...state, not_approves: not_approveds };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED: {
            return { ...state, not_approves: state.not_approves.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_ALL: {
            return { ...state, not_approves: [] };
        }
        case CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT: {
            return { ...state, selectedTeacherRegisterQuantification: action.teacher_register_quantification_not_approved };
        }
        case CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_PENDING_EDIT: {
            return { ...state, selectedTeacherRegisterQuantification: null };
        }


        case INITIAL_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: {
            return { ...state, not_approved_now : [...state.not_approved_now, action.teacher_register_quantification_not_approved_now]};
        }
        case ADD_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: {
            return { ...state, not_approved_now : [...state.not_approved_now, action.teacher_register_quantification_not_approved_now]};
        }
        case EDIT_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: {
            const foundIndex: number = state.not_approved_now.findIndex(pr => pr.id === action.teacher_register_quantification_not_approved_now.id);
            let not_approved_now: ITeacherRegisterQuantification[] = state.not_approved_now;
            not_approved_now[foundIndex] = action.teacher_register_quantification_not_approved_now;
            return { ...state, not_approved_now: not_approved_now };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW: {
            return { ...state, not_approved_now: state.not_approved_now.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_ALL: {
            return { ...state, not_approved_now: [] };
        }
        case CHANGE_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT: {
            return { ...state, selectedTeacherRegisterQuantification: action.teacher_register_quantification_not_approved_now };
        }
        case CLEAR_TEACHER_REGISTER_QUANTIFICATION_NOT_APPROVED_NOW_PENDING_EDIT: {
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