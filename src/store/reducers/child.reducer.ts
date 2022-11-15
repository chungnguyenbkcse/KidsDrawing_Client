import { IChildState, IActionBase } from "../models/root.interface";
import { ADD_CHILD, CHANGE_CHILD_PENDING_EDIT, EDIT_CHILD, REMOVE_CHILD,
    CLEAR_CHILD_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CHILD, REMOVE_CHILD_ALL} from "../actions/child.action";
import { IChild, ChildModificationStatus } from "../models/child.interface";



const initialState: IChildState = {
    modificationState: ChildModificationStatus.None,
    selectedChild: null,
    childs: []
};

function childsReducer(state: IChildState = initialState, action: IActionBase): IChildState {
    switch (action.type) {
        case INITIAL_CHILD: {
            return { ...state, childs : [...state.childs, action.child]};
        }
        case ADD_CHILD: {
            return { ...state, childs: [...state.childs, action.child]};
        }
        case EDIT_CHILD: {
            const foundIndex: number = state.childs.findIndex(pr => pr.id === action.child.id);
            let childs: IChild[] = state.childs;
            childs[foundIndex] = action.child;
            return { ...state, childs: childs };
        }
        case REMOVE_CHILD: {
            return { ...state, childs: state.childs.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CHILD_ALL: {
            return { ...state, childs: [] };
        }
        case CHANGE_CHILD_PENDING_EDIT: {
            return { ...state, selectedChild: action.child };
        }
        case CLEAR_CHILD_PENDING_EDIT: {
            return { ...state, selectedChild: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default childsReducer;