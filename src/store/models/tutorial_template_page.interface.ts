export interface ITutorialTemplatePage {
    id: number;
    tutorial_template_id: number;
    name: string;
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