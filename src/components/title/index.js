import React from 'react';
import clsx from "clsx";

const Title = ({center=false,children}) => {
    return (
        <h2 className={clsx('inline-block mb-[30px] text-[#202B57] uppercase relative font-medium text-2xl after:absolute after:w-[60%] after:bg-[#1890FF] after:h-[3px] after:left-0 after:bottom-0',{
            'after:left-1/2 after:-translate-x-1/2':center
        })}>
            {children}
        </h2>
    );
};

export default Title;