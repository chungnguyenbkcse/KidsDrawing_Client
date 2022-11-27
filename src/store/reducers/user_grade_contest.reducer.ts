import { IUserGradeContestState, IActionBase } from "../models/root.interface";
import { ADD_TUTORIAL_TEMPLATE, CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT, EDIT_TUTORIAL_TEMPLATE, REMOVE_TUTORIAL_TEMPLATE,
    CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_TUTORIAL_TEMPLATE, REMOVE_TUTORIAL_TEMPLATE_ALL} from "../actions/user_grade_contest.action";
import { IUserGradeContest, UserGradeContestModificationStatus } from "../models/user_grade_contest.interface";



const initialState: IUserGradeContestState = {
    modificationState: UserGradeContestModificationStatus.None,
    selectedUserGradeContest: null,
    userGradeContests: []
};

function userGradeContestsReducer(state: IUserGradeContestState = initialState, action: IActionBase): IUserGradeContestState {
    switch (action.type) {
        case INITIAL_TUTORIAL_TEMPLATE: {
            return { ...state, userGradeContests : [...state.userGradeContests, action.user_grade_contest]};
        }
        case ADD_TUTORIAL_TEMPLATE: {
            return { ...state, userGradeContests: [...state.userGradeContests, action.user_grade_contest]};
        }
        case EDIT_TUTORIAL_TEMPLATE: {
            const foundIndex: number = state.userGradeContests.findIndex(pr => pr.id === action.user_grade_contest.id);
            let userGradeContests: IUserGradeContest[] = state.userGradeContests;
            userGradeContests[foundIndex] = action.user_grade_contest;
            return { ...state, userGradeContests: userGradeContests };
        }
        case REMOVE_TUTORIAL_TEMPLATE: {
            return { ...state, userGradeContests: state.userGradeContests.filter(pr => pr.id !== action.id) };
        }
        case REMOVE_TUTORIAL_TEMPLATE_ALL: {
            return { ...state, userGradeContests: [] };
        }
        case CHANGE_TUTORIAL_TEMPLATE_PENDING_EDIT: {
            return { ...state, selectedUserGradeContest: action.user_grade_contest };
        }
        case CLEAR_TUTORIAL_TEMPLATE_PENDING_EDIT: {
            return { ...state, selectedUserGradeContest: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default userGradeContestsReducer;