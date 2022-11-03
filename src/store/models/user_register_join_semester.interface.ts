export interface IUserRegisterJoinSemester {
    id: any;
    student_id: any;
    semester_class_id: any;
    student_name: string;
    link_url: string;
    status: string;
    payer_id: any;
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