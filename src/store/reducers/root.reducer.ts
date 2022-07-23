import { combineReducers, Reducer } from "redux";
import { UPDATE_CURRENT_PATH } from "../actions/root.actions";
import { IRootStateType, IActionBase, IStateType } from "../models/root.interface";
import productsReducer from "./products.reducer";
import notificationReducer from "./notification.reducer";
import userReducer from "./users.reducer";
import orderReducer from "./order.reducer";
import accountReducer from "./account.reducer";
import semestersReducer from "./semester.reducer";
import lessonsReducer from "./lesson.reducer";
import schedulesReducer from "./schedule.reducer";
import schedule_itemsReducer from "./schedule_item.reducer";
import artTypesReducer from "./art_type.reducer";
import artLevelsReducer from "./art_level.reducer";
import artAgesReducer from "./art_age.reducer";
import coursesReducer from "./course.reducer";
import semesterCoursesReducer from "./semester_course.reducer";


const initialState: IRootStateType = {
    page: {area: "Trang chủ", subArea: ""}
};

function rootReducer(state: IRootStateType = initialState, action: IActionBase): IRootStateType {
    switch (action.type) {
        case UPDATE_CURRENT_PATH:
            return { ...state, page: {area: action.area, subArea: action.subArea}};
        default:
            return state;
    }
}

const rootReducers: Reducer<IStateType> = combineReducers({root: rootReducer,
    products: productsReducer,
    notifications: notificationReducer,
    users: userReducer,
    orders: orderReducer,
    account: accountReducer,
    semesters: semestersReducer,
    lessons: lessonsReducer,
    schedules: schedulesReducer,
    schedule_items: schedule_itemsReducer,
    art_types: artTypesReducer,
    art_levels: artLevelsReducer,
    art_ages: artAgesReducer,
    courses: coursesReducer,
    semester_courses: semesterCoursesReducer
});



export default rootReducers;