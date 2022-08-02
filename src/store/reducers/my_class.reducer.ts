import { IMyClassState, IActionBase } from "../models/root.interface";
import { ADD_MY_CLASS, CHANGE_MY_CLASS_PENDING_EDIT, EDIT_MY_CLASS, REMOVE_MY_CLASS,
    CLEAR_MY_CLASS_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_MY_CLASS, REMOVE_MY_CLASS_ALL} from "../actions/my_class.action";
import { IMyClass, MyClassModificationStatus } from "../models/my_class.interface";



const initialState: IMyClassState = {
    modificationState: MyClassModificationStatus.None,
    selectedMyClass: null,
    myClasses: []
};

function myClassesReducer(state: IMyClassState = initialState, action: IActionBase): IMyClassState {
    switch (action.type) {
        case INITIAL_MY_CLASS: {
            return { ...state, myClasses : [...state.myClasses, action.myclass]};
        }
        case ADD_MY_CLASS: {
            return { ...state, myClasses: [...state.myClasses, action.myclass]};
        }
        case EDIT_MY_CLASS: {
            const foundIndex: number = state.myClasses.findIndex(pr => pr.id === action.myclass.id);
            let myClasses: IMyClass[] = state.myClasses;
            myClasses[foundIndex] = action.myclass;
            return { ...state, myClasses: myClasses };
        }
        case REMOVE_MY_CLASS: {
            return { ...state, myClasses: state.myClasses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_MY_CLASS_ALL: {
            return { ...state, myClasses: [] };
        }
        case CHANGE_MY_CLASS_PENDING_EDIT: {
            return { ...state, selectedMyClass: action.myclass };
        }
        case CLEAR_MY_CLASS_PENDING_EDIT: {
            return { ...state, selectedMyClass: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default myClassesReducer;