import { ITutorial, TutorialModificationStatus } from "../models/tutorial.interface";

// register_successfull_tutorials
export const ADD_TUTORIAL_NOT_APPROVED_NOW: string = "ADD_TUTORIAL_NOT_APPROVED_NOW";
export const EDIT_TUTORIAL_NOT_APPROVED_NOW: string = "EDIT_TUTORIAL_NOT_APPROVED_NOW";
export const REMOVE_TUTORIAL_NOT_APPROVED_NOW: string = "REMOVE_TUTORIAL_NOT_APPROVED_NOW";
export const CHANGE_TUTORIAL_NOT_APPROVED_NOW_AMOUNT: string = "CHANGE_TUTORIAL_NOT_APPROVED_NOW_AMOUNT";
export const CHANGE_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: string = "CHANGE_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT";
export const CLEAR_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT: string = "CLEAR_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT";
export const REMOVE_TUTORIAL_NOT_APPROVED_NOW_ALL: string = "REMOVE_TUTORIAL_NOT_APPROVED_NOW_ALL";
export const INITIAL_TUTORIAL_NOT_APPROVED_NOW: string = "INITIAL_TUTORIAL_NOT_APPROVED_NOW";

// not_register_tutorials
export const ADD_TUTORIAL_APPROVED: string = "ADD_TUTORIAL_APPROVED";
export const EDIT_TUTORIAL_APPROVED: string = "EDIT_TUTORIAL_APPROVED";
export const REMOVE_TUTORIAL_APPROVED: string = "REMOVE_TUTORIAL_APPROVED";
export const CHANGE_TUTORIAL_APPROVED_AMOUNT: string = "CHANGE_TUTORIAL_APPROVED_AMOUNT";
export const CHANGE_TUTORIAL_APPROVED_PENDING_EDIT: string = "CHANGE_TUTORIAL_APPROVED_PENDING_EDIT";
export const CLEAR_TUTORIAL_APPROVED_PENDING_EDIT: string = "CLEAR_TUTORIAL_APPROVED_PENDING_EDIT";
export const REMOVE_TUTORIAL_APPROVED_ALL: string = "REMOVE_TUTORIAL_APPROVED_ALL";
export const INITIAL_TUTORIAL_APPROVED: string = "INITIAL_TUTORIAL_APPROVED";


// not_register_tutorials
export const ADD_TUTORIAL_NOT_APPROVED: string = "ADD_TUTORIAL_NOT_APPROVED";
export const EDIT_TUTORIAL_NOT_APPROVED: string = "EDIT_TUTORIAL_NOT_APPROVED";
export const REMOVE_TUTORIAL_NOT_APPROVED: string = "REMOVE_TUTORIAL_NOT_APPROVED";
export const CHANGE_TUTORIAL_NOT_APPROVED_AMOUNT: string = "CHANGE_TUTORIAL_NOT_APPROVED_AMOUNT";
export const CHANGE_TUTORIAL_NOT_APPROVED_PENDING_EDIT: string = "CHANGE_TUTORIAL_NOT_APPROVED_PENDING_EDIT";
export const CLEAR_TUTORIAL_NOT_APPROVED_PENDING_EDIT: string = "CLEAR_TUTORIAL_NOT_APPROVED_PENDING_EDIT";
export const REMOVE_TUTORIAL_NOT_APPROVED_ALL: string = "REMOVE_TUTORIAL_NOT_APPROVED_ALL";
export const INITIAL_TUTORIAL_NOT_APPROVED: string = "INITIAL_TUTORIAL_NOT_APPROVED";


