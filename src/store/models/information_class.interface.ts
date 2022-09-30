export interface IInformationClass {
    id: string,
    name: string;
    teacher: string;
    security_code: string;
    course: string;
    art_age: string;
    art_type: string;
    art_level: string;
    number_section: number;
    number_student: number;
}

export enum InformationClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}