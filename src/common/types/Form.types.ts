import { IProduct } from "../../store/models/product.interface";

export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface IProductFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    amount: IFormStateField<number>;
    price: IFormStateField<number>;
    hasExpiryDate: IFormStateField<boolean>; 
    category: IFormStateField<string>;
}

export interface ISemesterFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    number: IFormStateField<number>;
    year: IFormStateField<number>;
    start_time: IFormStateField<string>;
}

export  interface IOrderFormState {
    name: IFormStateField<string>;
    product: IFormStateField<IProduct | null>;
    amount: IFormStateField<number>;
    totalPrice: IFormStateField<number>;
};

export interface IUserFormState {
    username: IFormStateField<string>;
    email: IFormStateField<string>;
    password: IFormStateField<string>;
}

export interface ITeacherRegisterLevelFormState {
    art_type_id: IFormStateField<number>;
    art_age_id: IFormStateField<number>;
    degree_photo_url: IFormStateField<string>;
}

export interface ILessonFormState {
    start_time: IFormStateField<string>;
    end_time: IFormStateField<string>;
}

export interface IArtAgeFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
}

export interface IArtLevelFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
}

export interface IArtTypeFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
}

export interface ICourseNomalFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    max_participant: IFormStateField<number>;
    num_of_section: IFormStateField<number>;
    price: IFormStateField<number>;
    image_url: IFormStateField<string>;
    is_enabled: IFormStateField<boolean>;
    creator_id: IFormStateField<number>;
    art_type_id: IFormStateField<number>;
    art_level_id: IFormStateField<number>;
    art_age_id: IFormStateField<number>;
    create_time: IFormStateField<string>;
    update_time: IFormStateField<string>;
}

export interface ISemesterCourseFormState {
    creation_id: IFormStateField<number>;
    course_id: IFormStateField<number>;
    schedule_id: IFormStateField<number>;
}