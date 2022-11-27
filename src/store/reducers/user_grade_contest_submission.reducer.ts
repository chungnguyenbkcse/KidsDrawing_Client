import { IUserGradeContestSubmissionState, IActionBase } from "../models/root.interface";
import { ADD_USER_GRADE_CONTEST_SUBMISSION, CHANGE_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT, EDIT_USER_GRADE_CONTEST_SUBMISSION, REMOVE_USER_GRADE_CONTEST_SUBMISSION,
    CLEAR_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_USER_GRADE_CONTEST_SUBMISSION, REMOVE_USER_GRADE_CONTEST_SUBMISSION_ALL} from "../actions/user_grade_contest_submission.action";
import { IUserGradeContestSubmission, UserGradeContestSubmissionModificationStatus } from "../models/user_grade_contest_submission.interface";



const initialState: IUserGradeContestSubmissionState = {
    modificationState: UserGradeContestSubmissionModificationStatus.None,
    selectedUserGradeContestSubmission: null,
    userGradeContestSubmissions: []
};

function userGradeContestSubmissionsReducer(state: IUserGradeContestSubmissionState = initialState, action: IActionBase): IUserGradeContestSubmissionState {
    switch (action.type) {
        case INITIAL_USER_GRADE_CONTEST_SUBMISSION: {
            return { ...state, userGradeContestSubmissions : [...state.userGradeContestSubmissions, action.user_grade_contest_submission]};
        }
        case ADD_USER_GRADE_CONTEST_SUBMISSION: {
            return { ...state, userGradeContestSubmissions: [...state.userGradeContestSubmissions, action.user_grade_contest_submission]};
        }
        case EDIT_USER_GRADE_CONTEST_SUBMISSION: {
            const foundIndex: number = state.userGradeContestSubmissions.findIndex(pr => pr.student_id === action.user_grade_contest_submission.id);
            let userGradeContestSubmissions: IUserGradeContestSubmission[] = state.userGradeContestSubmissions;
            userGradeContestSubmissions[foundIndex] = action.user_grade_contest_submission;
            return { ...state, userGradeContestSubmissions: userGradeContestSubmissions };
        }
        case REMOVE_USER_GRADE_CONTEST_SUBMISSION: {
            return { ...state, userGradeContestSubmissions: state.userGradeContestSubmissions.filter(pr => pr.student_id !== action.id) };
        }
        case REMOVE_USER_GRADE_CONTEST_SUBMISSION_ALL: {
            return { ...state, userGradeContestSubmissions: [] };
        }
        case CHANGE_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT: {
            return { ...state, selectedUserGradeContestSubmission: action.user_grade_contest_submission };
        }
        case CLEAR_USER_GRADE_CONTEST_SUBMISSION_PENDING_EDIT: {
            return { ...state, selectedUserGradeContestSubmission: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default userGradeContestSubmissionsReducer;