import { IExerciseStudent, ExerciseStudentModificationStatus } from "../models/exercise_student.interface";

// register_successfull_exercise_students
export const ADD_EXERCISE_NOT_SUBMIT: string = "ADD_EXERCISE_NOT_SUBMIT";
export const EDIT_EXERCISE_NOT_SUBMIT: string = "EDIT_EXERCISE_NOT_SUBMIT";
export const REMOVE_EXERCISE_NOT_SUBMIT: string = "REMOVE_EXERCISE_NOT_SUBMIT";
export const CHANGE_EXERCISE_NOT_SUBMIT_AMOUNT: string = "CHANGE_EXERCISE_NOT_SUBMIT_AMOUNT";
export const CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT: string = "CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT";
export const CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT: string = "CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT";
export const REMOVE_EXERCISE_NOT_SUBMIT_ALL: string = "REMOVE_EXERCISE_NOT_SUBMIT_ALL";
export const INITIAL_EXERCISE_NOT_SUBMIT: string = "INITIAL_EXERCISE_NOT_SUBMIT";

// not_register_exercise_students
export const ADD_EXERCISE_SUBMITED_NOT_GRADE: string = "ADD_EXERCISE_SUBMITED_NOT_GRADE";
export const EDIT_EXERCISE_SUBMITED_NOT_GRADE: string = "EDIT_EXERCISE_SUBMITED_NOT_GRADE";
export const REMOVE_EXERCISE_SUBMITED_NOT_GRADE: string = "REMOVE_EXERCISE_SUBMITED_NOT_GRADE";
export const CHANGE_EXERCISE_SUBMITED_NOT_GRADE_AMOUNT: string = "CHANGE_EXERCISE_SUBMITED_NOT_GRADE_AMOUNT";
export const CHANGE_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT: string = "CHANGE_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT";
export const CLEAR_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT: string = "CLEAR_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT";
export const REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL: string = "REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL";
export const INITIAL_EXERCISE_SUBMITED_NOT_GRADE: string = "INITIAL_EXERCISE_SUBMITED_NOT_GRADE";


// not_register_exercise_students
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

export function fetchDataSuccess(exercise_student: IExerciseStudent) {
    return {
        type: FETCH_DATA_SUCCESS,
        exercise_student
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialExerciseNotSubmit(exercise_student: IExerciseStudent): IInitialExerciseNotSubmitActionType {
    return { type: INITIAL_EXERCISE_NOT_SUBMIT, exercise_student: exercise_student };
}

export function removeExerciseNotSubmitAll(): IRemoveExerciseNotSubmitAllActionType {
    return { type: REMOVE_EXERCISE_NOT_SUBMIT_ALL };
}

export function addExerciseNotSubmit(exercise_student: IExerciseStudent): IAddExerciseNotSubmitActionType {
    return { type: ADD_EXERCISE_NOT_SUBMIT, exercise_student: exercise_student };
}

export function editExerciseNotSubmit(exercise_student: IExerciseStudent): IEditExerciseNotSubmitActionType {
    return { type: EDIT_EXERCISE_NOT_SUBMIT, exercise_student: exercise_student };
}

export function removeExerciseNotSubmit(id: number): IRemoveExerciseNotSubmitActionType {
    return { type: REMOVE_EXERCISE_NOT_SUBMIT, id: id };
}

export function changeSelectedExerciseNotSubmit(exercise_student: IExerciseStudent): IChangeSelectedExerciseNotSubmitActionType {
    return { type: CHANGE_EXERCISE_NOT_SUBMIT_PENDING_EDIT, exercise_student: exercise_student };
}

export function clearSelectedExerciseNotSubmit(): IClearSelectedExerciseNotSubmitActionType {
    return { type: CLEAR_EXERCISE_NOT_SUBMIT_PENDING_EDIT };
}


export function initialExerciseSubmitNotGrade(exercise_student: IExerciseStudent): IInitialExerciseSubmitNotGradeActionType {
    return { type: INITIAL_EXERCISE_SUBMITED_NOT_GRADE, exercise_student: exercise_student };
}

export function removeExerciseSubmitNotGradeAll(): IRemoveExerciseSubmitNotGradeAllActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_NOT_GRADE_ALL };
}

export function addExerciseSubmitNotGrade(exercise_student: IExerciseStudent): IAddExerciseSubmitNotGradeActionType {
    return { type: ADD_EXERCISE_SUBMITED_NOT_GRADE, exercise_student: exercise_student };
}

