export interface ICardProperties {
    id: any;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    
    art_type_id: number;
    art_level_id: number;
    art_age_id: number;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    total: number;
    student_name: string;
    student_id: number;
    create_time: string;
    update_time: string;
}