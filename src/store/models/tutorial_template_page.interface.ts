export interface ITutorialTemplatePage {
    id: string;
    tutorial_template_id: string;
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