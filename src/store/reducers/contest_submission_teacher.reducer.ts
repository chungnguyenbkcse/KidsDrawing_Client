import { IContestSubmissionTeacherState, IActionBase } from "../models/root.interface";
import { ADD_CONTEST_SUBMISSION_TEACHER_NOT_GRADED, CHANGE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT, EDIT_CONTEST_SUBMISSION_TEACHER_NOT_GRADED, REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED,
    CLEAR_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_CONTEST_SUBMISSION_TEACHER_NOT_GRADED, REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_ALL, INITIAL_CONTEST_SUBMISSION_TEACHER_GRADED, ADD_CONTEST_SUBMISSION_TEACHER_GRADED, EDIT_CONTEST_SUBMISSION_TEACHER_GRADED, REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED, REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED_ALL, CHANGE_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT, CLEAR_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT} from "../actions/contest_submission_teacher.action";
import { IContestSubmissionTeacher, ContestSubmissionTeacherModificationStatus } from "../models/contest_submission_teacher.interface";



const initialState: IContestSubmissionTeacherState = {
    modificationState: ContestSubmissionTeacherModificationStatus.None,
    selectedContestSubmissionTeacher: null,
    contest_submission_not_grade: [],
    contest_submission_grade: []
};

function contestSubmissionTeachersReducer(state: IContestSubmissionTeacherState = initialState, action: IActionBase): IContestSubmissionTeacherState {
    switch (action.type) {
        case INITIAL_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: {
            return { ...state, contest_submission_not_grade : [...state.contest_submission_not_grade, action.contest_submission_teacher]};
        }
        case ADD_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: {
            return { ...state, contest_submission_not_grade: [...state.contest_submission_not_grade, action.contest_submission_teacher]};
        }
        case EDIT_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: {
            const foundIndex: number = state.contest_submission_not_grade.findIndex(pr => pr.id === action.contest_submission_teacher.id);
            let contest_submission_not_grade: IContestSubmissionTeacher[] = state.contest_submission_not_grade;
            contest_submission_not_grade[foundIndex] = action.contest_submission_teacher;
            return { ...state, contest_submission_not_grade: contest_submission_not_grade };
        }
        case REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED: {
            return { ...state, contest_submission_not_grade: state.contest_submission_not_grade.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_ALL: {
            return { ...state, contest_submission_not_grade: [] };
        }
        case CHANGE_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmissionTeacher: action.contest_submission_teacher };
        }
        case CLEAR_CONTEST_SUBMISSION_TEACHER_NOT_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmissionTeacher: null };
        }

        case INITIAL_CONTEST_SUBMISSION_TEACHER_GRADED: {
            return { ...state, contest_submission_grade : [...state.contest_submission_grade, action.contest_submission_teacher]};
        }
        case ADD_CONTEST_SUBMISSION_TEACHER_GRADED: {
            return { ...state, contest_submission_grade: [...state.contest_submission_grade, action.contest_submission_teacher]};
        }
        case EDIT_CONTEST_SUBMISSION_TEACHER_GRADED: {
            const foundIndex: number = state.contest_submission_grade.findIndex(pr => pr.id === action.contest_submission_teacher.id);
            let contest_submission_grade: IContestSubmissionTeacher[] = state.contest_submission_grade;
            contest_submission_grade[foundIndex] = action.contest_submission_teacher;
            return { ...state, contest_submission_grade: contest_submission_grade };
        }
        case REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED: {
            return { ...state, contest_submission_grade: state.contest_submission_grade.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_CONTEST_SUBMISSION_TEACHER_GRADED_ALL: {
            return { ...state, contest_submission_grade: [] };
        }
        case CHANGE_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmissionTeacher: action.contest_submission_teacher };
        }
        case CLEAR_CONTEST_SUBMISSION_TEACHER_GRADED_PENDING_EDIT: {
            return { ...state, selectedContestSubmissionTeacher: null };
        }

        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default contestSubmissionTeachersReducer;