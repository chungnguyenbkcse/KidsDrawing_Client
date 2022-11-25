import { IExerciseParent, ExerciseParentModificationStatus } from "../models/exercise_parent.interface";

// register_successfull_exercise_parents
export const ADD_EXERCISE_NOT_SUBMIT: string = "ADD_EXERCISE_NOT_SUBMIT";
export const EDIT_EXERCISE_NOT_SUBMIT: string = "EDIT_EXERCISE_NOT_SUBMIT";
export const REMOVE_EXERCISE_NOT_SUBMIT: string = "REMOVE_EXERCISE_NOT_SUBMIT";
export const CHANGE_EXERCISE_NOT_SUBMIT_AMOUNT: string = "CHANGE_EXERCISE_NOT_SUBMIT_AMOUNT";
export const CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT: string = "CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT";
export const CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT: string = "CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT";
export const REMOVE_EXERCISE_NOT_SUBMIT_ALL: string = "REMOVE_EXERCISE_NOT_SUBMIT_ALL";
export const INITIAL_EXERCISE_NOT_SUBMIT: string = "INITIAL_EXERCISE_NOT_SUBMIT";

// not_register_exercise_parents
export const ADD_EXERCISE_SUBMITED_NOT_GRADE: string = "ADD_EXERCISE_SUBMITED_NOT_GRADE";
export const EDIT_EXERCISE_SUBMITED_NOT_GRADE: string = "EDIT_EXERCISE_SUBMITED_NOT_GRADE";
export const REMOVE_EXERCISE_SUBMITED_NOT_GRADE: string = "REMOVE_EXERCISE_SUBMITED_NOT_GRADE";
export const CHANGE_EXERCISE_SUBMITED_NOT_GRADE_AMOUNT: string = "CHANGE_EXERCISE_SUBMITED_NOT_GRADE_AMOUNT";
export const CHANGE_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT: string = "CHANGE_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT";
export const CLEAR_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT: string = "CLEAR_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT";
export const REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL: string = "REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL";
export const INITIAL_EXERCISE_SUBMITED_NOT_GRADE: string = "INITIAL_EXERCISE_SUBMITED_NOT_GRADE";


// not_register_exercise_parents
export const ADD_EXERCISE_SUBMITED_GRADED: string = "ADD_EXERCISE_SUBMITED_GRADED";
export const EDIT_EXERCISE_SUBMITED_GRADED: string = "EDIT_EXERCISE_SUBMITED_GRADED";
export const REMOVE_EXERCISE_SUBMITED_GRADED: string = "REMOVE_EXERCISE_SUBMITED_GRADED";
export const CHANGE_EXERCISE_SUBMITED_GRADED_AMOUNT: string = "CHANGE_EXERCISE_SUBMITED_GRADED_AMOUNT";
export const CHANGE_EXERCISE_SUBMITED_GRADED_PENDING_EDIT: string = "CHANGE_EXERCISE_SUBMITED_GRADED_PENDING_EDIT";
export const CLEAR_EXERCISE_SUBMITED_GRADED_PENDING_EDIT: string = "CLEAR_EXERCISE_SUBMITED_GRADED_PENDING_EDIT";
export const REMOVE_EXERCISE_SUBMITED_GRADED_ALL: string = "REMOVE_EXERCISE_SUBMITED_GRADED_ALL";
export const INITIAL_EXERCISE_SUBMITED_GRADED: string = "INITIAL_EXERCISE_SUBMITED_GRADED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(exercise_parent: IExerciseParent) {
    return {
        type: FETCH_DATA_SUCCESS,
        exercise_parent
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialExerciseNotSubmit(exercise_parent: IExerciseParent): IInitialExerciseNotSubmitActionType {
    return { type: INITIAL_EXERCISE_NOT_SUBMIT, exercise_parent: exercise_parent };
}

export function removeExerciseNotSubmitAll(): IRemoveExerciseNotSubmitAllActionType {
    return { type: REMOVE_EXERCISE_NOT_SUBMIT_ALL };
}

export function addExerciseNotSubmit(exercise_parent: IExerciseParent): IAddExerciseNotSubmitActionType {
    return { type: ADD_EXERCISE_NOT_SUBMIT, exercise_parent: exercise_parent };
}

export function editExerciseNotSubmit(exercise_parent: IExerciseParent): IEditExerciseNotSubmitActionType {
    return { type: EDIT_EXERCISE_NOT_SUBMIT, exercise_parent: exercise_parent };
}

export function removeExerciseNotSubmit(id: any): IRemoveExerciseNotSubmitActionType {
    return { type: REMOVE_EXERCISE_NOT_SUBMIT, id: id };
}

export function changeSelectedExerciseNotSubmit(exercise_parent: IExerciseParent): IChangeSelectedExerciseNotSubmitActionType {
    return { type: CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT, exercise_parent: exercise_parent };
}

export function clearSelectedExerciseNotSubmit(): IClearSelectedExerciseNotSubmitActionType {
    return { type: CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT };
}


export function initialExerciseSubmitNotGrade(exercise_parent: IExerciseParent): IInitialExerciseSubmitNotGradeActionType {
    return { type: INITIAL_EXERCISE_SUBMITED_NOT_GRADE, exercise_parent: exercise_parent };
}

export function removeExerciseSubmitNotGradeAll(): IRemoveExerciseSubmitNotGradeAllActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL };
}

