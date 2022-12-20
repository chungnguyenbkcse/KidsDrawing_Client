import { ITeacherRegisterQuantification } from "../../store/models/teacher_register_quantification.interface";

export interface ICardProperties {
    art_age_name: string;
    art_type_name: string;
    art_level_name: string;
    course_name: string;
    degree_photo_url: string;
    time_approved: string;
    icon: string;
    status: string;
    class: string;
    teacher_level: ITeacherRegisterQuantification;
}
