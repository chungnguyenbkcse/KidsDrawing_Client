import { IArtLevelState, IActionBase } from "../models/root.interface";
import { ADD_ART_LEVEL, CHANGE_ART_LEVEL_PENDING_EDIT, EDIT_ART_LEVEL, REMOVE_ART_LEVEL,
    CLEAR_ART_LEVEL_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_ART_LEVEL, REMOVE_ART_LEVEL_ALL} from "../actions/art_level.action";
import { IArtLevel, ArtLevelModificationStatus } from "../models/art_level.interface";



const initialState: IArtLevelState = {
    modificationState: ArtLevelModificationStatus.None,
    selectedArtLevel: null,
    artLevels: []
};

function artLevelsReducer(state: IArtLevelState = initialState, action: IActionBase): IArtLevelState {
    switch (action.type) {
        case INITIAL_ART_LEVEL: {
            return { ...state, artLevels : [...state.artLevels, action.art_level]};
        }
        case ADD_ART_LEVEL: {
            return { ...state, artLevels: [...state.artLevels, action.art_level]};
        }
        case EDIT_ART_LEVEL: {
            const foundIndex: number = state.artLevels.findIndex(pr => pr.id === action.art_level.id);
            let artLevels: IArtLevel[] = state.artLevels;
            artLevels[foundIndex] = action.art_level;
            return { ...state, artLevels: artLevels };
        }
        case REMOVE_ART_LEVEL: {
            return { ...state, artLevels: state.artLevels.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_ART_LEVEL_ALL: {
            return { ...state, artLevels: [] };
        }
        case CHANGE_ART_LEVEL_PENDING_EDIT: {
            return { ...state, selectedArtLevel: action.art_level };
        }
        case CLEAR_ART_LEVEL_PENDING_EDIT: {
            return { ...state, selectedArtLevel: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default artLevelsReducer;