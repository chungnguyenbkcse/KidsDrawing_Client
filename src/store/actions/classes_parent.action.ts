import { IClassesParent, ClassesParentModificationStatus } from "../models/classes_parent.interface";

// register_successfull_classes_parents
export const ADD_DOING_CLASS: string = "ADD_DOING_CLASS";
export const EDIT_DOING_CLASS: string = "EDIT_DOING_CLASS";
export const REMOVE_DOING_CLASS: string = "REMOVE_DOING_CLASS";
export const CHANGE_DOING_CLASS_AMOUNT: string = "CHANGE_DOING_CLASS_AMOUNT";
export const CHANGE_DOING_CLASS_PENDING_EDIT: string = "CHANGE_DOING_CLASS_PENDING_EDIT";
export const CLEAR_DOING_CLASS_PENDING_EDIT: string = "CLEAR_DOING_CLASS_PENDING_EDIT";
export const REMOVE_DOING_CLASS_ALL: string = "REMOVE_DOING_CLASS_ALL";
export const INITIAL_DOING_CLASS: string = "INITIAL_DOING_CLASS";

// not_register_classes_parents
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

export function fetchDataSuccess(classes_parent: IClassesParent) {
    return {
        type: FETCH_DATA_SUCCESS,
        classes_parent
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialDoinglClass(classes_parent: IClassesParent): IInitialDoinglClassActionType {
    return { type: INITIAL_DOING_CLASS, classes_parent: classes_parent };
}

export function removeDoinglClassAll(): IRemoveDoinglClassAllActionType {
    return { type: REMOVE_DOING_CLASS_ALL };
}

export function addDoinglClass(classes_parent: IClassesParent): IAddDoinglClassActionType {
    return { type: ADD_DOING_CLASS, classes_parent: classes_parent };
}

export function editDoinglClass(classes_parent: IClassesParent): IEditDoinglClassActionType {
    return { type: EDIT_DOING_CLASS, classes_parent: classes_parent };
}

export function removeDoinglClass(id: number): IRemoveDoinglClassActionType {
    return { type: REMOVE_DOING_CLASS, id: id };
}

export function changeSelectedDoinglClass(classes_parent: IClassesParent): IChangeSelectedDoinglClassActionType {
    return { type: CHANGE_DOING_CLASS_PENDING_EDIT, classes_parent: classes_parent };
}

export function clearSelectedDoinglClass(): IClearSelectedDoinglClassActionType {
    return { type: CLEAR_DOING_CLASS_PENDING_EDIT };
}


export function initialDoneClass(classes_parent: IClassesParent): IInitialDoneClassActionType {
    return { type: INITIAL_DONE_CLASS, classes_parent: classes_parent };
}

export function removeDoneClassAll(): IRemoveDoneClassAllActionType {
    return { type: REMOVE_DONE_CLASS_ALL };
}

export function addDoneClass(classes_parent: IClassesParent): IAddDoneClassActionType {
    return { type: ADD_DONE_CLASS, classes_parent: classes_parent };
}

export function editDoneClass(classes_parent: IClassesParent): IEditDoneClassActionType {
    return { type: EDIT_DONE_CLASS, classes_parent: classes_parent };
}

export function removeDoneClass(id: number): IRemoveDoneClassActionType {
    return { type: REMOVE_DONE_CLASS, id: id };
}

export function changeSelectedDoneClass(classes_parent: IClassesParent): IChangeSelectedDoneClassActionType {
    return { type: CHANGE_DONE_CLASS_PENDING_EDIT, classes_parent: classes_parent };
}

export function clearSelectedDoneClass(): IClearSelectedDoneClassActionType {
    return { type: CLEAR_DONE_CLASS_PENDING_EDIT };
}

export function setModificationState(value: ClassesParentModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_classes_parents
interface IAddDoinglClassActionType { type: string, classes_parent: IClassesParent };
interface IEditDoinglClassActionType { type: string, classes_parent: IClassesParent };
interface IRemoveDoinglClassActionType { type: string, id: number };
interface IChangeSelectedDoinglClassActionType { type: string, classes_parent: IClassesParent };
interface IClearSelectedDoinglClassActionType { type: string };
interface IRemoveDoinglClassAllActionType { type: string }
interface IInitialDoinglClassActionType {type: string, classes_parent: IClassesParent}

// not_register_classes_parents
interface IAddDoneClassActionType { type: string, classes_parent: IClassesParent };
interface IEditDoneClassActionType { type: string, classes_parent: IClassesParent };
interface IRemoveDoneClassActionType { type: string, id: number };
interface IChangeSelectedDoneClassActionType { type: string, classes_parent: IClassesParent };
interface IClearSelectedDoneClassActionType { type: string };
interface IRemoveDoneClassAllActionType { type: string }
interface IInitialDoneClassActionType {type: string, classes_parent: IClassesParent}



interface ISetModificationStateActionType { type: string, value:  ClassesParentModificationStatus};