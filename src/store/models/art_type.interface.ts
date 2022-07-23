export interface IArtType {
    id: number;
    name: string;
    description: string;
}

export enum ArtTypeModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}