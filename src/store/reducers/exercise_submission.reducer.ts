import { IExerciseSubmissionState, IActionBase } from "../models/root.interface";
import { ADD_EXERCISE_SUBMISSION_NOT_GRADED, CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT, EDIT_EXERCISE_SUBMISSION_NOT_GRADED, REMOVE_EXERCISE_SUBMISSION_NOT_GRADED,
    CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_EXERCISE_SUBMISSION_NOT_GRADED, REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL, INITIAL_EXERCISE_SUBMISSION_GRADED, ADD_EXERCISE_SUBMISSION_GRADED, EDIT_EXERCISE_SUBMISSION_GRADED, REMOVE_EXERCISE_SUBMISSION_GRADED, REMOVE_EXERCISE_SUBMISSION_GRADED_ALL, CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT, CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT} from "../actions/exercise_submission.action";
import { IExerciseSubmission, ExerciseSubmissionModificationStatus } from "../models/exercise_submission.interface";



const initialState: IExerciseSubmissionState = {
    modificationState: ExerciseSubmissionModificationStatus.None,
    selectedExerciseSubmission: null,
    exercise_not_gradeds: [],
    exercise_gradeds: []
};

function exerciseSubmissionsReducer(state: IExerciseSubmissionState = initialState, action: IActionBase): IExerciseSubmissionState {
    switch (action.type) {
        case INITIAL_EXERCISE_SUBMISSION_NOT_GRADED: {
            return { ...state, exercise_not_gradeds : [...state.exercise_not_gradeds, action.exercise_submission]};
        }
        case ADD_EXERCISE_SUBMISSION_NOT_GRADED: {
            return { ...state, exercise_not_gradeds: [...state.exercise_not_gradeds, action.exercise_submission]};
        }
        case EDIT_EXERCISE_SUBMISSION_NOT_GRADED: {
            const foundIndex: number = state.exercise_not_gradeds.findIndex(pr => pr.id === action.exercise_submission.id);
            let exercise_not_gradeds: IExerciseSubmission[] = state.exercise_not_gradeds;
            exercise_not_gradeds[foundIndex] = action.exercise_submission;
            return { ...state, exercise_not_gradeds: exercise_not_gradeds };
        }
        case REMOVE_EXERCISE_SUBMISSION_NOT_GRADED: {
            return { ...state, exercise_not_gradeds: state.exercise_not_gradeds.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_SUBMISSION_NOT_GRADED_ALL: {
            return { ...state, exercise_not_gradeds: [] };
        }
        case CHANGE_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: {
            return { ...state, selectedExerciseSubmission: action.exercise_submission };
        }
        case CLEAR_EXERCISE_SUBMISSION_NOT_GRADED_PENDING_EDIT: {
            return { ...state, selectedExerciseSubmission: null };
        }

        case INITIAL_EXERCISE_SUBMISSION_GRADED: {
            return { ...state, exercise_gradeds : [...state.exercise_gradeds, action.exercise_submission]};
        }
        case ADD_EXERCISE_SUBMISSION_GRADED: {
            return { ...state, exercise_gradeds: [...state.exercise_gradeds, action.exercise_submission]};
        }
        case EDIT_EXERCISE_SUBMISSION_GRADED: {
            const foundIndex: number = state.exercise_gradeds.findIndex(pr => pr.id === action.exercise_submission.id);
            let exercise_gradeds: IExerciseSubmission[] = state.exercise_gradeds;
            exercise_gradeds[foundIndex] = action.exercise_submission;
            return { ...state, exercise_gradeds: exercise_gradeds };
        }
        case REMOVE_EXERCISE_SUBMISSION_GRADED: {
            return { ...state, exercise_gradeds: state.exercise_gradeds.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_SUBMISSION_GRADED_ALL: {
            return { ...state, exercise_gradeds: [] };
        }
        case CHANGE_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT: {
            return { ...state, selectedExerciseSubmission: action.exercise_submission };
        }
        case CLEAR_EXERCISE_SUBMISSION_GRADED_PENDING_EDIT: {
            return { ...state, selectedExerciseSubmission: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default exerciseSubmissionsReducer;