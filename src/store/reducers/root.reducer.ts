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
import turnoversReducer from "./turnover.reducer";
import report_usersReducer from "./report_user.reducer";
import course_reportsReducer from "./course_report.reducer";
import exercise_levelsReducer from "./exercise_level.reducer";
import user_grade_exercise_submissionsReducer from "./user_grade_exercise_submission.reducer";
import exerciseStudentsReducer from "./exercise_student.reducer";
import tutorialsReducer from "./tutorial.reducer";
import userGradeContestSubmissionsReducer from "./user_grade_contest_submission.reducer";
import user_register_tutorial_pagesReducer from "./user_register_tutorial_page.reducer";
import userRegisterTutorialReducer from "./user_register_tutorial.reducer";
import contestSubmissionsReducer from "./contest_submission.reducer";
import schedule_time_classsReducer from "./schedule_time_class.reducer";
import notify_dbsReducer from "./notify_db.reducer";
import userReadNotificationsReducer from "./user_read_notification.reducer";
import notifysReducer from "./notify.reducer";
import classes_studentsReducer from "./classes_student.reducer";
import classesParentsReducer from "./classes_parent.reducer";
import courseParentsReducer from "./course_parent.reducer";
import contestStudentsReducer from "./contest_student.reducer";
import cartReducer from "./cart.reducer";
import attendancesReducer from "./attendance.reducer";
import profilesReducer from "./profile.reducer";
import user_register_join_semestersReducer from "./user_register_join_semester.reducer";
import courseStudentsReducer from "./course_student.reducer";
import course_newsReducer from "./course_new.reducer";
import semesterClassStudentReducer from "./semester_class_student.reducer";
import class_has_register_join_semestersReducer from "./class_has_register_join_semester.reducer";
import course_parent_newsReducer from "./course_parent_new.reducer";
import semesterClassParentReducer from "./semester_class_parent.reducer";


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
    user_register_join_semesters: user_register_join_semestersReducer,
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
    exercise_submissions: exerciseSubmissionsReducer,
    turnovers: turnoversReducer,
    report_users: report_usersReducer,
    course_reports: course_reportsReducer,
    exercise_levels: exercise_levelsReducer,
    user_grade_exercise_submissions: user_grade_exercise_submissionsReducer,
    exercise_students: exerciseStudentsReducer,
    tutorials: tutorialsReducer,
    user_grade_contest_submissions: userGradeContestSubmissionsReducer,
    user_register_tutorial_pages: user_register_tutorial_pagesReducer,
    user_register_tutorials: userRegisterTutorialReducer,
    contest_submissions: contestSubmissionsReducer,
    schedule_time_classes: schedule_time_classsReducer,
    notify_dbs: notify_dbsReducer,
    user_read_notifications: userReadNotificationsReducer,
    notifys: notifysReducer,
    classes_students: classes_studentsReducer,
    classes_parents: classesParentsReducer,
    course_parents: courseParentsReducer,
    contest_students: contestStudentsReducer,
    carts: cartReducer,
    attendances: attendancesReducer,
    profiles: profilesReducer,
    course_students: courseStudentsReducer,
    course_news: course_newsReducer,
    semester_class_student: semesterClassStudentReducer,
    class_has_register_join_semesters: class_has_register_join_semestersReducer,
    course_parent_news: course_parent_newsReducer,
    semester_class_parent: semesterClassParentReducer,
});



export default rootReducers;