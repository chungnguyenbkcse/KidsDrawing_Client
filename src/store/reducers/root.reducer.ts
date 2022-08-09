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
import contestsReducer from "./contest.reducer";
import sectionTemplatesReducer from "./section_template.reducer";
import tutorialTemplatesReducer from "./tutorial_template.reducer";
import userGradeContestsReducer from "./user_grade_contest.reducer";
import tutorialTemplatePagesReducer from "./tutorial_template_page.reducer";
import teacherLeaveReducer from "./teacher_leave.reducer";
import studentLeaveReducer from "./student_leave.reducer";
import userRegisterJoinSemestersReducer from "./user_register_join_semester.reducer";
import myClassesReducer from "./my_class.reducer";
import teacher_register_quantificationsReducer from "./teacher_register_quantification.reducer";
import informationClassesReducer from "./information_class.reducer";
import time_schedulesReducer from "./time_schedule.reducer";


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
    semester_courses: semesterCoursesReducer,
    contests: contestsReducer,
    section_templates: sectionTemplatesReducer,
    tutorial_templates: tutorialTemplatesReducer,
    user_grade_contests: userGradeContestsReducer,
    tutorial_template_pages: tutorialTemplatePagesReducer,
    teacher_leaves: teacherLeaveReducer,
    student_leaves: studentLeaveReducer,
    user_register_join_semesters: userRegisterJoinSemestersReducer,
    myclasses: myClassesReducer,
    teacher_register_quantifications: teacher_register_quantificationsReducer,
    information_classes: informationClassesReducer,
    time_schedules: time_schedulesReducer,
});



export default rootReducers;