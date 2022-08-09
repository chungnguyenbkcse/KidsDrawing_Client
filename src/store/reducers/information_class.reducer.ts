import { IInformationClassState, IActionBase } from "../models/root.interface";
import { ADD_INFORMATION_CLASS, CHANGE_INFORMATION_CLASS_PENDING_EDIT, EDIT_INFORMATION_CLASS, REMOVE_INFORMATION_CLASS,
    CLEAR_INFORMATION_CLASS_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_INFORMATION_CLASS, REMOVE_INFORMATION_CLASS_ALL} from "../actions/information_class.action";
import { IInformationClass, InformationClassModificationStatus } from "../models/information_class.interface";



const initialState: IInformationClassState = {
    modificationState: InformationClassModificationStatus.None,
    selectedInformationClass: null,
    informationClasses: [{
        id: 1,
        name: "",
        teacher: "",
        security_code: "",
        course: "",
        art_age: "",
        art_level: "",
        art_type: "",
        number_section: 0,
        number_student: 0
    }]
};

function informationClassesReducer(state: IInformationClassState = initialState, action: IActionBase): IInformationClassState {
    switch (action.type) {
        case INITIAL_INFORMATION_CLASS: {
            return { ...state, informationClasses : [...state.informationClasses, action.information_class]};
        }
        case ADD_INFORMATION_CLASS: {
            return { ...state, informationClasses: [...state.informationClasses, action.information_class]};
        }
        case EDIT_INFORMATION_CLASS: {
            const foundIndex: number = state.informationClasses.findIndex(pr => pr.id === action.information_class.id);
            let informationClasses: IInformationClass[] = state.informationClasses;
            informationClasses[foundIndex] = action.information_class;
            return { ...state, informationClasses: informationClasses };
        }
        case REMOVE_INFORMATION_CLASS: {
            return { ...state, informationClasses: state.informationClasses.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_INFORMATION_CLASS_ALL: {
            return { ...state, informationClasses: [] };
        }
        case CHANGE_INFORMATION_CLASS_PENDING_EDIT: {
            return { ...state, selectedInformationClass: action.information_class };
        }
        case CLEAR_INFORMATION_CLASS_PENDING_EDIT: {
            return { ...state, selectedInformationClass: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default informationClassesReducer;