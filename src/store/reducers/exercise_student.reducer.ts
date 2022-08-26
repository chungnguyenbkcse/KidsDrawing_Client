import { IExerciseStudentState, IActionBase } from "../models/root.interface";
import { ADD_EXERCISE_NOT_SUBMIT, CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT, EDIT_EXERCISE_NOT_SUBMIT, REMOVE_EXERCISE_NOT_SUBMIT,
    CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_EXERCISE_NOT_SUBMIT, REMOVE_EXERCISE_NOT_SUBMIT_ALL, INITIAL_EXERCISE_SUBMITTED, ADD_EXERCISE_SUBMITTED, EDIT_EXERCISE_SUBMITTED, REMOVE_EXERCISE_SUBMITTED, REMOVE_EXERCISE_SUBMITTED_ALL, CHANGE_EXERCISE_SUBMITTED_PENDING_EDIT, CLEAR_EXERCISE_SUBMITTED_PENDING_EDIT} from "../actions/exercise_student.action";
import { IExerciseStudent, ExerciseStudentModificationStatus } from "../models/exercise_student.interface";



const initialState: IExerciseStudentState = {
    modificationState: ExerciseStudentModificationStatus.None,
    selectedExerciseStudent: null,
    exercise_not_submit: [],
    exercise_submitted: []
};

function exerciseStudentsReducer(state: IExerciseStudentState = initialState, action: IActionBase): IExerciseStudentState {
    switch (action.type) {
        case INITIAL_EXERCISE_NOT_SUBMIT: {
            return { ...state, exercise_not_submit : [...state.exercise_not_submit, action.exercise_student]};
        }
        case ADD_EXERCISE_NOT_SUBMIT: {
            return { ...state, exercise_not_submit: [...state.exercise_not_submit, action.exercise_student]};
        }
        case EDIT_EXERCISE_NOT_SUBMIT: {
            const foundIndex: number = state.exercise_not_submit.findIndex(pr => pr.id === action.exercise_student.id);
            let exercise_not_submit: IExerciseStudent[] = state.exercise_not_submit;
            exercise_not_submit[foundIndex] = action.exercise_student;
            return { ...state, exercise_not_submit: exercise_not_submit };
        }
        case REMOVE_EXERCISE_NOT_SUBMIT: {
            return { ...state, exercise_not_submit: state.exercise_not_submit.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_NOT_SUBMIT_ALL: {
            return { ...state, exercise_not_submit: [] };
        }
        case CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT: {
            return { ...state, selectedExerciseStudent: action.exercise_student };
        }
        case CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT: {
            return { ...state, selectedExerciseStudent: null };
        }

        case INITIAL_EXERCISE_SUBMITTED: {
            return { ...state, exercise_submitted : [...state.exercise_submitted, action.exercise_student]};
        }
        case ADD_EXERCISE_SUBMITTED: {
            return { ...state, exercise_not_submit: [...state.exercise_not_submit, action.exercise_student]};
        }
        case EDIT_EXERCISE_SUBMITTED: {
            const foundIndex: number = state.exercise_submitted.findIndex(pr => pr.id === action.exercise_student.id);
            let exercise_submitted: IExerciseStudent[] = state.exercise_submitted;
            exercise_submitted[foundIndex] = action.exercise_student;
            return { ...state, exercise_submitted: exercise_submitted };
        }
        case REMOVE_EXERCISE_SUBMITTED: {
            return { ...state, exercise_submitted: state.exercise_submitted.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_SUBMITTED_ALL: {
            return { ...state, exercise_submitted: [] };
        }
        case CHANGE_EXERCISE_SUBMITTED_PENDING_EDIT: {
            return { ...state, selectedExerciseStudent: action.exercise_student };
        }
        case CLEAR_EXERCISE_SUBMITTED_PENDING_EDIT: {
            return { ...state, selectedExerciseStudent: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default exerciseStudentsReducer;