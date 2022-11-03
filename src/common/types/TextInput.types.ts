export type TextInputProps = {
    required: boolean,
    onChange: Function,
    id: any,
    label: string,
    placeholder: string,
    value: string,
    type?: string,
    maxLength: number,
    inputClass?: string,
    field: string
};