import { IUserRegisterTutorial, UserRegisterTutorialModificationStatus } from "../models/user_register_tutorial.interface";

// register_successfull_user_register_tutorials
export const ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: string = "ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW";
export const EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: string = "EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW";
export const REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: string = "REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW";
export const CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_AMOUNT: string = "CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_AMOUNT";
export const CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: string = "CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT";
export const CLEAR_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: string = "CLEAR_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT";
export const REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_ALL: string = "REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_ALL";
export const INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW: string = "INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW";

// not_register_user_register_tutorials
export const ADD_USER_REGISTER_TUTORIAL_APPROVED: string = "ADD_USER_REGISTER_TUTORIAL_APPROVED";
export const EDIT_USER_REGISTER_TUTORIAL_APPROVED: string = "EDIT_USER_REGISTER_TUTORIAL_APPROVED";
export const REMOVE_USER_REGISTER_TUTORIAL_APPROVED: string = "REMOVE_USER_REGISTER_TUTORIAL_APPROVED";
export const CHANGE_USER_REGISTER_TUTORIAL_APPROVED_AMOUNT: string = "CHANGE_USER_REGISTER_TUTORIAL_APPROVED_AMOUNT";
export const CHANGE_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT: string = "CHANGE_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT";
export const CLEAR_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT: string = "CLEAR_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT";
export const REMOVE_USER_REGISTER_TUTORIAL_APPROVED_ALL: string = "REMOVE_USER_REGISTER_TUTORIAL_APPROVED_ALL";
export const INITIAL_USER_REGISTER_TUTORIAL_APPROVED: string = "INITIAL_USER_REGISTER_TUTORIAL_APPROVED";


// Approved to tutorial template
export const ADD_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: string = "ADD_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE";
export const EDIT_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: string = "EDIT_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE";
export const REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: string = "REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE";
export const CHANGE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_AMOUNT: string = "CHANGE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_AMOUNT";
export const CHANGE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_PENDING_EDIT: string = "CHANGE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_PENDING_EDIT";
export const CLEAR_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_PENDING_EDIT: string = "CLEAR_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_PENDING_EDIT";
export const REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_ALL: string = "REMOVE_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE_ALL";
export const INITIAL_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE: string = "INITIAL_USER_REGISTER_TUTORIAL_APPROVED_TO_TUTORIAL_TEMPLATE";


