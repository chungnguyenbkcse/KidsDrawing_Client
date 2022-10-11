export interface IUserRegisterJoinSemester {
    id: string;
    student_id: string;
    semester_class_id: string;
    student_name: string;
    link_url: string;
    status: string;
    payer_id: string;
    payer_name: string;
    course_name: string;
    price: number;
    time: string;
}

export enum UserRegisterJoinSemesterModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}