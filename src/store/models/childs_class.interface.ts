export interface IChildsClass {
    student_id: any,
    student_name: string,
    dateOfBirth: string,
    sex: string,
}

export enum ChildsClassModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4,
    ImportFile = 5
}