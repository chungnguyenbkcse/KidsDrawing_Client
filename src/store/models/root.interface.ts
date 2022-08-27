import { IProduct, ProductModificationStatus } from "./product.interface";
import { INotification } from "./notification.interface";
import { IUser, UserModificationStatus } from "./user.interface";
import { IOrder } from "./order.interface";
import { IAccount } from "./account.interface";
import { ISemester, SemesterModificationStatus } from "./semester.interface";
import { ILesson, LessonModificationStatus } from "./lesson.interface";
import { IScheduleItem, ScheduleItemModificationStatus } from "./schedule_item.interface";
import { ISchedule, ScheduleModificationStatus } from "./schedule.interface";
import { ArtTypeModificationStatus, IArtType } from "./art_type.interface";
import { ArtLevelModificationStatus, IArtLevel } from "./art_level.interface";
import { ArtAgeModificationStatus, IArtAge } from "./art_age.interface";
import { ISemesterClass, SemesterClassModificationStatus } from "./semester_class.interface";
import { CourseModificationStatus, ICourse } from "./course.interface";
import { ContestModificationStatus, IContest } from "./contest.interface";
import { ISectionTemplate, SectionTemplateModificationStatus } from "./section_template.interface";
import { ITutorialTemplate, TutorialTemplateModificationStatus } from "./tutorial_template.interface";
import { IUserGradeContest, UserGradeContestModificationStatus } from "./user_grade_contest.interface";
import { ITutorialTemplatePage, TutorialTemplatePageModificationStatus } from "./tutorial_template_page.interface";
import { ITeacherLeave, TeacherLeaveModificationStatus } from "./teacher_leave.interface";
import { IStudentLeave, StudentLeaveModificationStatus } from "./student_leave.interface";
import { IUserRegisterJoinSemester, UserRegisterJoinSemesterModificationStatus } from "./user_register_join_semester.interface";
import { IMyClass, MyClassModificationStatus } from "./my_class.interface";
import { ITeacherRegisterQuantification, TeacherRegisterQuantificationModificationStatus } from "./teacher_register_quantification.interface";
import { IInformationClass, InformationClassModificationStatus } from "./information_class.interface";
import { ITimeSchedule, TimeScheduleModificationStatus } from "./time_schedule.interface";
import { CourseTeacherModificationStatus, ICourseTeacher } from "./course_teacher.interface";
import { ITimeScheduleTeacher, TimeScheduleTeacherModificationStatus } from "./time_schedule_teacher.interface";
import { ClassTeacherModificationStatus, IClassTeacher } from "./class_teacher.interface";
import { ContestTeacherModificationStatus, IContestTeacher } from "./contest_teacher.interface";
import { AnonymousNotificationModificationStatus, IAnonymousNotification } from "./anonymous_notification.interface";
import { ISection, SectionModificationStatus } from "./section.interface";
import { ITutorialPage, TutorialPageModificationStatus } from "./tutorial_page.interface";
import { ExerciseModificationStatus, IExercise } from "./exercise.interface";
import { ExerciseSubmissionModificationStatus, IExerciseSubmission } from "./exercise_submission.interface";
import { ITurnover, TurnoverModificationStatus } from "./turnover.interface";
import { IReportUser, ReportUserModificationStatus } from "./report_user.interface";
import { CourseReportModificationStatus, ICourseReport } from "./course_report.interface";
import { ExerciseLevelModificationStatus, IExerciseLevel } from "./exercise_level.interface";
import { IUserGradeExerciseSubmission, UserGradeExerciseSubmissionModificationStatus } from "./user_grade_exercise_submission.interface";
import { ExerciseStudentModificationStatus, IExerciseStudent } from "./exercise_student.interface";
import { ITutorial, TutorialModificationStatus } from "./tutorial.interface";

export interface IRootPageStateType {
    area: string;
    subArea: string;
}

