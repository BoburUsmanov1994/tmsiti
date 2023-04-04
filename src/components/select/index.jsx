import React, {useEffect, useState} from 'react';
import RSelect, {components} from 'react-select';
import Image from "next/image";
import clsx from "clsx";
import {find, isEqual} from "lodash";

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <Image width={12} height={6} src={'/icons/arrow-down-dark'} alt={'arrow'}/>
            </components.DropdownIndicator>
        )
    );
};
const customStyles = (sm = false) => ({
    control: (base, state, error) => ({
        ...base,
        background: "#fff",
        borderColor: "transparent",
        borderRadius: '5px',
        outline: "none",
        boxShadow: "none",
        color: "#7E7E7E",
        display: "flex",
        overflow: 'hidden',
        padding: sm ? '0px' : '4px 12px',
        width: '100%',
        minWidth: '230px',
        minHeight: sm ? '30px' : '40px',
        fontSize: sm ? '14px' :'16px',
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
});
const Select = ({
                    defaultValue = null, sm = false, label = '', getValue = () => {
    }, options = []
                }) => {
    const [selectedOption, setSelectedOption] = useState();
    useEffect(() => {
        getValue(selectedOption)
    }, [selectedOption])
    useEffect(() => {
        if (defaultValue) {
            setSelectedOption(find(options, ({value}) => isEqual(value, defaultValue)))
        }
    }, [defaultValue])
    return (
        <div className={clsx({'flex items-center': sm})}>
            <label className={clsx('mb-2 inline-block ', {'text-sm mb-0 mr-3': sm})} htmlFor={label}>{label}</label>
            <RSelect
                clearIndicator={true}
                styles={customStyles(sm)}
                id={label}
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />
        </div>
    );
};

export default Select;