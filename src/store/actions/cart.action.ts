import { ICart, CartModificationStatus } from "../models/cart.interface";
export const ADD_CART: string = "ADD_CART";
export const EDIT_CART: string = "EDIT_CART";
export const REMOVE_CART: string = "REMOVE_CART";
export const INCREASE_QUANTITY: string = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY: string = "DECREASE_QUANTITY";
export const CHANGE_CART_AMOUNT: string = "CHANGE_CART_AMOUNT";
export const CHANGE_CART_PENDING_EDIT: string = "CHANGE_CART_PENDING_EDIT";
export const CLEAR_CART_PENDING_EDIT: string = "CLEAR_CART_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";
export const FETCH_DATA_REQUEST: string = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS: string = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR: string = "FETCH_DATA_ERROR";
export const REMOVE_CART_ALL: string = "REMOVE_CART_ALL";
export const INITIAL_CART: string = "INITIAL_CART";

export function fetchDataRequest() {
    return {
        type: FETCH_DATA_REQUEST
    };
}

export function fetchDataSuccess(cart: ICart) {
    return {
        type: FETCH_DATA_SUCCESS,
        cart
    };
}

export function fetchDataError(error: any) {
    return {
        type: FETCH_DATA_ERROR,
        payload: { error }
    };
}

export function initialCart(cart: ICart): IInitialCartActionType {
    return { type: INITIAL_CART, cart: cart };
}

export function removeCartAll(): IRemoveCartAllActionType {
    return { type: REMOVE_CART_ALL };
}

export function addCart(cart: ICart): IAddCartActionType {
    return { type: ADD_CART, cart: cart };
}

export function editCart(cart: ICart): IEditCartActionType {
    return { type: EDIT_CART, cart: cart };
}

export function removeCart(id: any): IRemoveCartActionType {
    return { type: REMOVE_CART, id: id };
}

export function increaseQuantiry(id: any): IIncreaseQuantityCartActionType {
    return { type: INCREASE_QUANTITY, id: id };
}

export function decreaseQuantiry(id: any): IDecreaseQuantityCartActionType {
    return { type: DECREASE_QUANTITY, id: id };
}

export function changeSelectedCart(cart: ICart): IChangeSelectedCartActionType {
    return { type: CHANGE_CART_PENDING_EDIT, cart: cart };
}

export function clearSelectedCart(): IClearSelectedCartActionType {
    return { type: CLEAR_CART_PENDING_EDIT };
}

export function setModificationState(value: CartModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCartActionType { type: string, cart: ICart };
interface IEditCartActionType { type: string, cart: ICart };
interface IRemoveCartActionType { type: string, id: any };
interface IChangeSelectedCartActionType { type: string, cart: ICart };
interface IIncreaseQuantityCartActionType {type: string, id: any};
interface IDecreaseQuantityCartActionType {type: string, id: any};
interface IClearSelectedCartActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CartModificationStatus};
interface IRemoveCartAllActionType { type: string }
interface IInitialCartActionType {type: string, cart: ICart}