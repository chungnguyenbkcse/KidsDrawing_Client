import { ITeacherState, IActionBase } from "../models/root.interface";
import {
    ADD_TEACHER, CHANGE_TEACHER_PENDING_EDIT, EDIT_TEACHER, REMOVE_TEACHER,
    CLEAR_TEACHER_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_TEACHER_AMOUNT
} from "../actions/teacher.action";
import { ITeacher, TeacherModificationStatus } from "../models/teacher.interface";



const initialState: ITeacherState = {
    modificationState: TeacherModificationStatus.None,
    selectedTeacher: null,
    teachers: [{
        id: 1, username: "chungnguyen", first_name: "Chung", last_name: "Nguyen", status: true, request_level: 2, level: [
            {
                'art_type': 'Chì màu',
                'art_level': '4-6 tuổi'
            },
            {
                'art_type': 'Chì màu',
                'art_level': '6-10 tuổi'
            }
        ]
    }]
};

function teachersReducer(state: ITeacherState = initialState, action: IActionBase): ITeacherState {
    switch (action.type) {
        case ADD_TEACHER: {
            let maxId: number = Math.max.apply(Math, state.teachers.map(function (o) { return o.id; }));
            action.teacher.id = maxId + 1;
            return { ...state, teachers: [...state.teachers, action.teacher] };
        }
        case EDIT_TEACHER: {
            const foundIndex: number = state.teachers.findIndex(pr => pr.id === action.teacher.id);
            let teachers: ITeacher[] = state.teachers;
            teachers[foundIndex] = action.teacher;
            return { ...state, teachers: teachers };
        }
        case REMOVE_TEACHER: {
            return { ...state, teachers: state.teachers.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_TEACHER_PENDING_EDIT: {
            return { ...state, selectedTeacher: action.teacher };
        }
        case CLEAR_TEACHER_PENDING_EDIT: {
            return { ...state, selectedTeacher: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_TEACHER_AMOUNT: {
            const foundIndex: number = state.teachers.findIndex(pr => pr.id === action.id);
            let teachers: ITeacher[] = state.teachers;
            return { ...state, teachers: teachers };
        }
        default:
            return state;
    }
}


export default teachersReducer;