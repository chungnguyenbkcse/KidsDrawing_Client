import { IOrdersState, IActionBase } from "../models/root.interface";
import { ADD_ORDER } from "../actions/orders.actions";


const initialState: IOrdersState = {
    orders: []
};

function orderReducer(state: IOrdersState = initialState, action: IActionBase): IOrdersState {
    switch (action.type) {
        case ADD_ORDER: {
            return {...state, orders: [...state.orders, {...action.order}]};
        }
        default:
            return state;
    }
}


export default orderReducer;