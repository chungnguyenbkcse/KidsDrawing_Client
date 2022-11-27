import { ISectionTemplateState, IActionBase } from "../models/root.interface";
import { ADD_SECTION_TEMPLATE, CHANGE_SECTION_TEMPLATE_PENDING_EDIT, EDIT_SECTION_TEMPLATE, REMOVE_SECTION_TEMPLATE,
    CLEAR_SECTION_TEMPLATE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_SECTION_TEMPLATE, REMOVE_SECTION_TEMPLATE_ALL} from "../actions/section_template.action";
import { ISectionTemplate, SectionTemplateModificationStatus } from "../models/section_template.interface";



const initialState: ISectionTemplateState = {
    modificationState: SectionTemplateModificationStatus.None,
    selectedSectionTemplate: null,
    sectionTemplates: []
};

function sectionTemplatesReducer(state: ISectionTemplateState = initialState, action: IActionBase): ISectionTemplateState {
    switch (action.type) {
        case INITIAL_SECTION_TEMPLATE: {
            return { ...state, sectionTemplates : [...state.sectionTemplates, action.section_template]};
        }
        case ADD_SECTION_TEMPLATE: {
            return { ...state, sectionTemplates: [...state.sectionTemplates, action.section_template]};
        }
        case EDIT_SECTION_TEMPLATE: {
            const foundIndex: number = state.sectionTemplates.findIndex(pr => pr.id === action.section_template.id);
            let sectionTemplates: ISectionTemplate[] = state.sectionTemplates;
            sectionTemplates[foundIndex] = action.section_template;
            return { ...state, sectionTemplates: sectionTemplates };
        }
        case REMOVE_SECTION_TEMPLATE: {
            return { ...state, sectionTemplates: state.sectionTemplates.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SECTION_TEMPLATE_ALL: {
            return { ...state, sectionTemplates: [] };
        }
        case CHANGE_SECTION_TEMPLATE_PENDING_EDIT: {
            return { ...state, selectedSectionTemplate: action.section_template };
        }
        case CLEAR_SECTION_TEMPLATE_PENDING_EDIT: {
            return { ...state, selectedSectionTemplate: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default sectionTemplatesReducer;