export function editExerciseSubmitNotGrade(exercise_student: IExerciseStudent): IEditExerciseSubmitNotGradeActionType {
    return { type: EDIT_EXERCISE_SUBMITED_NOT_GRADE, exercise_student: exercise_student };
}

export function removeExerciseSubmitNotGrade(id: number): IRemoveExerciseSubmitNotGradeActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_NOT_GRADE, id: id };
}

export function changeSelectedExerciseSubmitNotGrade(exercise_student: IExerciseStudent): IChangeSelectedExerciseSubmitNotGradeActionType {
    return { type: CHANGE_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT, exercise_student: exercise_student };
}

export function clearSelectedExerciseSubmitNotGrade(): IClearSelectedExerciseSubmitNotGradeActionType {
    return { type: CLEAR_EXERCISE_SUBMITED_NOT_GRADE_PENDING_EDIT };
}

export function setModificationState(value: ExerciseStudentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}



export function initialExerciseSubmitGraded(exercise_student: IExerciseStudent): IInitialExerciseSubmitGradedActionType {
    return { type: INITIAL_EXERCISE_SUBMITED_GRADED, exercise_student: exercise_student };
}

export function removeExerciseSubmitGradedAll(): IRemoveExerciseSubmitGradedAllActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_GRADED_ALL };
}

export function addExerciseSubmitGraded(exercise_student: IExerciseStudent): IAddExerciseSubmitGradedActionType {
    return { type: ADD_EXERCISE_SUBMITED_GRADED, exercise_student: exercise_student };
}

export function editExerciseSubmitGraded(exercise_student: IExerciseStudent): IEditExerciseSubmitGradedActionType {
    return { type: EDIT_EXERCISE_SUBMITED_GRADED, exercise_student: exercise_student };
}

export function removeExerciseSubmitGraded(id: number): IRemoveExerciseSubmitGradedActionType {
    return { type: REMOVE_EXERCISE_SUBMITED_GRADED, id: id };
}

export function changeSelectedExerciseSubmitGraded(exercise_student: IExerciseStudent): IChangeSelectedExerciseSubmitGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMITED_GRADED_AMOUNT, exercise_student: exercise_student };
}

export function clearSelectedExerciseSubmitGraded(): IClearSelectedExerciseSubmitGradedActionType {
    return { type: CHANGE_EXERCISE_SUBMITED_GRADED_PENDING_EDIT };
}

// register_successfull_exercise_students
interface IAddExerciseNotSubmitActionType { type: string, exercise_student: IExerciseStudent };
interface IEditExerciseNotSubmitActionType { type: string, exercise_student: IExerciseStudent };
interface IRemoveExerciseNotSubmitActionType { type: string, id: number };
interface IChangeSelectedExerciseNotSubmitActionType { type: string, exercise_student: IExerciseStudent };
interface IClearSelectedExerciseNotSubmitActionType { type: string };
interface IRemoveExerciseNotSubmitAllActionType { type: string }
interface IInitialExerciseNotSubmitActionType {type: string, exercise_student: IExerciseStudent}

// not_register_exercise_students
interface IAddExerciseSubmitNotGradeActionType { type: string, exercise_student: IExerciseStudent };
interface IEditExerciseSubmitNotGradeActionType { type: string, exercise_student: IExerciseStudent };
interface IRemoveExerciseSubmitNotGradeActionType { type: string, id: number };
interface IChangeSelectedExerciseSubmitNotGradeActionType { type: string, exercise_student: IExerciseStudent };
interface IClearSelectedExerciseSubmitNotGradeActionType { type: string };
interface IRemoveExerciseSubmitNotGradeAllActionType { type: string }
interface IInitialExerciseSubmitNotGradeActionType {type: string, exercise_student: IExerciseStudent}


// register_successfull_exercise_students
interface IAddExerciseSubmitGradedActionType { type: string, exercise_student: IExerciseStudent };
interface IEditExerciseSubmitGradedActionType { type: string, exercise_student: IExerciseStudent };
interface IRemoveExerciseSubmitGradedActionType { type: string, id: number };
interface IChangeSelectedExerciseSubmitGradedActionType { type: string, exercise_student: IExerciseStudent };
interface IClearSelectedExerciseSubmitGradedActionType { type: string };
interface IRemoveExerciseSubmitGradedAllActionType { type: string }
interface IInitialExerciseSubmitGradedActionType {type: string, exercise_student: IExerciseStudent}




interface ISetModificationStateActionType { type: string, value:  ExerciseStudentModificationStatus};