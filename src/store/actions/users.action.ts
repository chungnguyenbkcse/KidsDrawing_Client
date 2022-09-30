import { IUser, UserModificationStatus } from "../models/user.interface";

export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

//Admin
export const ADD_ADMIN: string = "ADD_ADMIN";
export const EDIT_ADMIN: string = "EDIT_ADMIN";
export const REMOVE_ADMIN: string = "REMOVE_ADMIN";

//Teacher
export const REMOVE_TEACHER_ALL: string = "REMOVE_TEACHER_ALL";
export const INITIAL_TEACHER: string = "INITIAL_TEACHER";
export const ADD_TEACHER: string = "ADD_TEACHER";
export const REMOVE_TEACHER: string = "REMOVE_TEACHER";
export const EDIT_TEACHER: string = "EDIT_TEACHER";


//Student
export const REMOVE_STUDENT_ALL: string = "REMOVE_STUDENT_ALL";
export const INITIAL_STUDENT: string = "INITIAL_STUDENT";
export const ADD_STUDENT: string = "ADD_STUDENT";
export const EDIT_STUDENT: string = "EDIT_STUDENT";
export const REMOVE_STUDENT: string = "REMOVE_STUDENT";

//Parent
export const REMOVE_PARENT_ALL: string = "REMOVE_PARENT_ALL";
export const INITIAL_PARENT: string = "INITIAL_PARENT";
export const ADD_PARENT: string = "ADD_PARENT";
export const EDIT_PARENT: string = "EDIT_PARENT";
export const REMOVE_PARENT: string = "REMOVE_PARENT";

export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const CHANGE_USER_PENDING_EDIT: string = "CHANGE_USER_PENDING_EDIT";
export const CLEAR_USER_PENDING_EDIT: string = "CLEAR_USER_PENDING_EDIT";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user: IUser) {
    return {
        type: FETCH_DATA_SUCCESS,
        user
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTeacher(user: IUser): IInitialUserTeacherActionType {
    return { type: INITIAL_TEACHER, user: user };
}

export function removeTeacherAll(): IRemoveUserTeacherAllActionType {
    return { type: REMOVE_TEACHER_ALL };
}

export function initialStudent(user: IUser): IInitialUserStudentActionType {
    return { type: INITIAL_STUDENT, user: user };
}

export function removeStudentAll(): IRemoveUserStudentAllActionType {
    return { type: REMOVE_STUDENT_ALL };
}

export function initialParent(user: IUser): IInitialUserParentActionType {
    return { type: INITIAL_PARENT, user: user };
}

export function removeParentAll(): IRemoveUserParentAllActionType {
    return { type: REMOVE_PARENT_ALL };
}

export function addAdmin(user: IUser): IAddAdminActionType {
    return { type: ADD_ADMIN, user: user };
}

export function editAdmin(user: IUser): IEditAdminActionType {
    return { type: EDIT_ADMIN, user: user };
}

export function removeAdmin(id: string): IRemoveAdminActionType {
    return { type: REMOVE_ADMIN, id: id };
}

export function addTeacher(user: IUser): IAddTeacherActionType {
    return { type: ADD_TEACHER, user: user };
}

export function editTeacher(user: IUser): IEditTeacherActionType {
    return { type: EDIT_TEACHER, user: user };
}

export function removeTeacher(id: string): IRemoveTeacherActionType {
    return { type: REMOVE_TEACHER, id: id };
}

export function addStudent(user: IUser): IAddStudentActionType {
    return { type: ADD_STUDENT, user: user };
}

export function editStudent(user: IUser): IEditStudentActionType {
    return { type: EDIT_STUDENT, user: user };
}

export function removeStudent(id: string): IRemoveStudentActionType {
    return { type: REMOVE_STUDENT, id: id };
}

export function addParent(user: IUser): IAddParentActionType {
    return { type: ADD_PARENT, user: user };
}

export function editParent(user: IUser): IEditParentActionType {
    return { type: EDIT_PARENT, user: user };
}

export function removeParent(id: string): IRemoveParentActionType {
    return { type: REMOVE_PARENT, id: id };
}

export function changeSelectedUser(user: IUser): IChangeSelectedUserActionType {
    return { type: CHANGE_USER_PENDING_EDIT, user: user };
}

export function clearSelectedUser(): IClearSelectedUserActionType {
    return { type: CLEAR_USER_PENDING_EDIT };
}

export function setModificationState(value: UserModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

// Admin
interface IAddAdminActionType { type: string, user: IUser };
interface IEditAdminActionType { type: string, user: IUser };
interface IRemoveAdminActionType { type: string, id: string };

// Teacher
interface IInitialUserTeacherActionType {type: string, user: IUser};
interface IRemoveUserTeacherAllActionType { type: string };
interface IAddTeacherActionType { type: string, user: IUser };
interface IEditTeacherActionType { type: string, user: IUser };
interface IRemoveTeacherActionType { type: string, id: string };
interface IChangeSelectedTeacherActionType { type: string, user: IUser };
interface IClearSelectedTeacherActionType { type: string };

//Student
interface IInitialUserStudentActionType {type: string, user: IUser};
interface IRemoveUserStudentAllActionType { type: string };
interface IAddStudentActionType { type: string, user: IUser };
interface IEditStudentActionType { type: string, user: IUser };
interface IRemoveStudentActionType { type: string, id: string };

//Parent
interface IInitialUserParentActionType {type: string, user: IUser};
interface IRemoveUserParentAllActionType { type: string };
interface IAddParentActionType { type: string, user: IUser };
interface IEditParentActionType { type: string, user: IUser };
interface IRemoveParentActionType { type: string, id: string };


interface ISetModificationStateActionType { type: string, value:  UserModificationStatus};
interface IChangeSelectedUserActionType { type: string, user: IUser };
interface IClearSelectedUserActionType { type: string };