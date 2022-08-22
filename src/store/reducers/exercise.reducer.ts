import { IExerciseState, IActionBase } from "../models/root.interface";
import { ADD_EXERCISE, CHANGE_EXERCISE_PENDING_EDIT, EDIT_EXERCISE, REMOVE_EXERCISE,
    CLEAR_EXERCISE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_EXERCISE, REMOVE_EXERCISE_ALL} from "../actions/exercise.action";
import { IExercise, ExerciseModificationStatus } from "../models/exercise.interface";



const initialState: IExerciseState = {
    modificationState: ExerciseModificationStatus.None,
    selectedExercise: null,
    exercises: []
};

function exercisesReducer(state: IExerciseState = initialState, action: IActionBase): IExerciseState {
    switch (action.type) {
        case INITIAL_EXERCISE: {
            return { ...state, exercises : [...state.exercises, action.exercise]};
        }
        case ADD_EXERCISE: {
            return { ...state, exercises: [...state.exercises, action.exercise]};
        }
        case EDIT_EXERCISE: {
            const foundIndex: number = state.exercises.findIndex(pr => pr.id === action.exercise.id);
            let exercises: IExercise[] = state.exercises;
            exercises[foundIndex] = action.exercise;
            return { ...state, exercises: exercises };
        }
        case REMOVE_EXERCISE: {
            return { ...state, exercises: state.exercises.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_ALL: {
            return { ...state, exercises: [] };
        }
        case CHANGE_EXERCISE_PENDING_EDIT: {
            return { ...state, selectedExercise: action.exercise };
        }
        case CLEAR_EXERCISE_PENDING_EDIT: {
            return { ...state, selectedExercise: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default exercisesReducer;