import React, { useState, ChangeEvent, Fragment } from "react";
import { SelectNotFieldProps } from "../types/SelectNotField";

function SelectKeyValueNotField(props: SelectNotFieldProps): JSX.Element {
    const [touched, setTouch] = useState(false);
    const [error, setError] = useState("");
    const [htmlClass, setHtmlClass] = useState("");
    const [value, setValue] = useState(props.value);


    function onValueChanged(event: ChangeEvent<HTMLSelectElement>): void {
        let [error, validClass, elementValue] = ["", "", event.target.value];

        [error, validClass] = (!elementValue && props.required) ?
            ["Value has to be selected", "is-invalid"] : ["", "is-valid"];

        if (props.inputClass !== ""){
            [error, validClass] = ["", ""];
        }

        console.log(props.inputClass)

        console.log(elementValue)
        props.onChange({ value: parseInt(elementValue), error: error, touched: touched});

        setTouch(true);
        setError(error);
        setHtmlClass(validClass);
        setValue(parseInt(elementValue));
    }

    //console.log(props.options)

    const getOptions: (JSX.Element | null)[] = props.options.map( (option: any, index:number) => {
        return (
            <option key={index} value={option.value}>{option.name}</option>
        )
    });

    return (
        <Fragment>
            <label htmlFor={`${props.id}`}>{props.label}</label>
            <select
                value={value}
                id={`${props.id}`}
                className={`form-control ${props.inputClass ? props.inputClass : ""} ${htmlClass}`}
                onChange={onValueChanged}>
                <option value= {0}>Choose...</option>
                {getOptions}
            </select>

            {error ?
                <div className="invalid-feedback">
                    {error}
                </div> : null
            }
        </Fragment>
    );
}

export default SelectKeyValueNotField;