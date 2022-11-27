import { IReportUserState, IActionBase } from "../models/root.interface";
import { ADD_REPORT_USER, CHANGE_REPORT_USER_PENDING_EDIT, EDIT_REPORT_USER, REMOVE_REPORT_USER,
    CLEAR_REPORT_USER_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_REPORT_USER, REMOVE_REPORT_USER_ALL} from "../actions/report_user.action";
import { IReportUser, ReportUserModificationStatus } from "../models/report_user.interface";



const initialState: IReportUserState = {
    modificationState: ReportUserModificationStatus.None,
    selectedReportUser: null,
    report_users: []
};

function report_usersReducer(state: IReportUserState = initialState, action: IActionBase): IReportUserState {
    switch (action.type) {
        case INITIAL_REPORT_USER: {
            return { ...state, report_users : [...state.report_users, action.report_user]};
        }
        case ADD_REPORT_USER: {
            return { ...state, report_users: [...state.report_users, action.report_user]};
        }
        case EDIT_REPORT_USER: {
            const foundIndex: number = state.report_users.findIndex(pr => pr.total === action.report_user.id);
            let report_users: IReportUser[] = state.report_users;
            report_users[foundIndex] = action.report_user;
            return { ...state, report_users: report_users };
        }
        case REMOVE_REPORT_USER: {
            return { ...state, report_users: state.report_users.filter(pr => pr.total !== action.id) };
        }
        case REMOVE_REPORT_USER_ALL: {
            return { ...state, report_users: [] };
        }
        case CHANGE_REPORT_USER_PENDING_EDIT: {
            return { ...state, selectedReportUser: action.report_user };
        }
        case CLEAR_REPORT_USER_PENDING_EDIT: {
            return { ...state, selectedReportUser: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default report_usersReducer;