export interface IRootStateType {
    page: IRootPageStateType;
}
export interface IStateType {
    root: IRootStateType;
    products: IProductState;
    notifications: INotificationState;
    users: IUserState;
    orders: IOrdersState;
    account: IAccount;
    semesters: ISemesterState;
    lessons: ILessonState;
    schedules: IScheduleState;
    schedule_items: IScheduleItemState;
    art_types: IArtTypeState;
    art_levels: IArtLevelState;
    art_ages: IArtAgeState;
    courses: ICourseState;
    semester_classes: ISemesterClassState;
    contests: IContestState;
    section_templates: ISectionTemplateState;
    tutorial_templates: ITutorialTemplateState;
    user_grade_contests: IUserGradeContestState;
    tutorial_template_pages: ITutorialTemplatePageState;
    teacher_leaves: ITeacherLeaveState;
    student_leaves: IStudentLeaveState;
    user_register_join_semesters: IUserRegisterJoinSemesterState;
    myclasses: IMyClassState;
    teacher_register_quantifications: ITeacherRegisterQuantificationState;
    information_classes: IInformationClassState;
    time_schedules: ITimeScheduleState;
    course_teachers: ICourseTeacherState;
    time_schedule_teachers: ITimeScheduleTeacherState;
    class_teachers: IClassTeacherState;
    contest_teachers: IContestTeacherState;
    anonymous_notifications: IAnonymousNotificationState;
    sections: ISectionState;
    tutorial_pages: ITutorialPageState;
    exercises: IExerciseState;
    exercise_submissions: IExerciseSubmissionState;
    turnovers: ITurnoverState;
    report_users: IReportUserState;
    course_reports: ICourseReportState;
    exercise_levels: IExerciseLevelState;
    user_grade_exercise_submissions: IUserGradeExerciseSubmissionState;
    exercise_students: IExerciseStudentState;
    tutorials: ITutorialState;
}

export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct | null;
    modificationState: ProductModificationStatus;
}

export interface IActionBase {
    type: string;
    [prop: string]: any;
}

export interface IOrdersState {
    orders: IOrder[];
}

export interface INotificationState {
    notifications: INotification[];
}

export interface IUserState {
    selectedUser: IUser | null;
    modificationState: UserModificationStatus;
    admins: IUser[];
    teachers: IUser[];
    students: IUser[];
    parents: IUser[];
}

export interface ISemesterState {
    selectedSemester: ISemester | null;
    modificationState: SemesterModificationStatus;
    semesters: ISemester[];
}

export interface IExerciseLevelState {
    selectedExerciseLevel: IExerciseLevel | null;
    modificationState: ExerciseLevelModificationStatus;
    exercise_levels: IExerciseLevel[];
}

export interface ICourseReportState {
    selectedCourseReport: ICourseReport | null;
    modificationState: CourseReportModificationStatus;
    course_reports: ICourseReport[];
}

export interface IUserGradeExerciseSubmissionState {
    selectedUserGradeExerciseSubmission: IUserGradeExerciseSubmission | null;
    modificationState: UserGradeExerciseSubmissionModificationStatus;
    user_grade_exercise_submissions: IUserGradeExerciseSubmission[];
}

export interface IReportUserState {
    selectedReportUser: IReportUser | null;
    modificationState: ReportUserModificationStatus;
    report_users: IReportUser[];
}

export interface IExerciseState {
    selectedExercise: IExercise | null;
    modificationState: ExerciseModificationStatus;
    exercises: IExercise[];
}

export interface ILessonState {
    selectedLesson: ILesson | null;
    modificationState: LessonModificationStatus;
    lessons: ILesson[];
}

export interface IScheduleItemState {
    selectedScheduleItem: IScheduleItem | null;
    modificationState: ScheduleItemModificationStatus;
    schedule_items: IScheduleItem[];
}

export interface IScheduleState {
    selectedSchedule: ISchedule | null;
    modificationState: ScheduleModificationStatus;
    schedules: ISchedule[];
}

export interface IArtTypeState {
    selectedArtType: IArtType | null;
    modificationState: ArtTypeModificationStatus;
    artTypes: IArtType[];
}

export interface IArtLevelState {
    selectedArtLevel: IArtLevel | null;
    modificationState: ArtLevelModificationStatus;
    artLevels: IArtLevel[];
}

export interface IArtAgeState {
    selectedArtAge: IArtAge | null;
    modificationState: ArtAgeModificationStatus;
    artAges: IArtAge[];
}

export interface ISemesterClassState {
    selectedSemesterClass: ISemesterClass | null;
    modificationState: SemesterClassModificationStatus;
    semesterClasses: ISemesterClass[];
}

export interface ICourseState {
    selectedCourse: ICourse | null;
    modificationState: CourseModificationStatus;
    courses: ICourse[];
}

export interface IContestState {
    selectedContest: IContest | null;
    modificationState: ContestModificationStatus;
    contests: IContest[];
}

export interface ISectionTemplateState {
    selectedSectionTemplate: ISectionTemplate | null;
    modificationState: SectionTemplateModificationStatus;
    sectionTemplates: ISectionTemplate[];
}

export interface ITutorialTemplateState {
    selectedTutorialTemplate: ITutorialTemplate | null;
    modificationState: TutorialTemplateModificationStatus;
    tutorialTemplates: ITutorialTemplate[];
}


export interface ITutorialState {
    selectedTutorial: ITutorial | null;
    modificationState: TutorialModificationStatus;
    tutorials: ITutorial[];
}

export interface IUserGradeContestState {
    selectedUserGradeContest: IUserGradeContest | null;
    modificationState: UserGradeContestModificationStatus;
    userGradeContests: IUserGradeContest[];
}

