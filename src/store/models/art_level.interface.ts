export interface IArtLevel {
    id: string;
    name: string;
    description: string;
}

export enum ArtLevelModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}