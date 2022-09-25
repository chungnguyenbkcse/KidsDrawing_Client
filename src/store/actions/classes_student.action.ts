import { IClassesStudent, ClassesStudentModificationStatus } from "../models/classes_student.interface";

// register_successfull_classes_students
export const ADD_DOING_CLASS: string = "ADD_DOING_CLASS";
export const EDIT_DOING_CLASS: string = "EDIT_DOING_CLASS";
export const REMOVE_DOING_CLASS: string = "REMOVE_DOING_CLASS";
export const CHANGE_DOING_CLASS_AMOUNT: string = "CHANGE_DOING_CLASS_AMOUNT";
export const CHANGE_DOING_CLASS_PENDING_EDIT: string = "CHANGE_DOING_CLASS_PENDING_EDIT";
export const CLEAR_DOING_CLASS_PENDING_EDIT: string = "CLEAR_DOING_CLASS_PENDING_EDIT";
export const REMOVE_DOING_CLASS_ALL: string = "REMOVE_DOING_CLASS_ALL";
export const INITIAL_DOING_CLASS: string = "INITIAL_DOING_CLASS";

// not_register_classes_students
export const ADD_DONE_CLASS: string = "ADD_DONE_CLASS";
export const EDIT_DONE_CLASS: string = "EDIT_DONE_CLASS";
export const REMOVE_DONE_CLASS: string = "REMOVE_DONE_CLASS";
export const CHANGE_DONE_CLASS_AMOUNT: string = "CHANGE_DONE_CLASS_AMOUNT";
export const CHANGE_DONE_CLASS_PENDING_EDIT: string = "CHANGE_DONE_CLASS_PENDING_EDIT";
export const CLEAR_DONE_CLASS_PENDING_EDIT: string = "CLEAR_DONE_CLASS_PENDING_EDIT";
export const REMOVE_DONE_CLASS_ALL: string = "REMOVE_DONE_CLASS_ALL";
export const INITIAL_DONE_CLASS: string = "INITIAL_DONE_CLASS";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(classes_student: IClassesStudent) {
    return {
        type: FETCH_DATA_SUCCESS,
        classes_student
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialDoinglClass(classes_student: IClassesStudent): IInitialDoinglClassActionType {
    return { type: INITIAL_DOING_CLASS, classes_student: classes_student };
}

export function removeDoinglClassAll(): IRemoveDoinglClassAllActionType {
    return { type: REMOVE_DOING_CLASS_ALL };
}

export function addDoinglClass(classes_student: IClassesStudent): IAddDoinglClassActionType {
    return { type: ADD_DOING_CLASS, classes_student: classes_student };
}

export function editDoinglClass(classes_student: IClassesStudent): IEditDoinglClassActionType {
    return { type: EDIT_DOING_CLASS, classes_student: classes_student };
}

export function removeDoinglClass(id: number): IRemoveDoinglClassActionType {
    return { type: REMOVE_DOING_CLASS, id: id };
}

export function changeSelectedDoinglClass(classes_student: IClassesStudent): IChangeSelectedDoinglClassActionType {
    return { type: CHANGE_DOING_CLASS_PENDING_EDIT, classes_student: classes_student };
}

export function clearSelectedDoinglClass(): IClearSelectedDoinglClassActionType {
    return { type: CLEAR_DOING_CLASS_PENDING_EDIT };
}


export function initialDoneClass(classes_student: IClassesStudent): IInitialDoneClassActionType {
    return { type: INITIAL_DONE_CLASS, classes_student: classes_student };
}

export function removeDoneClassAll(): IRemoveDoneClassAllActionType {
    return { type: REMOVE_DONE_CLASS_ALL };
}

export function addDoneClass(classes_student: IClassesStudent): IAddDoneClassActionType {
    return { type: ADD_DONE_CLASS, classes_student: classes_student };
}

export function editDoneClass(classes_student: IClassesStudent): IEditDoneClassActionType {
    return { type: EDIT_DONE_CLASS, classes_student: classes_student };
}

export function removeDoneClass(id: number): IRemoveDoneClassActionType {
    return { type: REMOVE_DONE_CLASS, id: id };
}

export function changeSelectedDoneClass(classes_student: IClassesStudent): IChangeSelectedDoneClassActionType {
    return { type: CHANGE_DONE_CLASS_PENDING_EDIT, classes_student: classes_student };
}

export function clearSelectedDoneClass(): IClearSelectedDoneClassActionType {
    return { type: CLEAR_DONE_CLASS_PENDING_EDIT };
}

export function setModificationState(value: ClassesStudentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_classes_students
interface IAddDoinglClassActionType { type: string, classes_student: IClassesStudent };
interface IEditDoinglClassActionType { type: string, classes_student: IClassesStudent };
interface IRemoveDoinglClassActionType { type: string, id: number };
interface IChangeSelectedDoinglClassActionType { type: string, classes_student: IClassesStudent };
interface IClearSelectedDoinglClassActionType { type: string };
interface IRemoveDoinglClassAllActionType { type: string }
interface IInitialDoinglClassActionType {type: string, classes_student: IClassesStudent}

// not_register_classes_students
interface IAddDoneClassActionType { type: string, classes_student: IClassesStudent };
interface IEditDoneClassActionType { type: string, classes_student: IClassesStudent };
interface IRemoveDoneClassActionType { type: string, id: number };
interface IChangeSelectedDoneClassActionType { type: string, classes_student: IClassesStudent };
interface IClearSelectedDoneClassActionType { type: string };
interface IRemoveDoneClassAllActionType { type: string }
interface IInitialDoneClassActionType {type: string, classes_student: IClassesStudent}



interface ISetModificationStateActionType { type: string, value:  ClassesStudentModificationStatus};