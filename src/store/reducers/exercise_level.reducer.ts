import { IExerciseLevelState, IActionBase } from "../models/root.interface";
import { ADD_EXERCISE_LEVEL, CHANGE_EXERCISE_LEVEL_PENDING_EDIT, EDIT_EXERCISE_LEVEL, REMOVE_EXERCISE_LEVEL,
    CLEAR_EXERCISE_LEVEL_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_EXERCISE_LEVEL, REMOVE_EXERCISE_LEVEL_ALL} from "../actions/exercise_level.action";
import { IExerciseLevel, ExerciseLevelModificationStatus } from "../models/exercise_level.interface";



const initialState: IExerciseLevelState = {
    modificationState: ExerciseLevelModificationStatus.None,
    selectedExerciseLevel: null,
    exercise_levels: []
};

function exercise_levelsReducer(state: IExerciseLevelState = initialState, action: IActionBase): IExerciseLevelState {
    switch (action.type) {
        case INITIAL_EXERCISE_LEVEL: {
            return { ...state, exercise_levels : [...state.exercise_levels, action.exercise_level]};
        }
        case ADD_EXERCISE_LEVEL: {
            return { ...state, exercise_levels: [...state.exercise_levels, action.exercise_level]};
        }
        case EDIT_EXERCISE_LEVEL: {
            const foundIndex: number = state.exercise_levels.findIndex(pr => pr.id === action.exercise_level.id);
            let exercise_levels: IExerciseLevel[] = state.exercise_levels;
            exercise_levels[foundIndex] = action.exercise_level;
            return { ...state, exercise_levels: exercise_levels };
        }
        case REMOVE_EXERCISE_LEVEL: {
            return { ...state, exercise_levels: state.exercise_levels.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_EXERCISE_LEVEL_ALL: {
            return { ...state, exercise_levels: [] };
        }
        case CHANGE_EXERCISE_LEVEL_PENDING_EDIT: {
            return { ...state, selectedExerciseLevel: action.exercise_level };
        }
        case CLEAR_EXERCISE_LEVEL_PENDING_EDIT: {
            return { ...state, selectedExerciseLevel: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default exercise_levelsReducer;