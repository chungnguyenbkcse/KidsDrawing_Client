export interface IChild {
    id: any,
    username: string,
    email: string,
    password: string,
    status: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    profile_image_url: string,
    sex: string,
    phone: string,
    total_course: number;
    total_contest: number;
    address: string,
    parents: number,
    createTime: string
}

export enum ChildModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4,
    ImportFile = 5
}