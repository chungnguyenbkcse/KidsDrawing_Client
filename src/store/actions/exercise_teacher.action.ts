import { IExerciseTeacher, ExerciseTeacherModificationStatus } from "../models/exercise_teacher.interface";

// register_successfull_exercise_teachers
export const ADD_EXERCISE_NO_SUBMISSION: string = "ADD_EXERCISE_NO_SUBMISSION";
export const EDIT_EXERCISE_NO_SUBMISSION: string = "EDIT_EXERCISE_NO_SUBMISSION";
export const REMOVE_EXERCISE_NO_SUBMISSION: string = "REMOVE_EXERCISE_NO_SUBMISSION";
export const CHANGE_EXERCISE_NO_SUBMISSION_AMOUNT: string = "CHANGE_EXERCISE_NO_SUBMISSION_AMOUNT";
export const CHANGE_EXERCISE_NO_SUBMISSION_PENDING_EDIT: string = "CHANGE_EXERCISE_NO_SUBMISSION_PENDING_EDIT";
export const CLEAR_EXERCISE_NO_SUBMISSION_PENDING_EDIT: string = "CLEAR_EXERCISE_NO_SUBMISSION_PENDING_EDIT";
export const REMOVE_EXERCISE_NO_SUBMISSION_ALL: string = "REMOVE_EXERCISE_NO_SUBMISSION_ALL";
export const INITIAL_EXERCISE_NO_SUBMISSION: string = "INITIAL_EXERCISE_NO_SUBMISSION";

// not_register_exercise_teachers
export const ADD_EXERCISE_SCORING: string = "ADD_EXERCISE_SCORING";
export const EDIT_EXERCISE_SCORING: string = "EDIT_EXERCISE_SCORING";
export const REMOVE_EXERCISE_SCORING: string = "REMOVE_EXERCISE_SCORING";
export const CHANGE_EXERCISE_SCORING_AMOUNT: string = "CHANGE_EXERCISE_SCORING_AMOUNT";
export const CHANGE_EXERCISE_SCORING_PENDING_EDIT: string = "CHANGE_EXERCISE_SCORING_PENDING_EDIT";
export const CLEAR_EXERCISE_SCORING_PENDING_EDIT: string = "CLEAR_EXERCISE_SCORING_PENDING_EDIT";
export const REMOVE_EXERCISE_SCORING_ALL: string = "REMOVE_EXERCISE_SCORING_ALL";
export const INITIAL_EXERCISE_SCORING: string = "INITIAL_EXERCISE_SCORING";


