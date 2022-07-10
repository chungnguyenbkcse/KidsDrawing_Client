import { combineReducers, Reducer } from "redux";
import { UPDATE_CURRENT_PATH } from "../actions/root.actions";
import { IRootStateType, IActionBase, IStateType } from "../models/root.interface";
import productsReducer from "./products.reducer";
import notificationReducer from "./notification.reducer";
import userReducer from "./users.reducer";
import orderReducer from "./order.reducer";
import accountReducer from "./account.reducer";
import teachersReducer from "./teacher.reducer";


const initialState: IRootStateType = {
    page: {area: "Trang chủ", subArea: ""}
};

function rootReducer(state: IRootStateType = initialState, action: IActionBase): IRootStateType {
    switch (action.type) {
        case UPDATE_CURRENT_PATH:
            return { ...state, page: {area: action.area, subArea: action.subArea}};
        default:
            return state;
    }
}

const rootReducers: Reducer<IStateType> = combineReducers({root: rootReducer,
    products: productsReducer,
    notifications: notificationReducer,
    users: userReducer,
    orders: orderReducer,
    account: accountReducer,
    teachers: teachersReducer
});



export default rootReducers;