import React, { useState } from 'react';
import Select from 'react-select';

export default function ReactSelect(props) {
    const [selectedOption, setSelectedOption] = useState(props.value);
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