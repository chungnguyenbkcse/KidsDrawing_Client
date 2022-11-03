export interface ISectionTemplate {
    id: any;
    creator_id: any;
    course_id: any;
    name: string;
    number: number;
    teaching_form: boolean;
    create_time: string;
    update_time: string;
}

export enum SectionTemplateModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}