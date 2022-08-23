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
import courseTeachersReducer from "./course_teacher.reducer";
import time_schedule_teachersReducer from "./time_schedule_teacher.reducer";
import classTeachersReducer from "./class_teacher.reducer";
import contestTeachersReducer from "./contest_teacher.reducer";
import semesterClassesReducer from "./semester_class.reducer";
import anonymousNotificationsReducer from "./anonymous_notification.reducer";
import sectionsReducer from "./section.reducer";
import tutorialPagesReducer from "./tutorial_page.reducer";
import exercisesReducer from "./exercise.reducer";
import exerciseSubmissionsReducer from "./exercise_submission.reducer";


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
    semester_classes: semesterClassesReducer,
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
    course_teachers: courseTeachersReducer,
    time_schedule_teachers: time_schedule_teachersReducer,
    class_teachers: classTeachersReducer,
    contest_teachers: contestTeachersReducer,
    anonymous_notifications: anonymousNotificationsReducer,
    sections: sectionsReducer,
    tutorial_pages: tutorialPagesReducer,
    exercises: exercisesReducer,
    exercise_submissions: exerciseSubmissionsReducer
});



export default rootReducers;