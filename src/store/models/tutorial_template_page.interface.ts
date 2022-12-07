export interface ITutorialTemplatePage {
    id: any;
    section_template_id: number;
    description: string;
    number: number;
}

export enum TutorialTemplatePageModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}