import { IUserGradeExerciseSubmissionState, IActionBase } from "../models/root.interface";
import { ADD_USER_GRADE_EXERCISE_SUBMISSION, CHANGE_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT, EDIT_USER_GRADE_EXERCISE_SUBMISSION, REMOVE_USER_GRADE_EXERCISE_SUBMISSION,
    CLEAR_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_USER_GRADE_EXERCISE_SUBMISSION, REMOVE_USER_GRADE_EXERCISE_SUBMISSION_ALL} from "../actions/user_grade_exercise_submission.action";
import { IUserGradeExerciseSubmission, UserGradeExerciseSubmissionModificationStatus } from "../models/user_grade_exercise_submission.interface";



const initialState: IUserGradeExerciseSubmissionState = {
    modificationState: UserGradeExerciseSubmissionModificationStatus.None,
    selectedUserGradeExerciseSubmission: null,
    user_grade_exercise_submissions: []
};

function user_grade_exercise_submissionsReducer(state: IUserGradeExerciseSubmissionState = initialState, action: IActionBase): IUserGradeExerciseSubmissionState {
    switch (action.type) {
        case INITIAL_USER_GRADE_EXERCISE_SUBMISSION: {
            return { ...state, user_grade_exercise_submissions : [...state.user_grade_exercise_submissions, action.user_grade_exercise_submission]};
        }
        case ADD_USER_GRADE_EXERCISE_SUBMISSION: {
            return { ...state, user_grade_exercise_submissions: [...state.user_grade_exercise_submissions, action.user_grade_exercise_submission]};
        }
        case EDIT_USER_GRADE_EXERCISE_SUBMISSION: {
            const foundIndex: number = state.user_grade_exercise_submissions.findIndex(pr => pr.student_id === action.user_grade_exercise_submission.id);
            let user_grade_exercise_submissions: IUserGradeExerciseSubmission[] = state.user_grade_exercise_submissions;
            user_grade_exercise_submissions[foundIndex] = action.user_grade_exercise_submission;
            return { ...state, user_grade_exercise_submissions: user_grade_exercise_submissions };
        }
        case REMOVE_USER_GRADE_EXERCISE_SUBMISSION: {
            return { ...state, user_grade_exercise_submissions: state.user_grade_exercise_submissions.filter(pr => pr.student_id !== action.id) };
        }
        case REMOVE_USER_GRADE_EXERCISE_SUBMISSION_ALL: {
            return { ...state, user_grade_exercise_submissions: [] };
        }
        case CHANGE_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT: {
            return { ...state, selectedUserGradeExerciseSubmission: action.user_grade_exercise_submission };
        }
        case CLEAR_USER_GRADE_EXERCISE_SUBMISSION_PENDING_EDIT: {
            return { ...state, selectedUserGradeExerciseSubmission: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default user_grade_exercise_submissionsReducer;