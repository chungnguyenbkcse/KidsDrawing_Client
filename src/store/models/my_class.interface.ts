export interface IMyClass {
    id: any;
    course_id: number;
    course_name: string;
    semester_name: string;
    semester_id: number;
    total_student: number;
    teacher_name: string;
    user_register_teach_semester: number;
    security_code: string;
    name: string;
    create_time: string;
    update_time: string;

}

export enum MyClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}