export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(tutorial: ITutorial) {
    return {
        type: FETCH_DATA_SUCCESS,
        tutorial
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialTutorialNotApprovedNow(tutorial: ITutorial): IInitialTutorialNotApprovedNowActionType {
    return { type: INITIAL_TUTORIAL_NOT_APPROVED_NOW, tutorial: tutorial };
}

export function removeTutorialNotApprovedNowAll(): IRemoveTutorialNotApprovedNowAllActionType {
    return { type: REMOVE_TUTORIAL_NOT_APPROVED_NOW_ALL };
}

export function addTutorialNotApprovedNow(tutorial: ITutorial): IAddTutorialNotApprovedNowActionType {
    return { type: ADD_TUTORIAL_NOT_APPROVED_NOW, tutorial: tutorial };
}

export function editTutorialNotApprovedNow(tutorial: ITutorial): IEditTutorialNotApprovedNowActionType {
    return { type: EDIT_TUTORIAL_NOT_APPROVED_NOW, tutorial: tutorial };
}

export function removeTutorialNotApprovedNow(id: number): IRemoveTutorialNotApprovedNowActionType {
    return { type: REMOVE_TUTORIAL_NOT_APPROVED_NOW, id: id };
}

export function changeSelectedTutorialNotApprovedNow(tutorial: ITutorial): IChangeSelectedTutorialNotApprovedNowActionType {
    return { type: CHANGE_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT, tutorial: tutorial };
}

export function clearSelectedTutorialNotApprovedNow(): IClearSelectedTutorialNotApprovedNowActionType {
    return { type: CLEAR_TUTORIAL_NOT_APPROVED_NOW_PENDING_EDIT };
}


export function initialTutorialApproved(tutorial: ITutorial): IInitialTutorialApprovedActionType {
    return { type: INITIAL_TUTORIAL_APPROVED, tutorial: tutorial };
}

export function removeTutorialApprovedAll(): IRemoveTutorialApprovedAllActionType {
    return { type: REMOVE_TUTORIAL_APPROVED_ALL };
}

export function addTutorialApproved(tutorial: ITutorial): IAddTutorialApprovedActionType {
    return { type: ADD_TUTORIAL_APPROVED, tutorial: tutorial };
}

export function editTutorialApproved(tutorial: ITutorial): IEditTutorialApprovedActionType {
    return { type: EDIT_TUTORIAL_APPROVED, tutorial: tutorial };
}

export function removeTutorialApproved(id: number): IRemoveTutorialApprovedActionType {
    return { type: REMOVE_TUTORIAL_APPROVED, id: id };
}

export function changeSelectedTutorialApproved(tutorial: ITutorial): IChangeSelectedTutorialApprovedActionType {
    return { type: CHANGE_TUTORIAL_APPROVED_PENDING_EDIT, tutorial: tutorial };
}

export function clearSelectedTutorialApproved(): IClearSelectedTutorialApprovedActionType {
    return { type: CLEAR_TUTORIAL_APPROVED_PENDING_EDIT };
}

export function setModificationState(value: TutorialModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}



export function initialTutorialNotApproved(tutorial: ITutorial): IInitialTutorialNotApprovedActionType {
    return { type: INITIAL_TUTORIAL_NOT_APPROVED, tutorial: tutorial };
}

export function removeTutorialNotApprovedAll(): IRemoveTutorialNotApprovedAllActionType {
    return { type: REMOVE_TUTORIAL_NOT_APPROVED_ALL };
}

export function addTutorialNotApproved(tutorial: ITutorial): IAddTutorialNotApprovedActionType {
    return { type: ADD_TUTORIAL_NOT_APPROVED, tutorial: tutorial };
}

export function editTutorialNotApproved(tutorial: ITutorial): IEditTutorialNotApprovedActionType {
    return { type: EDIT_TUTORIAL_NOT_APPROVED, tutorial: tutorial };
}

export function removeTutorialNotApproved(id: number): IRemoveTutorialNotApprovedActionType {
    return { type: REMOVE_TUTORIAL_NOT_APPROVED, id: id };
}

export function changeSelectedTutorialNotApproved(tutorial: ITutorial): IChangeSelectedTutorialNotApprovedActionType {
    return { type: CHANGE_TUTORIAL_NOT_APPROVED_AMOUNT, tutorial: tutorial };
}

export function clearSelectedTutorialNotApproved(): IClearSelectedTutorialNotApprovedActionType {
    return { type: CHANGE_TUTORIAL_NOT_APPROVED_PENDING_EDIT };
}

// register_successfull_tutorials
interface IAddTutorialNotApprovedNowActionType { type: string, tutorial: ITutorial };
interface IEditTutorialNotApprovedNowActionType { type: string, tutorial: ITutorial };
interface IRemoveTutorialNotApprovedNowActionType { type: string, id: number };
interface IChangeSelectedTutorialNotApprovedNowActionType { type: string, tutorial: ITutorial };
interface IClearSelectedTutorialNotApprovedNowActionType { type: string };
interface IRemoveTutorialNotApprovedNowAllActionType { type: string }
interface IInitialTutorialNotApprovedNowActionType {type: string, tutorial: ITutorial}

// not_register_tutorials
interface IAddTutorialApprovedActionType { type: string, tutorial: ITutorial };
interface IEditTutorialApprovedActionType { type: string, tutorial: ITutorial };
interface IRemoveTutorialApprovedActionType { type: string, id: number };
interface IChangeSelectedTutorialApprovedActionType { type: string, tutorial: ITutorial };
interface IClearSelectedTutorialApprovedActionType { type: string };
interface IRemoveTutorialApprovedAllActionType { type: string }
interface IInitialTutorialApprovedActionType {type: string, tutorial: ITutorial}


// register_successfull_tutorials
interface IAddTutorialNotApprovedActionType { type: string, tutorial: ITutorial };
interface IEditTutorialNotApprovedActionType { type: string, tutorial: ITutorial };
interface IRemoveTutorialNotApprovedActionType { type: string, id: number };
interface IChangeSelectedTutorialNotApprovedActionType { type: string, tutorial: ITutorial };
interface IClearSelectedTutorialNotApprovedActionType { type: string };
interface IRemoveTutorialNotApprovedAllActionType { type: string }
interface IInitialTutorialNotApprovedActionType {type: string, tutorial: ITutorial}




interface ISetModificationStateActionType { type: string, value:  TutorialModificationStatus};