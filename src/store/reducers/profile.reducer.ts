import { IProfileState, IActionBase } from "../models/root.interface";
import { ADD_PROFILE, CHANGE_PROFILE_PENDING_EDIT, EDIT_PROFILE, REMOVE_PROFILE,
    CLEAR_PROFILE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_PROFILE, REMOVE_PROFILE_ALL} from "../actions/profile.action";
import { IProfile, ProfileModificationStatus } from "../models/profile.interface";



const initialState: IProfileState = {
    modificationState: ProfileModificationStatus.None,
    selectedProfile: null,
    profiles: []
};

function profilesReducer(state: IProfileState = initialState, action: IActionBase): IProfileState {
    switch (action.type) {
        case INITIAL_PROFILE: {
            return { ...state, profiles : [...state.profiles, action.profile]};
        }
        case ADD_PROFILE: {
            return { ...state, profiles: [...state.profiles, action.profile]};
        }
        case EDIT_PROFILE: {
            const foundIndex: number = state.profiles.findIndex(pr => pr.id === action.profile.id);
            let profiles: IProfile[] = state.profiles;
            profiles[foundIndex] = action.profile;
            return { ...state, profiles: profiles };
        }
        case REMOVE_PROFILE: {
            return { ...state, profiles: state.profiles.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_PROFILE_ALL: {
            return { ...state, profiles: [] };
        }
        case CHANGE_PROFILE_PENDING_EDIT: {
            return { ...state, selectedProfile: action.profile };
        }
        case CLEAR_PROFILE_PENDING_EDIT: {
            return { ...state, selectedProfile: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default profilesReducer;