export function addExerciseSubmitNotGrade(exercise_parent: IExerciseParent): IAddExerciseSubmitNotGradeActionType {
    return { type: ADD_EXERCISE_SUBMITED_NOT_GRADE, exercise_parent: exercise_parent };
}

export function editExerciseSubmitNotGrade(exercise_parent: IExerciseParent): IEditExerciseSubmitNotGradeActionType {
    return { type: EDIT_EXERCISE_SUBMITED_NOT_GRADE, exercise_parent: exercise_parent };
}

export function removeExerciseSubmitNotGrade(id: any): IRemoveExerciseSubmitNotGradeActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_NOT_GRADE, id: id };
}

export function changeSelectedExerciseSubmitNotGrade(exercise_parent: IExerciseParent): IChangeSelectedExerciseSubmitNotGradeActionType {
    return { type: CHANGE_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT, exercise_parent: exercise_parent };
}

export function clearSelectedExerciseSubmitNotGrade(): IClearSelectedExerciseSubmitNotGradeActionType {
    return { type: CLEAR_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT };
}

export function setModificationState(value: ExerciseParentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}



export function initialExerciseSubmitGraded(exercise_parent: IExerciseParent): IInitialExerciseSubmitGradedActionType {
    return { type: INITIAL_EXERCISE_SUBMITED_GRADED, exercise_parent: exercise_parent };
}

export function removeExerciseSubmitGradedAll(): IRemoveExerciseSubmitGradedAllActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_GRADED_ALL };
}

export function addExerciseSubmitGraded(exercise_parent: IExerciseParent): IAddExerciseSubmitGradedActionType {
    return { type: ADD_EXERCISE_SUBMITED_GRADED, exercise_parent: exercise_parent };
}

export function editExerciseSubmitGraded(exercise_parent: IExerciseParent): IEditExerciseSubmitGradedActionType {
    return { type: EDIT_EXERCISE_SUBMITED_GRADED, exercise_parent: exercise_parent };
}

export function removeExerciseSubmitGraded(id: any): IRemoveExerciseSubmitGradedActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_GRADED, id: id };
}

export function changeSelectedExerciseSubmitGraded(exercise_parent: IExerciseParent): IChangeSelectedExerciseSubmitGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMITED_GRADED_AMOUNT, exercise_parent: exercise_parent };
}

export function clearSelectedExerciseSubmitGraded(): IClearSelectedExerciseSubmitGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMITED_GRADED_PENDING_EDIT };
}

// register_successfull_exercise_parents
interface IAddExerciseNotSubmitActionType { type: string, exercise_parent: IExerciseParent };
interface IEditExerciseNotSubmitActionType { type: string, exercise_parent: IExerciseParent };
interface IRemoveExerciseNotSubmitActionType { type: string, id: any };
interface IChangeSelectedExerciseNotSubmitActionType { type: string, exercise_parent: IExerciseParent };
interface IClearSelectedExerciseNotSubmitActionType { type: string };
interface IRemoveExerciseNotSubmitAllActionType { type: string }
interface IInitialExerciseNotSubmitActionType {type: string, exercise_parent: IExerciseParent}

// not_register_exercise_parents
interface IAddExerciseSubmitNotGradeActionType { type: string, exercise_parent: IExerciseParent };
interface IEditExerciseSubmitNotGradeActionType { type: string, exercise_parent: IExerciseParent };
interface IRemoveExerciseSubmitNotGradeActionType { type: string, id: any };
interface IChangeSelectedExerciseSubmitNotGradeActionType { type: string, exercise_parent: IExerciseParent };
interface IClearSelectedExerciseSubmitNotGradeActionType { type: string };
interface IRemoveExerciseSubmitNotGradeAllActionType { type: string }
interface IInitialExerciseSubmitNotGradeActionType {type: string, exercise_parent: IExerciseParent}


// register_successfull_exercise_parents
interface IAddExerciseSubmitGradedActionType { type: string, exercise_parent: IExerciseParent };
interface IEditExerciseSubmitGradedActionType { type: string, exercise_parent: IExerciseParent };
interface IRemoveExerciseSubmitGradedActionType { type: string, id: any };
interface IChangeSelectedExerciseSubmitGradedActionType { type: string, exercise_parent: IExerciseParent };
interface IClearSelectedExerciseSubmitGradedActionType { type: string };
interface IRemoveExerciseSubmitGradedAllActionType { type: string }
interface IInitialExerciseSubmitGradedActionType {type: string, exercise_parent: IExerciseParent}




interface ISetModificationStateActionType { type: string, value:  ExerciseParentModificationStatus};