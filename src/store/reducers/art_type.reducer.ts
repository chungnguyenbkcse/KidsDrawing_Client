import { IArtTypeState, IActionBase } from "../models/root.interface";
import { ADD_ART_TYPE, CHANGE_ART_TYPE_PENDING_EDIT, EDIT_ART_TYPE, REMOVE_ART_TYPE,
    CLEAR_ART_TYPE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_ART_TYPE, REMOVE_ART_TYPE_ALL} from "../actions/art_type.action";
import { IArtType, ArtTypeModificationStatus } from "../models/art_type.interface";



const initialState: IArtTypeState = {
    modificationState: ArtTypeModificationStatus.None,
    selectedArtType: null,
    artTypes: []
};

function artTypesReducer(state: IArtTypeState = initialState, action: IActionBase): IArtTypeState {
    switch (action.type) {
        case INITIAL_ART_TYPE: {
            return { ...state, artTypes : [...state.artTypes, action.artType]};
        }
        case ADD_ART_TYPE: {
            return { ...state, artTypes: [...state.artTypes, action.artType]};
        }
        case EDIT_ART_TYPE: {
            const foundIndex: number = state.artTypes.findIndex(pr => pr.id === action.artType.id);
            let artTypes: IArtType[] = state.artTypes;
            artTypes[foundIndex] = action.artType;
            return { ...state, artTypes: artTypes };
        }
        case REMOVE_ART_TYPE: {
            return { ...state, artTypes: state.artTypes.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_ART_TYPE_ALL: {
            return { ...state, artTypes: [] };
        }
        case CHANGE_ART_TYPE_PENDING_EDIT: {
            return { ...state, selectedArtType: action.artType };
        }
        case CLEAR_ART_TYPE_PENDING_EDIT: {
            return { ...state, selectedArtType: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default artTypesReducer;