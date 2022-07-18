import { IActionBase } from "../models/root.interface";
import { IAccount } from "../models/account.interface";
import { LOG_IN, LOG_OUT } from "../actions/account.actions";

const initialState: IAccount = {
    username: ""
};

function accountReducer(state: IAccount = initialState, action: IActionBase): IAccount {
    switch (action.type) {
        case LOG_IN: {
            return { ...state, username: (action.username)};
        }
        case LOG_OUT: {
            return { ...state, username: ""};
        }
        default:
            return state;
    }
}


export default accountReducer;