// not_register_user_register_tutorials
export const ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED: string = "ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED";
export const EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED: string = "EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED";
export const REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED: string = "REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED";
export const CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_AMOUNT: string = "CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_AMOUNT";
export const CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_PENDING_EDIT: string = "CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_PENDING_EDIT";
export const CLEAR_USER_REGISTER_TUTORIAL_NOT_APPROVED_PENDING_EDIT: string = "CLEAR_USER_REGISTER_TUTORIAL_NOT_APPROVED_PENDING_EDIT";
export const REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_ALL: string = "REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_ALL";
export const INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED: string = "INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(user_register_tutorial: IUserRegisterTutorial) {
    return {
        type: FETCH_DATA_SUCCESS,
        user_register_tutorial
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialUserRegisterTutorialNotApprovedNow(user_register_tutorial: IUserRegisterTutorial): IInitialUserRegisterTutorialNotApprovedNowActionType {
    return { type: INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialNotApprovedNowAll(): IRemoveUserRegisterTutorialNotApprovedNowAllActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_ALL };
}

export function addUserRegisterTutorialNotApprovedNow(user_register_tutorial: IUserRegisterTutorial): IAddUserRegisterTutorialNotApprovedNowActionType {
    return { type: ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW, user_register_tutorial: user_register_tutorial };
}

export function editUserRegisterTutorialNotApprovedNow(user_register_tutorial: IUserRegisterTutorial): IEditUserRegisterTutorialNotApprovedNowActionType {
    return { type: EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialNotApprovedNow(id: number): IRemoveUserRegisterTutorialNotApprovedNowActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW, id: id };
}

export function changeSelectedUserRegisterTutorialNotApprovedNow(user_register_tutorial: IUserRegisterTutorial): IChangeSelectedUserRegisterTutorialNotApprovedNowActionType {
    return { type: CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT, user_register_tutorial: user_register_tutorial };
}

export function clearSelectedUserRegisterTutorialNotApprovedNow(): IClearSelectedUserRegisterTutorialNotApprovedNowActionType {
    return { type: CLEAR_USER_REGISTER_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT };
}


export function initialUserRegisterTutorialApproved(user_register_tutorial: IUserRegisterTutorial): IInitialUserRegisterTutorialApprovedActionType {
    return { type: INITIAL_USER_REGISTER_TUTORIAL_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialApprovedAll(): IRemoveUserRegisterTutorialApprovedAllActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_APPROVED_ALL };
}

export function addUserRegisterTutorialApproved(user_register_tutorial: IUserRegisterTutorial): IAddUserRegisterTutorialApprovedActionType {
    return { type: ADD_USER_REGISTER_TUTORIAL_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function editUserRegisterTutorialApproved(user_register_tutorial: IUserRegisterTutorial): IEditUserRegisterTutorialApprovedActionType {
    return { type: EDIT_USER_REGISTER_TUTORIAL_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialApproved(id: number): IRemoveUserRegisterTutorialApprovedActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_APPROVED, id: id };
}

export function changeSelectedUserRegisterTutorialApproved(user_register_tutorial: IUserRegisterTutorial): IChangeSelectedUserRegisterTutorialApprovedActionType {
    return { type: CHANGE_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT, user_register_tutorial: user_register_tutorial };
}

export function clearSelectedUserRegisterTutorialApproved(): IClearSelectedUserRegisterTutorialApprovedActionType {
    return { type: CLEAR_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT };
}

export function setModificationState(value: UserRegisterTutorialModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}




export function initialUserRegisterTutorialApprovedToTutorialTemplate(user_register_tutorial: IUserRegisterTutorial): IInitialUserRegisterTutorialApprovedToTutorialTemplateActionType {
    return { type: INITIAL_USER_REGISTER_TUTORIAL_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialApprovedToTutorialTemplateAll(): IRemoveUserRegisterTutorialApprovedToTutorialTemplateAllActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_APPROVED_ALL };
}

export function addUserRegisterTutorialApprovedToTutorialTemplate(user_register_tutorial: IUserRegisterTutorial): IAddUserRegisterTutorialApprovedToTutorialTemplateActionType {
    return { type: ADD_USER_REGISTER_TUTORIAL_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function editUserRegisterTutorialApprovedToTutorialTemplate(user_register_tutorial: IUserRegisterTutorial): IEditUserRegisterTutorialApprovedToTutorialTemplateActionType {
    return { type: EDIT_USER_REGISTER_TUTORIAL_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialApprovedToTutorialTemplate(id: number): IRemoveUserRegisterTutorialApprovedToTutorialTemplateActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_APPROVED, id: id };
}

export function changeSelectedUserRegisterTutorialApprovedToTutorialTemplate(user_register_tutorial: IUserRegisterTutorial): IChangeSelectedUserRegisterTutorialApprovedToTutorialTemplateActionType {
    return { type: CHANGE_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT, user_register_tutorial: user_register_tutorial };
}

export function clearSelectedUserRegisterTutorialApprovedToTutorialTemplate(): IClearSelectedUserRegisterTutorialApprovedToTutorialTemplateActionType {
    return { type: CLEAR_USER_REGISTER_TUTORIAL_APPROVED_PENDING_EDIT };
}



export function initialUserRegisterTutorialNotApproved(user_register_tutorial: IUserRegisterTutorial): IInitialUserRegisterTutorialNotApprovedActionType {
    return { type: INITIAL_USER_REGISTER_TUTORIAL_NOT_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialNotApprovedAll(): IRemoveUserRegisterTutorialNotApprovedAllActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED_ALL };
}

export function addUserRegisterTutorialNotApproved(user_register_tutorial: IUserRegisterTutorial): IAddUserRegisterTutorialNotApprovedActionType {
    return { type: ADD_USER_REGISTER_TUTORIAL_NOT_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function editUserRegisterTutorialNotApproved(user_register_tutorial: IUserRegisterTutorial): IEditUserRegisterTutorialNotApprovedActionType {
    return { type: EDIT_USER_REGISTER_TUTORIAL_NOT_APPROVED, user_register_tutorial: user_register_tutorial };
}

export function removeUserRegisterTutorialNotApproved(id: number): IRemoveUserRegisterTutorialNotApprovedActionType {
    return { type: REMOVE_USER_REGISTER_TUTORIAL_NOT_APPROVED, id: id };
}

export function changeSelectedUserRegisterTutorialNotApproved(user_register_tutorial: IUserRegisterTutorial): IChangeSelectedUserRegisterTutorialNotApprovedActionType {
    return { type: CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_AMOUNT, user_register_tutorial: user_register_tutorial };
}

export function clearSelectedUserRegisterTutorialNotApproved(): IClearSelectedUserRegisterTutorialNotApprovedActionType {
    return { type: CHANGE_USER_REGISTER_TUTORIAL_NOT_APPROVED_PENDING_EDIT };
}

// register_successfull_user_register_tutorials
interface IAddUserRegisterTutorialNotApprovedNowActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IEditUserRegisterTutorialNotApprovedNowActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IRemoveUserRegisterTutorialNotApprovedNowActionType { type: string, id: number };
interface IChangeSelectedUserRegisterTutorialNotApprovedNowActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IClearSelectedUserRegisterTutorialNotApprovedNowActionType { type: string };
interface IRemoveUserRegisterTutorialNotApprovedNowAllActionType { type: string }
interface IInitialUserRegisterTutorialNotApprovedNowActionType {type: string, user_register_tutorial: IUserRegisterTutorial}

// not_register_user_register_tutorials
interface IAddUserRegisterTutorialApprovedActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IEditUserRegisterTutorialApprovedActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IRemoveUserRegisterTutorialApprovedActionType { type: string, id: number };
interface IChangeSelectedUserRegisterTutorialApprovedActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IClearSelectedUserRegisterTutorialApprovedActionType { type: string };
interface IRemoveUserRegisterTutorialApprovedAllActionType { type: string }
interface IInitialUserRegisterTutorialApprovedActionType {type: string, user_register_tutorial: IUserRegisterTutorial}


// not_register_user_register_tutorials
interface IAddUserRegisterTutorialApprovedToTutorialTemplateActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IEditUserRegisterTutorialApprovedToTutorialTemplateActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IRemoveUserRegisterTutorialApprovedToTutorialTemplateActionType { type: string, id: number };
interface IChangeSelectedUserRegisterTutorialApprovedToTutorialTemplateActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IClearSelectedUserRegisterTutorialApprovedToTutorialTemplateActionType { type: string };
interface IRemoveUserRegisterTutorialApprovedToTutorialTemplateAllActionType { type: string }
interface IInitialUserRegisterTutorialApprovedToTutorialTemplateActionType {type: string, user_register_tutorial: IUserRegisterTutorial}


// register_successfull_user_register_tutorials
interface IAddUserRegisterTutorialNotApprovedActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IEditUserRegisterTutorialNotApprovedActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IRemoveUserRegisterTutorialNotApprovedActionType { type: string, id: number };
interface IChangeSelectedUserRegisterTutorialNotApprovedActionType { type: string, user_register_tutorial: IUserRegisterTutorial };
interface IClearSelectedUserRegisterTutorialNotApprovedActionType { type: string };
interface IRemoveUserRegisterTutorialNotApprovedAllActionType { type: string }
interface IInitialUserRegisterTutorialNotApprovedActionType {type: string, user_register_tutorial: IUserRegisterTutorial}




interface ISetModificationStateActionType { type: string, value:  UserRegisterTutorialModificationStatus};