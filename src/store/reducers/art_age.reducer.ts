import { IArtAgeState, IActionBase } from "../models/root.interface";
import { ADD_ART_AGE, CHANGE_ART_AGE_PENDING_EDIT, EDIT_ART_AGE, REMOVE_ART_AGE,
    CLEAR_ART_AGE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_ART_AGE, REMOVE_ART_AGE_ALL} from "../actions/art_age.action";
import { IArtAge, ArtAgeModificationStatus } from "../models/art_age.interface";



const initialState: IArtAgeState = {
    modificationState: ArtAgeModificationStatus.None,
    selectedArtAge: null,
    artAges: []
};

function artAgesReducer(state: IArtAgeState = initialState, action: IActionBase): IArtAgeState {
    switch (action.type) {
        case INITIAL_ART_AGE: {
            return { ...state, artAges : [...state.artAges, action.art_age]};
        }
        case ADD_ART_AGE: {
            return { ...state, artAges: [...state.artAges, action.art_age]};
        }
        case EDIT_ART_AGE: {
            const foundIndex: number = state.artAges.findIndex(pr => pr.id === action.art_age.id);
            let artAges: IArtAge[] = state.artAges;
            artAges[foundIndex] = action.art_age;
            return { ...state, artAges: artAges };
        }
        case REMOVE_ART_AGE: {
            return { ...state, artAges: state.artAges.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_ART_AGE_ALL: {
            return { ...state, artAges: [] };
        }
        case CHANGE_ART_AGE_PENDING_EDIT: {
            return { ...state, selectedArtAge: action.art_age };
        }
        case CLEAR_ART_AGE_PENDING_EDIT: {
            return { ...state, selectedArtAge: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default artAgesReducer;