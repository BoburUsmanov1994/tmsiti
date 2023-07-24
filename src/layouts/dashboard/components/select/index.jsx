import React from 'react';


const Select = () => {
    return (
        <select name="select" className={'w-[50px] h-[40px] text-xs pl-[7px]'}>

            <option value="value1" selected>20</option>
            <option value="value2">30</option>
            <option value="value3">40</option>
        </select>
    )
}

export default Select