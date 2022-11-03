export interface ITutorialTemplate {
    id: any;
    section_template_id: any;
    name: string;
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