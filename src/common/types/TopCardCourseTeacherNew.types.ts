export interface ICardProperties {
    id: string;
    name: string;
    description: string;
    max_participant: number;
    num_of_section: number;
    price: number;
    image_url: string;
    is_enabled: boolean;
    art_type_id: string;
    art_level_id: string;
    art_age_id: string;
    art_type_name: string;
    art_level_name: string;
    art_age_name: string;
    total: number;
    total_register: number;
    create_time: string;
    update_time: string;
}