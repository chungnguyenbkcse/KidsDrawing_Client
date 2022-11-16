import { IFinalScoreChildState, IActionBase } from "../models/root.interface";
import { ADD_FINAL_SCORE_CHILD, CHANGE_FINAL_SCORE_CHILD_PENDING_EDIT, EDIT_FINAL_SCORE_CHILD, REMOVE_FINAL_SCORE_CHILD,
    CLEAR_FINAL_SCORE_CHILD_PENDING_EDIT, SET_MODIFICATION_STATE, INITIAL_FINAL_SCORE_CHILD, REMOVE_FINAL_SCORE_CHILD_ALL} from "../actions/final_score_child.action";
import { IFinalScoreChild, FinalScoreChildModificationStatus } from "../models/final_score_child.interface";



const initialState: IFinalScoreChildState = {
    modificationState: FinalScoreChildModificationStatus.None,
    selectedFinalScoreChild: null,
    final_score_childs: []
};

function final_score_childsReducer(state: IFinalScoreChildState = initialState, action: IActionBase): IFinalScoreChildState {
    switch (action.type) {
        case INITIAL_FINAL_SCORE_CHILD: {
            return { ...state, final_score_childs : [...state.final_score_childs, action.final_score_child]};
        }
        case ADD_FINAL_SCORE_CHILD: {
            return { ...state, final_score_childs: [...state.final_score_childs, action.final_score_child]};
        }
        case EDIT_FINAL_SCORE_CHILD: {
            const foundIndex: number = state.final_score_childs.findIndex(pr => pr.course_id === action.final_score_child.course_id);
            let final_score_childs: IFinalScoreChild[] = state.final_score_childs;
            final_score_childs[foundIndex] = action.final_score_child;
            return { ...state, final_score_childs: final_score_childs };
        }
        case REMOVE_FINAL_SCORE_CHILD: {
            return { ...state, final_score_childs: state.final_score_childs.filter(pr => pr.course_id !== action.course_id) };
        }
        case REMOVE_FINAL_SCORE_CHILD_ALL: {
            return { ...state, final_score_childs: [] };
        }
        case CHANGE_FINAL_SCORE_CHILD_PENDING_EDIT: {
            return { ...state, selectedFinalScoreChild: action.final_score_child };
        }
        case CLEAR_FINAL_SCORE_CHILD_PENDING_EDIT: {
            return { ...state, selectedFinalScoreChild: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        default:
            return state;
    }
}


export default final_score_childsReducer;