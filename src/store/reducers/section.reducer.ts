import { ISectionState, IActionBase } from "../models/root.interface";
import { ADD_SECTION, CHANGE_SECTION_PENDING_EDIT, EDIT_SECTION, REMOVE_SECTION,
    CLEAR_SECTION_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_SECTION, REMOVE_SECTION_ALL} from "../actions/section.action";
import { ISection, SectionModificationStatus } from "../models/section.interface";



const initialState: ISectionState = {
    modificationState: SectionModificationStatus.None,
    selectedSection: null,
    sections: []
};

function sectionsReducer(state: ISectionState = initialState, action: IActionBase): ISectionState {
    switch (action.type) {
        case INITIAL_SECTION: {
            return { ...state, sections : [...state.sections, action.section]};
        }
        case ADD_SECTION: {
            return { ...state, sections: [...state.sections, action.section]};
        }
        case EDIT_SECTION: {
            const foundIndex: number = state.sections.findIndex(pr => pr.id === action.section.id);
            let sections: ISection[] = state.sections;
            sections[foundIndex] = action.section;
            return { ...state, sections: sections };
        }
        case REMOVE_SECTION: {
            return { ...state, sections: state.sections.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SECTION_ALL: {
            return { ...state, sections: [] };
        }
        case CHANGE_SECTION_PENDING_EDIT: {
            return { ...state, selectedSection: action.section };
        }
        case CLEAR_SECTION_PENDING_EDIT: {
            return { ...state, selectedSection: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default sectionsReducer;