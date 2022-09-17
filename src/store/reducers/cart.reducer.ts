import { ICartState, IActionBase } from "../models/root.interface";
import { ADD_CART, CHANGE_CART_PENDING_EDIT, EDIT_CART, REMOVE_CART,
    CLEAR_CART_PENDING_EDIT, SET_MODIFICATION_STATE, INCREASE_QUANTITY, DECREASE_QUANTITY} from "../actions/cart.action";
import { ICart, CartModificationStatus } from "../models/cart.interface";



const initialState: ICartState = {
    modificationState: CartModificationStatus.None,
    selectedCart: null,
    carts: []
};

function cartReducer(state: ICartState = initialState, action: IActionBase): ICartState {
    switch (action.type) {
        case ADD_CART: {
            return { ...state, carts: [...state.carts, action.cart]};
        }
        case EDIT_CART: {
            const foundIndex: number = state.carts.findIndex(pr => pr.id === action.cart.id);
            let cart: ICart[] = state.carts;
            cart[foundIndex] = action.cart;
            return { ...state, carts: cart };
        }
        case REMOVE_CART: {
            return { ...state, carts: state.carts.filter(pr => pr.id !== action.id) };
        }
        
        case INCREASE_QUANTITY: {
            const foundIndex: number = state.carts.findIndex(pr => pr.id === action.id);
            let cart: ICart[] = state.carts;
            cart[foundIndex].quantity += 1;
            return { ...state, carts: cart };
        }

        case DECREASE_QUANTITY: {
            const foundIndex: number = state.carts.findIndex(pr => pr.id === action.id);
            let cart: ICart[] = state.carts;
            cart[foundIndex].quantity -= 1;
            return { ...state, carts: cart };
        }

        case CHANGE_CART_PENDING_EDIT: {
            return { ...state, selectedCart: action.cart };
        }
        case CLEAR_CART_PENDING_EDIT: {
            return { ...state, selectedCart: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default cartReducer;