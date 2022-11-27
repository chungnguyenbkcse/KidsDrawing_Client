import { IStudentLeaveState, IActionBase } from "../models/root.interface";
import { 
    ADD_STUDENT_LEAVE_NOT_APPROVED_NOW, EDIT_STUDENT_LEAVE_NOT_APPROVED_NOW, REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW,INITIAL_STUDENT_LEAVE_NOT_APPROVED_NOW, REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW_ALL, 
    ADD_STUDENT_LEAVE_APPROVED, EDIT_STUDENT_LEAVE_APPROVED, REMOVE_STUDENT_LEAVE_APPROVED, INITIAL_STUDENT_LEAVE_APPROVED, REMOVE_STUDENT_LEAVE_APPROVED_ALL, 
    ADD_STUDENT_LEAVE_NOT_APPROVED, EDIT_STUDENT_LEAVE_NOT_APPROVED, REMOVE_STUDENT_LEAVE_NOT_APPROVED , INITIAL_STUDENT_LEAVE_NOT_APPROVED, REMOVE_STUDENT_LEAVE_NOT_APPROVED_ALL,
    CLEAR_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT, CHANGE_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT, SET_MODIFICATION_STATE

} from "../actions/student_leave.action";
import { IStudentLeave, StudentLeaveModificationStatus } from "../models/student_leave.interface";

const initialState: IStudentLeaveState = {
    modificationState: StudentLeaveModificationStatus.None,
    selectedStudentLeave: null,
    leaves: [],
    acceptLeaves: [],
    removeLeaves: []
};

function studentLeaveReducer(state: IStudentLeaveState = initialState, action: IActionBase): IStudentLeaveState {
    switch (action.type) {
        case INITIAL_STUDENT_LEAVE_NOT_APPROVED_NOW: {
            return { ...state, leaves : [...state.leaves, action.student_leave]};
        }
        case REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW_ALL: {
            return { ...state, leaves: [] };
        }
        case ADD_STUDENT_LEAVE_NOT_APPROVED_NOW: {
            return { ...state, leaves: [...state.leaves, action.student_leave]};
        }
        case EDIT_STUDENT_LEAVE_NOT_APPROVED_NOW: {
            const foundIndex: number = state.leaves.findIndex(pr => pr.id === action.student_leave.id);
            let leavess: IStudentLeave[] = state.leaves;
            leavess[foundIndex] = action.student_leave;
            return { ...state, leaves: leavess };
        }
        case REMOVE_STUDENT_LEAVE_NOT_APPROVED_NOW: {
            return { ...state, leaves: state.leaves.filter(x=>x.id !== action.student_leave.id)};
        }

        case INITIAL_STUDENT_LEAVE_APPROVED: {
            return { ...state, acceptLeaves : [...state.acceptLeaves, action.student_leave]};
        }
        case REMOVE_STUDENT_LEAVE_APPROVED_ALL: {
            return { ...state, acceptLeaves: [] };
        }
        case ADD_STUDENT_LEAVE_APPROVED: {
            return { ...state, acceptLeaves: [...state.acceptLeaves, action.student_leave]};
        }
        case EDIT_STUDENT_LEAVE_APPROVED: {
            const foundIndex: number = state.acceptLeaves.findIndex(pr => pr.id === action.student_leave.id);
            let accept_leaves: IStudentLeave[] = state.acceptLeaves;
            accept_leaves[foundIndex] = action.student_leave;
            return { ...state, acceptLeaves: accept_leaves };
        }
        case REMOVE_STUDENT_LEAVE_APPROVED: {
            return { ...state, acceptLeaves: state.acceptLeaves.filter(x=>x.id !== action.student_leave.id)};
        }

        case INITIAL_STUDENT_LEAVE_NOT_APPROVED: {
            return { ...state, removeLeaves : [...state.removeLeaves, action.student_leave]};
        }
        case REMOVE_STUDENT_LEAVE_NOT_APPROVED_ALL: {
            return { ...state, removeLeaves: [] };
        }
        case ADD_STUDENT_LEAVE_NOT_APPROVED: {
            return { ...state, removeLeaves: [...state.removeLeaves, action.student_leave]};
        }
        case EDIT_STUDENT_LEAVE_NOT_APPROVED: {
            const foundIndex: number = state.removeLeaves.findIndex(pr => pr.id === action.student_leave.id);
            let remove_leaves: IStudentLeave[] = state.removeLeaves;
            remove_leaves[foundIndex] = action.student_leave;
            return { ...state, removeLeaves: remove_leaves };
        }
        case REMOVE_STUDENT_LEAVE_NOT_APPROVED: {
            return { ...state, removeLeaves: state.removeLeaves.filter(x=>x.id !== action.student_leave.id)};
        }
        
        case CHANGE_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT: {
            return { ...state, selectedStudentLeave: action.student_leave };
        }
        case CLEAR_STUDENT_LEAVE_NOT_APPROVED_NOW_PENDING_EDIT: {
            return { ...state, selectedStudentLeave: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default studentLeaveReducer;