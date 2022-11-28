import { ISectionTeacherState, IActionBase } from "../models/root.interface";
import { ADD_SECTION_TEACHER, CHANGE_SECTION_TEACHER_PENDING_EDIT, EDIT_SECTION_TEACHER, REMOVE_SECTION_TEACHER,
    CLEAR_SECTION_TEACHER_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_SECTION_TEACHER, REMOVE_SECTION_TEACHER_ALL} from "../actions/section_teacher.action";
import { ISectionTeacher, SectionTeacherModificationStatus } from "../models/section_teacher.interface";



const initialState: ISectionTeacherState = {
    modificationState: SectionTeacherModificationStatus.None,
    selectedSectionTeacher: null,
    sections: []
};

function section_teachersReducer(state: ISectionTeacherState = initialState, action: IActionBase): ISectionTeacherState {
    switch (action.type) {
        case INITIAL_SECTION_TEACHER: {
            return { ...state, sections : [...state.sections, action.section_teacher]};
        }
        case ADD_SECTION_TEACHER: {
            return { ...state, sections: [...state.sections, action.section_teacher]};
        }
        case EDIT_SECTION_TEACHER: {
            const foundIndex: number = state.sections.findIndex(pr => pr.id === action.section_teacher.id);
            let section: ISectionTeacher[] = state.sections;
            section[foundIndex] = action.section_teacher;
            return { ...state, sections: section };
        }
        case REMOVE_SECTION_TEACHER: {
            return { ...state, sections: state.sections.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_SECTION_TEACHER_ALL: {
            return { ...state, sections: [] };
        }
        case CHANGE_SECTION_TEACHER_PENDING_EDIT: {
            return { ...state, selectedSectionTeacher: action.section_teacher };
        }
        case CLEAR_SECTION_TEACHER_PENDING_EDIT: {
            return { ...state, selectedSectionTeacher: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default section_teachersReducer;