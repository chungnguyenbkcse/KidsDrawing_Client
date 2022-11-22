import { IExerciseTeacherState, IActionBase } from "../models/root.interface";
import { 
    ADD_EXERCISE_NO_SUBMISSION, EDIT_EXERCISE_NO_SUBMISSION, REMOVE_EXERCISE_NO_SUBMISSION,INITIAL_EXERCISE_NO_SUBMISSION, REMOVE_EXERCISE_NO_SUBMISSION_ALL, 
    ADD_EXERCISE_SCORING, EDIT_EXERCISE_SCORING, REMOVE_EXERCISE_SCORING, INITIAL_EXERCISE_SCORING, REMOVE_EXERCISE_SCORING_ALL, 
    ADD_EXERCISE_SCORING_DONE, EDIT_EXERCISE_SCORING_DONE, REMOVE_EXERCISE_SCORING_DONE , INITIAL_EXERCISE_SCORING_DONE, REMOVE_EXERCISE_SCORING_DONE_ALL,
    SET_MODIFICATION_STATE

} from "../actions/exercise_teacher.action";
import { IExerciseTeacher, ExerciseTeacherModificationStatus } from "../models/exercise_teacher.interface";

const initialState: IExerciseTeacherState = {
    modificationState: ExerciseTeacherModificationStatus.None,
    selectedExerciseTeacher: null,
    exercise_no_submissions: [],
    exercise_scoring: [],
    exercise_scroring_done: []
};

function exerciseTeacherReducer(state: IExerciseTeacherState = initialState, action: IActionBase): IExerciseTeacherState {
    switch (action.type) {
        case INITIAL_EXERCISE_NO_SUBMISSION: {
            return { ...state, exercise_no_submissions : [...state.exercise_no_submissions, action.exercise_teacher]};
        }
        case REMOVE_EXERCISE_NO_SUBMISSION_ALL: {
            return { ...state, exercise_no_submissions: [] };
        }
        case ADD_EXERCISE_NO_SUBMISSION: {
            return { ...state, exercise_no_submissions: [...state.exercise_no_submissions, action.exercise_teacher]};
        }
        case EDIT_EXERCISE_NO_SUBMISSION: {
            const foundIndex: number = state.exercise_no_submissions.findIndex(pr => pr.id === action.exercise_teacher.id);
            let exercise_no_submissionss: IExerciseTeacher[] = state.exercise_no_submissions;
            exercise_no_submissionss[foundIndex] = action.exercise_teacher;
            return { ...state, exercise_no_submissions: exercise_no_submissionss };
        }
        case REMOVE_EXERCISE_NO_SUBMISSION: {
            return { ...state, exercise_no_submissions: state.exercise_no_submissions.filter(x=>x.id !== action.exercise_teacher.id)};
        }

        case INITIAL_EXERCISE_SCORING: {
            return { ...state, exercise_scoring : [...state.exercise_scoring, action.exercise_teacher]};
        }
        case REMOVE_EXERCISE_SCORING_ALL: {
            return { ...state, exercise_scoring: [] };
        }
        case ADD_EXERCISE_SCORING: {
            return { ...state, exercise_scoring: [...state.exercise_scoring, action.exercise_teacher]};
        }
        case EDIT_EXERCISE_SCORING: {
            const foundIndex: number = state.exercise_scoring.findIndex(pr => pr.id === action.exercise_teacher.id);
            let accept_exercise_no_submissions: IExerciseTeacher[] = state.exercise_scoring;
            accept_exercise_no_submissions[foundIndex] = action.exercise_teacher;
            return { ...state, exercise_scoring: accept_exercise_no_submissions };
        }
        case REMOVE_EXERCISE_SCORING: {
            return { ...state, exercise_scoring: state.exercise_scoring.filter(x=>x.id !== action.exercise_teacher.id)};
        }

        case INITIAL_EXERCISE_SCORING_DONE: {
            return { ...state, exercise_scroring_done : [...state.exercise_scroring_done, action.exercise_teacher]};
        }
        case REMOVE_EXERCISE_SCORING_DONE_ALL: {
            return { ...state, exercise_scroring_done: [] };
        }
        case ADD_EXERCISE_SCORING_DONE: {
            return { ...state, exercise_scroring_done: [...state.exercise_scroring_done, action.exercise_teacher]};
        }
        case EDIT_EXERCISE_SCORING_DONE: {
            const foundIndex: number = state.exercise_scroring_done.findIndex(pr => pr.id === action.exercise_teacher.id);
            let remove_exercise_no_submissions: IExerciseTeacher[] = state.exercise_scroring_done;
            remove_exercise_no_submissions[foundIndex] = action.exercise_teacher;
            return { ...state, exercise_scroring_done: remove_exercise_no_submissions };
        }
        case REMOVE_EXERCISE_SCORING_DONE: {
            return { ...state, exercise_scroring_done: state.exercise_scroring_done.filter(x=>x.id !== action.exercise_teacher.id)};
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}

export default exerciseTeacherReducer;