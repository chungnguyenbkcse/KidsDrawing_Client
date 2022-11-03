import { IClassTeacher, ClassTeacherModificationStatus } from "../models/class_teacher.interface";

// register_successfull_class_teachers
export const ADD_DOING_CLASS: string = "ADD_DOING_CLASS";
export const EDIT_DOING_CLASS: string = "EDIT_DOING_CLASS";
export const REMOVE_DOING_CLASS: string = "REMOVE_DOING_CLASS";
export const CHANGE_DOING_CLASS_AMOUNT: string = "CHANGE_DOING_CLASS_AMOUNT";
export const CHANGE_DOING_CLASS_PENDING_EDIT: string = "CHANGE_DOING_CLASS_PENDING_EDIT";
export const CLEAR_DOING_CLASS_PENDING_EDIT: string = "CLEAR_DOING_CLASS_PENDING_EDIT";
export const REMOVE_DOING_CLASS_ALL: string = "REMOVE_DOING_CLASS_ALL";
export const INITIAL_DOING_CLASS: string = "INITIAL_DOING_CLASS";

// not_register_class_teachers
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

export function fetchDataSuccess(class_teacher: IClassTeacher) {
    return {
        type: FETCH_DATA_SUCCESS,
        class_teacher
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialDoinglClass(class_teacher: IClassTeacher): IInitialDoinglClassActionType {
    return { type: INITIAL_DOING_CLASS, class_teacher: class_teacher };
}

export function removeDoinglClassAll(): IRemoveDoinglClassAllActionType {
    return { type: REMOVE_DOING_CLASS_ALL };
}

export function addDoinglClass(class_teacher: IClassTeacher): IAddDoinglClassActionType {
    return { type: ADD_DOING_CLASS, class_teacher: class_teacher };
}

export function editDoinglClass(class_teacher: IClassTeacher): IEditDoinglClassActionType {
    return { type: EDIT_DOING_CLASS, class_teacher: class_teacher };
}

export function removeDoinglClass(id: any): IRemoveDoinglClassActionType {
    return { type: REMOVE_DOING_CLASS, id: id };
}

export function changeSelectedDoinglClass(class_teacher: IClassTeacher): IChangeSelectedDoinglClassActionType {
    return { type: CHANGE_DOING_CLASS_PENDING_EDIT, class_teacher: class_teacher };
}

export function clearSelectedDoinglClass(): IClearSelectedDoinglClassActionType {
    return { type: CLEAR_DOING_CLASS_PENDING_EDIT };
}


export function initialDoneClass(class_teacher: IClassTeacher): IInitialDoneClassActionType {
    return { type: INITIAL_DONE_CLASS, class_teacher: class_teacher };
}

export function removeDoneClassAll(): IRemoveDoneClassAllActionType {
    return { type: REMOVE_DONE_CLASS_ALL };
}

export function addDoneClass(class_teacher: IClassTeacher): IAddDoneClassActionType {
    return { type: ADD_DONE_CLASS, class_teacher: class_teacher };
}

export function editDoneClass(class_teacher: IClassTeacher): IEditDoneClassActionType {
    return { type: EDIT_DONE_CLASS, class_teacher: class_teacher };
}

export function removeDoneClass(id: any): IRemoveDoneClassActionType {
    return { type: REMOVE_DONE_CLASS, id: id };
}

export function changeSelectedDoneClass(class_teacher: IClassTeacher): IChangeSelectedDoneClassActionType {
    return { type: CHANGE_DONE_CLASS_PENDING_EDIT, class_teacher: class_teacher };
}

export function clearSelectedDoneClass(): IClearSelectedDoneClassActionType {
    return { type: CLEAR_DONE_CLASS_PENDING_EDIT };
}

export function setModificationState(value: ClassTeacherModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// register_successfull_class_teachers
interface IAddDoinglClassActionType { type: string, class_teacher: IClassTeacher };
interface IEditDoinglClassActionType { type: string, class_teacher: IClassTeacher };
interface IRemoveDoinglClassActionType { type: string, id: any };
interface IChangeSelectedDoinglClassActionType { type: string, class_teacher: IClassTeacher };
interface IClearSelectedDoinglClassActionType { type: string };
interface IRemoveDoinglClassAllActionType { type: string }
interface IInitialDoinglClassActionType {type: string, class_teacher: IClassTeacher}

// not_register_class_teachers
interface IAddDoneClassActionType { type: string, class_teacher: IClassTeacher };
interface IEditDoneClassActionType { type: string, class_teacher: IClassTeacher };
interface IRemoveDoneClassActionType { type: string, id: any };
interface IChangeSelectedDoneClassActionType { type: string, class_teacher: IClassTeacher };
interface IClearSelectedDoneClassActionType { type: string };
interface IRemoveDoneClassAllActionType { type: string }
interface IInitialDoneClassActionType {type: string, class_teacher: IClassTeacher}



interface ISetModificationStateActionType { type: string, value:  ClassTeacherModificationStatus};