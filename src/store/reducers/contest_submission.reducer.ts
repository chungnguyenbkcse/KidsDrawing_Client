import { IContestSubmissionState, IActionBase } from "../models/root.interface";
import { ADD_EXERCISE_SUBMISSION_NOT_GRADED, CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT, EDIT_EXERCISE_SUBMISSION_NOT_GRADED, REMOVE_EXERCISE_SUBMISSION_NOT_GRADED,
    CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_EXERCISE_SUBMISSION_NOT_GRADED, REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL, INITIAL_EXERCISE_SUBMISSION_GRADED, ADD_EXERCISE_SUBMISSION_GRADED, EDIT_EXERCISE_SUBMISSION_GRADED, REMOVE_EXERCISE_SUBMISSION_GRADED, REMOVE_EXERCISE_SUBMISSION_GRADED_ALL, CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT, CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT} from "../actions/contest_submission.action";
import { IContestSubmission, ContestSubmissionModificationStatus } from "../models/contest_submission.interface";



const initialState: IContestSubmissionState = {
    modificationState: ContestSubmissionModificationStatus.None,
    selectedContestSubmission: null,
    contest_not_gradeds: [],
    contest_gradeds: []
};

function contestSubmissionsReducer(state: IContestSubmissionState = initialState, action: IActionBase): IContestSubmissionState {
    switch (action.type) {
        case INITIAL_EXERCISE_SUBMISSION_NOT_GRADED: {
            return { ...state, contest_not_gradeds : [...state.contest_not_gradeds, action.contest_submission]};
        }
        case ADD_EXERCISE_SUBMISSION_NOT_GRADED: {
            return { ...state, contest_not_gradeds: [...state.contest_not_gradeds, action.contest_submission]};
        }
        case EDIT_EXERCISE_SUBMISSION_NOT_GRADED: {
            const foundIndex: number = state.contest_not_gradeds.findIndex(pr => pr.id === action.contest_submission.id);
            let contest_not_gradeds: IContestSubmission[] = state.contest_not_gradeds;
            contest_not_gradeds[foundIndex] = action.contest_submission;
            return { ...state, contest_not_gradeds: contest_not_gradeds };
        }
        case REMOVE_EXERCISE_SUBMISSION_NOT_GRADED: {
            return { ...state, contest_not_gradeds: state.contest_not_gradeds.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL: {
            return { ...state, contest_not_gradeds: [] };
        }
        case CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmission: action.contest_submission };
        }
        case CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmission: null };
        }

        case INITIAL_EXERCISE_SUBMISSION_GRADED: {
            return { ...state, contest_gradeds : [...state.contest_gradeds, action.contest_submission]};
        }
        case ADD_EXERCISE_SUBMISSION_GRADED: {
            return { ...state, contest_gradeds: [...state.contest_gradeds, action.contest_submission]};
        }
        case EDIT_EXERCISE_SUBMISSION_GRADED: {
            const foundIndex: number = state.contest_gradeds.findIndex(pr => pr.id === action.contest_submission.id);
            let contest_gradeds: IContestSubmission[] = state.contest_gradeds;
            contest_gradeds[foundIndex] = action.contest_submission;
            return { ...state, contest_gradeds: contest_gradeds };
        }
        case REMOVE_EXERCISE_SUBMISSION_GRADED: {
            return { ...state, contest_gradeds: state.contest_gradeds.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_SUBMISSION_GRADED_ALL: {
            return { ...state, contest_gradeds: [] };
        }
        case CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmission: action.contest_submission };
        }
        case CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmission: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default contestSubmissionsReducer;