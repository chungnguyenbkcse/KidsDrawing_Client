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