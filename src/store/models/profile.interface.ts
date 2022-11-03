export interface IProfile {
    id: any;
    profile_image_url: string;
}

export enum ProfileModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}