export interface ITutorialTemplate {
    id: number;
    section_template_id: number;
    name: string;
    description: string;
    create_time: string;
    update_time: string;
}

export enum TutorialTemplateModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}