import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export default function ReactSelect(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        props.changeValue(selectedOption)
    };

    return (
        <div className="App">
            <Select
                isMulti={true}
                defaultValue={selectedOption}
                onChange={handleChange}
                options={props.setValue}
            />
        </div>
    );
}