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
import { ISemesterCourse, SemesterCourseModificationStatus } from "./semester_course.interface";
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
    semester_courses: ISemesterCourseState;
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

export interface ISemesterCourseState {
    selectedSemesterCourse: ISemesterCourse | null;
    modificationState: SemesterCourseModificationStatus;
    semesterCourses: ISemesterCourse[];
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

export interface ITeacherLeaveState {
    selectedTeacherLeave: ITeacherLeave | null;
    modificationState: TeacherLeaveModificationStatus;
    acceptLeaves: ITeacherLeave[];
    removeLeaves: ITeacherLeave[];
    leaves: ITeacherLeave[];
}

export interface IStudentLeaveState {
    selectedStudentLeave: IStudentLeave | null;
    modificationState: StudentLeaveModificationStatus;
    acceptLeaves: IStudentLeave[];
    removeLeaves: IStudentLeave[];
    leaves: IStudentLeave[];
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
    teacherRegisterQuantifications: ITeacherRegisterQuantification[];
}