import { ITutorial, TutorialModificationStatus } from "../models/tutorial.interface";

// register_successfull_tutorials
export const ADD_TUTORIAL: string = "ADD_TUTORIAL";
export const EDIT_TUTORIAL: string = "EDIT_TUTORIAL";
export const REMOVE_TUTORIAL: string = "REMOVE_TUTORIAL";
export const CHANGE_TUTORIAL_AMOUNT: string = "CHANGE_TUTORIAL_AMOUNT";
export const CHANGE_TUTORIAL_PENDING_EDIT: string = "CHANGE_TUTORIAL_PENDING_EDIT";
export const CLEAR_TUTORIAL_PENDING_EDIT: string = "CLEAR_TUTORIAL_PENDING_EDIT";
export const REMOVE_TUTORIAL_ALL: string = "REMOVE_TUTORIAL_ALL";
export const INITIAL_TUTORIAL: string = "INITIAL_TUTORIAL";


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

export function initialTutorial(tutorial: ITutorial): IInitialTutorialActionType {
    return { type: INITIAL_TUTORIAL, tutorial: tutorial };
}

export function removeTutorialAll(): IRemoveTutorialAllActionType {
    return { type: REMOVE_TUTORIAL_ALL };
}

export function addTutorial(tutorial: ITutorial): IAddTutorialActionType {
    return { type: ADD_TUTORIAL, tutorial: tutorial };
}

export function editTutorial(tutorial: ITutorial): IEditTutorialActionType {
    return { type: EDIT_TUTORIAL, tutorial: tutorial };
}

export function removeTutorial(id: any): IRemoveTutorialActionType {
    return { type: REMOVE_TUTORIAL, id: id };
}

export function changeSelectedTutorial(tutorial: ITutorial): IChangeSelectedTutorialActionType {
    return { type: CHANGE_TUTORIAL_PENDING_EDIT, tutorial: tutorial };
}

export function clearSelectedTutorial(): IClearSelectedTutorialActionType {
    return { type: CLEAR_TUTORIAL_PENDING_EDIT };
}


export function setModificationState(value: TutorialModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}


// register_successfull_tutorials
interface IAddTutorialActionType { type: string, tutorial: ITutorial };
interface IEditTutorialActionType { type: string, tutorial: ITutorial };
interface IRemoveTutorialActionType { type: string, id: any };
interface IChangeSelectedTutorialActionType { type: string, tutorial: ITutorial };
interface IClearSelectedTutorialActionType { type: string };
interface IRemoveTutorialAllActionType { type: string }
interface IInitialTutorialActionType {type: string, tutorial: ITutorial}
interface ISetModificationStateActionType { type: string, value:  TutorialModificationStatus};