// not_register_exercise_teachers
export const ADD_EXERCISE_SCORING_DONE: string = "ADD_EXERCISE_SCORING_DONE";
export const EDIT_EXERCISE_SCORING_DONE: string = "EDIT_EXERCISE_SCORING_DONE";
export const REMOVE_EXERCISE_SCORING_DONE: string = "REMOVE_EXERCISE_SCORING_DONE";
export const CHANGE_EXERCISE_SCORING_DONE_AMOUNT: string = "CHANGE_EXERCISE_SCORING_DONE_AMOUNT";
export const CHANGE_EXERCISE_SCORING_DONE_PENDING_EDIT: string = "CHANGE_EXERCISE_SCORING_DONE_PENDING_EDIT";
export const CLEAR_EXERCISE_SCORING_DONE_PENDING_EDIT: string = "CLEAR_EXERCISE_SCORING_DONE_PENDING_EDIT";
export const REMOVE_EXERCISE_SCORING_DONE_ALL: string = "REMOVE_EXERCISE_SCORING_DONE_ALL";
export const INITIAL_EXERCISE_SCORING_DONE: string = "INITIAL_EXERCISE_SCORING_DONE";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(exercise_teacher: IExerciseTeacher) {
    return {
        type: FETCH_DATA_SUCCESS,
        exercise_teacher
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialExerciseNoSubmission(exercise_teacher: IExerciseTeacher): IInitialExerciseNoSubmissionActionType {
    return { type: INITIAL_EXERCISE_NO_SUBMISSION, exercise_teacher: exercise_teacher };
}

export function removeExerciseNoSubmissionAll(): IRemoveExerciseNoSubmissionAllActionType {
    return { type: REMOVE_EXERCISE_NO_SUBMISSION_ALL };
}

export function addExerciseNoSubmission(exercise_teacher: IExerciseTeacher): IAddExerciseNoSubmissionActionType {
    return { type: ADD_EXERCISE_NO_SUBMISSION, exercise_teacher: exercise_teacher };
}

export function editExerciseNoSubmission(exercise_teacher: IExerciseTeacher): IEditExerciseNoSubmissionActionType {
    return { type: EDIT_EXERCISE_NO_SUBMISSION, exercise_teacher: exercise_teacher };
}

export function removeExerciseNoSubmission(id: any): IRemoveExerciseNoSubmissionActionType {
    return { type: REMOVE_EXERCISE_NO_SUBMISSION, id: id };
}

export function changeSelectedExerciseNoSubmission(exercise_teacher: IExerciseTeacher): IChangeSelectedExerciseNoSubmissionActionType {
    return { type: CHANGE_EXERCISE_NO_SUBMISSION_PENDING_EDIT, exercise_teacher: exercise_teacher };
}

export function clearSelectedExerciseNoSubmission(): IClearSelectedExerciseNoSubmissionActionType {
    return { type: CLEAR_EXERCISE_NO_SUBMISSION_PENDING_EDIT };
}


export function initialExerciseScoring(exercise_teacher: IExerciseTeacher): IInitialExerciseScoringActionType {
    return { type: INITIAL_EXERCISE_SCORING, exercise_teacher: exercise_teacher };
}

export function removeExerciseScoringAll(): IRemoveExerciseScoringAllActionType {
    return { type: REMOVE_EXERCISE_SCORING_ALL };
}

export function addExerciseScoring(exercise_teacher: IExerciseTeacher): IAddExerciseScoringActionType {
    return { type: ADD_EXERCISE_SCORING, exercise_teacher: exercise_teacher };
}

export function editExerciseScoring(exercise_teacher: IExerciseTeacher): IEditExerciseScoringActionType {
    return { type: EDIT_EXERCISE_SCORING, exercise_teacher: exercise_teacher };
}

export function removeExerciseScoring(id: any): IRemoveExerciseScoringActionType {
    return { type: REMOVE_EXERCISE_SCORING, id: id };
}

export function changeSelectedExerciseScoring(exercise_teacher: IExerciseTeacher): IChangeSelectedExerciseScoringActionType {
    return { type: CHANGE_EXERCISE_SCORING_PENDING_EDIT, exercise_teacher: exercise_teacher };
}

export function clearSelectedExerciseScoring(): IClearSelectedExerciseScoringActionType {
    return { type: CLEAR_EXERCISE_SCORING_PENDING_EDIT };
}

export function setModificationState(value: ExerciseTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}



export function initialExerciseScoringDone(exercise_teacher: IExerciseTeacher): IInitialExerciseScoringDoneActionType {
    return { type: INITIAL_EXERCISE_SCORING_DONE, exercise_teacher: exercise_teacher };
}

export function removeExerciseScoringDoneAll(): IRemoveExerciseScoringDoneAllActionType {
    return { type: REMOVE_EXERCISE_SCORING_DONE_ALL };
}

export function addExerciseScoringDone(exercise_teacher: IExerciseTeacher): IAddExerciseScoringDoneActionType {
    return { type: ADD_EXERCISE_SCORING_DONE, exercise_teacher: exercise_teacher };
}

export function editExerciseScoringDone(exercise_teacher: IExerciseTeacher): IEditExerciseScoringDoneActionType {
    return { type: EDIT_EXERCISE_SCORING_DONE, exercise_teacher: exercise_teacher };
}

export function removeExerciseScoringDone(id: any): IRemoveExerciseScoringDoneActionType {
    return { type: REMOVE_EXERCISE_SCORING_DONE, id: id };
}

export function changeSelectedExerciseScoringDone(exercise_teacher: IExerciseTeacher): IChangeSelectedExerciseScoringDoneActionType {
    return { type: CHANGE_EXERCISE_SCORING_DONE_AMOUNT, exercise_teacher: exercise_teacher };
}

export function clearSelectedExerciseScoringDone(): IClearSelectedExerciseScoringDoneActionType {
    return { type: CHANGE_EXERCISE_SCORING_DONE_PENDING_EDIT };
}

// register_successfull_exercise_teachers
interface IAddExerciseNoSubmissionActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IEditExerciseNoSubmissionActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IRemoveExerciseNoSubmissionActionType { type: string, id: any };
interface IChangeSelectedExerciseNoSubmissionActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IClearSelectedExerciseNoSubmissionActionType { type: string };
interface IRemoveExerciseNoSubmissionAllActionType { type: string }
interface IInitialExerciseNoSubmissionActionType {type: string, exercise_teacher: IExerciseTeacher}

// not_register_exercise_teachers
interface IAddExerciseScoringActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IEditExerciseScoringActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IRemoveExerciseScoringActionType { type: string, id: any };
interface IChangeSelectedExerciseScoringActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IClearSelectedExerciseScoringActionType { type: string };
interface IRemoveExerciseScoringAllActionType { type: string }
interface IInitialExerciseScoringActionType {type: string, exercise_teacher: IExerciseTeacher}


// register_successfull_exercise_teachers
interface IAddExerciseScoringDoneActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IEditExerciseScoringDoneActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IRemoveExerciseScoringDoneActionType { type: string, id: any };
interface IChangeSelectedExerciseScoringDoneActionType { type: string, exercise_teacher: IExerciseTeacher };
interface IClearSelectedExerciseScoringDoneActionType { type: string };
interface IRemoveExerciseScoringDoneAllActionType { type: string }
interface IInitialExerciseScoringDoneActionType {type: string, exercise_teacher: IExerciseTeacher}




interface ISetModificationStateActionType { type: string, value:  ExerciseTeacherModificationStatus};