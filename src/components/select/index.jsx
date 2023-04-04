import React, {useEffect, useState} from 'react';
import Select from 'react-select';
const Select = ({label='',getValue=()=>{},options=[]}) => {
    const [selectedOption,setSelectedOption] = useState();
    useEffect(()=>{
        getValue(selectedOption)
    },[selectedOption])
    return (
        <div>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
        </div>
    );
};

export default Select;