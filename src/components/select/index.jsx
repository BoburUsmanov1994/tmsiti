import React, {useEffect, useState} from 'react';
import RSelect,{components}  from 'react-select';
import Image from "next/image";
const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <Image width={12} height={6} src={'/icons/arrow-down-dark'} alt={'arrow'} />
            </components.DropdownIndicator>
        )
    );
};
const customStyles = {
    control: (base, state, error) => ({
        ...base,
        background: "#fff",
        borderColor:  "transparent",
        borderRadius: '5px',
        outline: "none",
        boxShadow: "none",
        color: "#7E7E7E",
        display: "flex",
        overflow: 'hidden',
        padding: '4px 12px',
        width: '100%',
        minHeight: '40px',
        fontSize: '14px',
        fontWeight: '400',
        "&:hover": {
            borderColor: '#202B57',
            outline: "none",
        },
        "&:focus": {
            borderColor: '#13D6D1',
            outline: "none",
        }
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none'
    })
};
const Select = ({label='',getValue=()=>{},options=[]}) => {
    const [selectedOption,setSelectedOption] = useState();
    useEffect(()=>{
        getValue(selectedOption)
    },[selectedOption])
    return (
        <div>
            <label className={'mb-2 inline-block'} htmlFor={label}>{label}</label>
            <RSelect
                clearIndicator={true}
                styles={customStyles}
                id={label}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
        </div>
    );
};

export default Select;