export interface ITutorialTemplatePageState {
    selectedTutorialTemplatePage: ITutorialTemplatePage | null;
    modificationState: TutorialTemplatePageModificationStatus;
    tutorialTemplatePages: ITutorialTemplatePage[];
}

export interface ITutorialPageState {
    selectedTutorialPage: ITutorialPage | null;
    modificationState: TutorialPageModificationStatus;
    tutorialPages: ITutorialPage[];
}

export interface ITeacherLeaveState {
    selectedTeacherLeave: ITeacherLeave | null;
    modificationState: TeacherLeaveModificationStatus;
    acceptLeaves: ITeacherLeave[];
    removeLeaves: ITeacherLeave[];
    leaves: ITeacherLeave[];
}

export interface IExerciseStudentState {
    selectedExerciseStudent: IExerciseStudent | null;
    modificationState: ExerciseStudentModificationStatus;
    exercise_not_submit: IExerciseStudent[];
    exercise_submitted: IExerciseStudent[];
}

export interface IExerciseSubmissionState {
    selectedExerciseSubmission: IExerciseSubmission | null;
    modificationState: ExerciseSubmissionModificationStatus;
    exercise_not_gradeds: IExerciseSubmission[];
    exercise_gradeds: IExerciseSubmission[];
}

export interface IStudentLeaveState {
    selectedStudentLeave: IStudentLeave | null;
    modificationState: StudentLeaveModificationStatus;
    acceptLeaves: IStudentLeave[];
    removeLeaves: IStudentLeave[];
    leaves: IStudentLeave[];
}

export interface ITurnoverState {
    selectedTurnover: ITurnover | null;
    modificationState: TurnoverModificationStatus;
    turnover_now: ITurnover[];
    turnover_last: ITurnover[];
}

export interface IUserRegisterJoinSemesterState {
    selectedUserRegisterJoinSemester: IUserRegisterJoinSemester | null;
    modificationState: UserRegisterJoinSemesterModificationStatus;
    userRegisterJoinSemesters: IUserRegisterJoinSemester[];
}
export interface ITutorialTemplatePageState {
    selectedTutorialTemplatePage: ITutorialTemplatePage | null;
    modificationState: TutorialTemplatePageModificationStatus;
    tutorialTemplatePages: ITutorialTemplatePage[];
}

export interface IMyClassState {
    selectedMyClass: IMyClass | null;
    modificationState: MyClassModificationStatus;
    myClasses: IMyClass[];
}

export interface ITeacherRegisterQuantificationState {
    selectedTeacherRegisterQuantification: ITeacherRegisterQuantification | null;
    modificationState: TeacherRegisterQuantificationModificationStatus;
    approveds: ITeacherRegisterQuantification[];
    not_approves: ITeacherRegisterQuantification[];
    not_approved_now: ITeacherRegisterQuantification[];
}

export interface IInformationClassState {
    selectedInformationClass: IInformationClass | null;
    modificationState: InformationClassModificationStatus;
    informationClasses: IInformationClass[];
}

export interface ITimeScheduleState {
    selectedTimeSchedule: ITimeSchedule | null;
    modificationState: TimeScheduleModificationStatus;
    timeSchedules: ITimeSchedule[];
}

export interface ITimeScheduleTeacherState {
    selectedTimeScheduleTeacher: ITimeScheduleTeacher | null;
    modificationState: TimeScheduleTeacherModificationStatus;
    timeScheduleTeachers: ITimeScheduleTeacher[];
}

export interface ICourseTeacherState {
    selectedCourseTeacher: ICourseTeacher | null;
    modificationState: CourseTeacherModificationStatus;
    register_successfull_courses: ICourseTeacher[];
    not_register_courses: ICourseTeacher[];
}

export interface IClassTeacherState {
    selectedClassTeacher: IClassTeacher | null;
    modificationState: ClassTeacherModificationStatus;
    class_doing: IClassTeacher[];
    class_done: IClassTeacher[];
}

export interface IContestTeacherState {
    selectedContestTeacher: IContestTeacher | null;
    modificationState: ContestTeacherModificationStatus;
    contest_opening: IContestTeacher[];
    contest_not_open_now_not_teacher: IContestTeacher[];
    contest_end: IContestTeacher[];
    contest_not_open_now: IContestTeacher[];
}

export interface IAnonymousNotificationState {
    selectedAnonymousNotification: IAnonymousNotification | null;
    modificationState: AnonymousNotificationModificationStatus;
    notifications: IAnonymousNotification[];
}

export interface ISectionState {
    selectedSection: ISection | null;
    modificationState: SectionModificationStatus;
    sections: ISection[];
}
