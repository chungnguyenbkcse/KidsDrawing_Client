import { IExerciseParentState, IActionBase } from "../models/root.interface";
import { 
    ADD_EXERCISE_NOT_SUBMIT, EDIT_EXERCISE_NOT_SUBMIT, REMOVE_EXERCISE_NOT_SUBMIT,INITIAL_EXERCISE_NOT_SUBMIT, REMOVE_EXERCISE_NOT_SUBMIT_ALL, 
    ADD_EXERCISE_SUBMITED_NOT_GRADE, EDIT_EXERCISE_SUBMITED_NOT_GRADE, REMOVE_EXERCISE_SUBMITED_NOT_GRADE, INITIAL_EXERCISE_SUBMITED_NOT_GRADE, REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL, 
    ADD_EXERCISE_SUBMITED_GRADED, EDIT_EXERCISE_SUBMITED_GRADED, REMOVE_EXERCISE_SUBMITED_GRADED , INITIAL_EXERCISE_SUBMITED_GRADED, REMOVE_EXERCISE_SUBMITED_GRADED_ALL,
    SET_MODIFICATION_STATE

} from "../actions/exercise_parent.action";
import { IExerciseParent, ExerciseParentModificationStatus } from "../models/exercise_parent.interface";

const initialState: IExerciseParentState = {
    modificationState: ExerciseParentModificationStatus.None,
    selectedExerciseParent: null,
    exercise_not_submit: [],
    exercise_submitted_not_grade: [],
    exercise_submitted_graded: []
};

function exerciseParentReducer(state: IExerciseParentState = initialState, action: IActionBase): IExerciseParentState {
    switch (action.type) {
        case INITIAL_EXERCISE_NOT_SUBMIT: {
            return { ...state, exercise_not_submit : [...state.exercise_not_submit, action.exercise_parent]};
        }
        case REMOVE_EXERCISE_NOT_SUBMIT_ALL: {
            return { ...state, exercise_not_submit: [] };
        }
        case ADD_EXERCISE_NOT_SUBMIT: {
            return { ...state, exercise_not_submit: [...state.exercise_not_submit, action.exercise_parent]};
        }
        case EDIT_EXERCISE_NOT_SUBMIT: {
            const foundIndex: number = state.exercise_not_submit.findIndex(pr => pr.id === action.exercise_parent.id);
            let exercise_not_submits: IExerciseParent[] = state.exercise_not_submit;
            exercise_not_submits[foundIndex] = action.exercise_parent;
            return { ...state, exercise_not_submit: exercise_not_submits };
        }
        case REMOVE_EXERCISE_NOT_SUBMIT: {
            return { ...state, exercise_not_submit: state.exercise_not_submit.filter(x=>x.id !== action.exercise_parent.id)};
        }

        case INITIAL_EXERCISE_SUBMITED_NOT_GRADE: {
            return { ...state, exercise_submitted_not_grade : [...state.exercise_submitted_not_grade, action.exercise_parent]};
        }
        case REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL: {
            return { ...state, exercise_submitted_not_grade: [] };
        }
        case ADD_EXERCISE_SUBMITED_NOT_GRADE: {
            return { ...state, exercise_submitted_not_grade: [...state.exercise_submitted_not_grade, action.exercise_parent]};
        }
        case EDIT_EXERCISE_SUBMITED_NOT_GRADE: {
            const foundIndex: number = state.exercise_submitted_not_grade.findIndex(pr => pr.id === action.exercise_parent.id);
            let accept_exercise_not_submit: IExerciseParent[] = state.exercise_submitted_not_grade;
            accept_exercise_not_submit[foundIndex] = action.exercise_parent;
            return { ...state, exercise_submitted_not_grade: accept_exercise_not_submit };
        }
        case REMOVE_EXERCISE_SUBMITED_NOT_GRADE: {
            return { ...state, exercise_submitted_not_grade: state.exercise_submitted_not_grade.filter(x=>x.id !== action.exercise_parent.id)};
        }

        case INITIAL_EXERCISE_SUBMITED_GRADED: {
            return { ...state, exercise_submitted_graded : [...state.exercise_submitted_graded, action.exercise_parent]};
        }
        case REMOVE_EXERCISE_SUBMITED_GRADED_ALL: {
            return { ...state, exercise_submitted_graded: [] };
        }
        case ADD_EXERCISE_SUBMITED_GRADED: {
            return { ...state, exercise_submitted_graded: [...state.exercise_submitted_graded, action.exercise_parent]};
        }
        case EDIT_EXERCISE_SUBMITED_GRADED: {
            const foundIndex: number = state.exercise_submitted_graded.findIndex(pr => pr.id === action.exercise_parent.id);
            let remove_exercise_not_submit: IExerciseParent[] = state.exercise_submitted_graded;
            remove_exercise_not_submit[foundIndex] = action.exercise_parent;
            return { ...state, exercise_submitted_graded: remove_exercise_not_submit };
        }
        case REMOVE_EXERCISE_SUBMITED_GRADED: {
            return { ...state, exercise_submitted_graded: state.exercise_submitted_graded.filter(x=>x.id !== action.exercise_parent.id)};
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default exerciseParentReducer;