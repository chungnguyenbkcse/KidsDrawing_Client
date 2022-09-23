export interface IUserRegisterJoinSemester {
    id: number;
    student_id: number;
    semester_class_id: number;
    student_name: string;
    semester_class_name: string;
    link_url: string;
    status: string;
    payer_id: number;
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