import { IChildsClassState, IActionBase } from "../models/root.interface";
import { ADD_CHILDS_CLASS, CHANGE_CHILDS_CLASS_PENDING_EDIT, EDIT_CHILDS_CLASS, REMOVE_CHILDS_CLASS,
    CLEAR_CHILDS_CLASS_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CHILDS_CLASS, REMOVE_CHILDS_CLASS_ALL} from "../actions/childs_class.action";
import { IChildsClass, ChildsClassModificationStatus } from "../models/childs_class.interface";



const initialState: IChildsClassState = {
    modificationState: ChildsClassModificationStatus.None,
    selectedChildsClass: null,
    childs_class: []
};

function childs_classReducer(state: IChildsClassState = initialState, action: IActionBase): IChildsClassState {
    switch (action.type) {
        case INITIAL_CHILDS_CLASS: {
            return { ...state, childs_class : [...state.childs_class, action.childs_class]};
        }
        case ADD_CHILDS_CLASS: {
            return { ...state, childs_class: [...state.childs_class, action.childs_class]};
        }
        case EDIT_CHILDS_CLASS: {
            const foundIndex: number = state.childs_class.findIndex(pr => pr.student_id === action.childs_class.id);
            let childs_class: IChildsClass[] = state.childs_class;
            childs_class[foundIndex] = action.childs_class;
            return { ...state, childs_class: childs_class };
        }
        case REMOVE_CHILDS_CLASS: {
            return { ...state, childs_class: state.childs_class.filter(pr => pr.student_id !== action.id) };
        }
        case REMOVE_CHILDS_CLASS_ALL: {
            return { ...state, childs_class: [] };
        }
        case CHANGE_CHILDS_CLASS_PENDING_EDIT: {
            return { ...state, selectedChildsClass: action.childs_class };
        }
        case CLEAR_CHILDS_CLASS_PENDING_EDIT: {
            return { ...state, selectedChildsClass: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default childs_classReducer;