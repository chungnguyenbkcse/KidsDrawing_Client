import { ITeacherLeaveState, IActionBase } from "../models/root.interface";
import { 
    ADD_LEAVES, EDIT_LEAVES, REMOVE_LEAVES,INITIAL_LEAVES, REMOVE_LEAVES_ALL, 
    ADD_ACCEPT_LEAVE, EDIT_ACCEPT_LEAVE, REMOVE_ACCEPT_LEAVE, INITIAL_ACCEPT_LEAVE, REMOVE_ACCEPT_LEAVE_ALL, 
    ADD_REMOVE_LEAVE, EDIT_REMOVE_LEAVE, REMOVE_REMOVE_LEAVE , INITIAL_REMOVE_LEAVE, REMOVE_REMOVE_LEAVE_ALL,
    CHANGE_USER_PENDING_EDIT, CLEAR_USER_PENDING_EDIT, SET_MODIFICATION_STATE

} from "../actions/teacher_leave.action";
import { ITeacherLeave, TeacherLeaveModificationStatus } from "../models/teacher_leave.interface";

const initialState: ITeacherLeaveState = {
    modificationState: TeacherLeaveModificationStatus.None,
    selectedTeacherLeave: null,
    leaves: [],
    acceptLeaves: [],
    removeLeaves: []
};

function teacherLeaveReducer(state: ITeacherLeaveState = initialState, action: IActionBase): ITeacherLeaveState {
    switch (action.type) {
        case INITIAL_LEAVES: {
            return { ...state, leaves : [...state.leaves, action.teacher_leave]};
        }
        case REMOVE_LEAVES_ALL: {
            return { ...state, leaves: [] };
        }
        case ADD_LEAVES: {
            return { ...state, leaves: [...state.leaves, action.teacher_leave]};
        }
        case EDIT_LEAVES: {
            const foundIndex: number = state.leaves.findIndex(pr => pr.id === action.teacher_leave.id);
            let leavess: ITeacherLeave[] = state.leaves;
            leavess[foundIndex] = action.teacher_leave;
            return { ...state, leaves: leavess };
        }
        case REMOVE_LEAVES: {
            return { ...state, leaves: state.leaves.filter(x=>x.id !== action.teacher_leave.id)};
        }

        case INITIAL_ACCEPT_LEAVE: {
            return { ...state, acceptLeaves : [...state.acceptLeaves, action.teacher_leave]};
        }
        case REMOVE_ACCEPT_LEAVE_ALL: {
            return { ...state, acceptLeaves: [] };
        }
        case ADD_ACCEPT_LEAVE: {
            return { ...state, acceptLeaves: [...state.acceptLeaves, action.teacher_leave]};
        }
        case EDIT_ACCEPT_LEAVE: {
            const foundIndex: number = state.acceptLeaves.findIndex(pr => pr.id === action.teacher_leave.id);
            let accept_leaves: ITeacherLeave[] = state.acceptLeaves;
            accept_leaves[foundIndex] = action.teacher_leave;
            return { ...state, acceptLeaves: accept_leaves };
        }
        case REMOVE_ACCEPT_LEAVE: {
            return { ...state, acceptLeaves: state.acceptLeaves.filter(x=>x.id !== action.teacher_leave.id)};
        }

        case INITIAL_REMOVE_LEAVE: {
            return { ...state, removeLeaves : [...state.removeLeaves, action.teacher_leave]};
        }
        case REMOVE_REMOVE_LEAVE_ALL: {
            return { ...state, removeLeaves: [] };
        }
        case ADD_REMOVE_LEAVE: {
            return { ...state, removeLeaves: [...state.removeLeaves, action.teacher_leave]};
        }
        case EDIT_REMOVE_LEAVE: {
            const foundIndex: number = state.removeLeaves.findIndex(pr => pr.id === action.teacher_leave.id);
            let remove_leaves: ITeacherLeave[] = state.removeLeaves;
            remove_leaves[foundIndex] = action.teacher_leave;
            return { ...state, removeLeaves: remove_leaves };
        }
        case REMOVE_REMOVE_LEAVE: {
            return { ...state, removeLeaves: state.removeLeaves.filter(x=>x.id !== action.teacher_leave.id)};
        }
        
        case CHANGE_USER_PENDING_EDIT: {
            return { ...state, selectedTeacherLeave: action.teacher_leave };
        }
        case CLEAR_USER_PENDING_EDIT: {
            return { ...state, selectedTeacherLeave: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default teacherLeaveReducer;