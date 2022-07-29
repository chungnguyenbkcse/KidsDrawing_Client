import { IStudentLeaveState, IActionBase } from "../models/root.interface";
import { 
    ADD_LEAVES, EDIT_LEAVES, REMOVE_LEAVES,INITIAL_LEAVES, REMOVE_LEAVES_ALL, 
    ADD_ACCEPT_LEAVE, EDIT_ACCEPT_LEAVE, REMOVE_ACCEPT_LEAVE, INITIAL_ACCEPT_LEAVE, REMOVE_ACCEPT_LEAVE_ALL, 
    ADD_REMOVE_LEAVE, EDIT_REMOVE_LEAVE, REMOVE_REMOVE_LEAVE , INITIAL_REMOVE_LEAVE, REMOVE_REMOVE_LEAVE_ALL,
    CHANGE_USER_PENDING_EDIT, CLEAR_USER_PENDING_EDIT, SET_MODIFICATION_STATE

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
        case INITIAL_LEAVES: {
            return { ...state, leaves : [...state.leaves, action.student_leave]};
        }
        case REMOVE_LEAVES_ALL: {
            return { ...state, leaves: [] };
        }
        case ADD_LEAVES: {
            return { ...state, leaves: [...state.leaves, action.student_leave]};
        }
        case EDIT_LEAVES: {
            const foundIndex: number = state.leaves.findIndex(pr => pr.id === action.student_leave.id);
            let leavess: IStudentLeave[] = state.leaves;
            leavess[foundIndex] = action.student_leave;
            return { ...state, leaves: leavess };
        }
        case REMOVE_LEAVES: {
            return { ...state, leaves: state.leaves.filter(x=>x.id !== action.student_leave.id)};
        }

        case INITIAL_ACCEPT_LEAVE: {
            return { ...state, acceptLeaves : [...state.acceptLeaves, action.student_leave]};
        }
        case REMOVE_ACCEPT_LEAVE_ALL: {
            return { ...state, acceptLeaves: [] };
        }
        case ADD_ACCEPT_LEAVE: {
            return { ...state, acceptLeaves: [...state.acceptLeaves, action.student_leave]};
        }
        case EDIT_ACCEPT_LEAVE: {
            const foundIndex: number = state.acceptLeaves.findIndex(pr => pr.id === action.student_leave.id);
            let accept_leaves: IStudentLeave[] = state.acceptLeaves;
            accept_leaves[foundIndex] = action.student_leave;
            return { ...state, acceptLeaves: accept_leaves };
        }
        case REMOVE_ACCEPT_LEAVE: {
            return { ...state, acceptLeaves: state.acceptLeaves.filter(x=>x.id !== action.student_leave.id)};
        }

        case INITIAL_REMOVE_LEAVE: {
            return { ...state, removeLeaves : [...state.removeLeaves, action.student_leave]};
        }
        case REMOVE_REMOVE_LEAVE_ALL: {
            return { ...state, removeLeaves: [] };
        }
        case ADD_REMOVE_LEAVE: {
            return { ...state, removeLeaves: [...state.removeLeaves, action.student_leave]};
        }
        case EDIT_REMOVE_LEAVE: {
            const foundIndex: number = state.removeLeaves.findIndex(pr => pr.id === action.student_leave.id);
            let remove_leaves: IStudentLeave[] = state.removeLeaves;
            remove_leaves[foundIndex] = action.student_leave;
            return { ...state, removeLeaves: remove_leaves };
        }
        case REMOVE_REMOVE_LEAVE: {
            return { ...state, removeLeaves: state.removeLeaves.filter(x=>x.id !== action.student_leave.id)};
        }
        
        case CHANGE_USER_PENDING_EDIT: {
            return { ...state, selectedStudentLeave: action.student_leave };
        }
        case CLEAR_USER_PENDING_EDIT: {
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