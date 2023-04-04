import React from 'react';
import Link from "next/link";
import clsx from "clsx";


const Button = ({url='',className='',handleClick=()=>{},children}) => {
    return (
        <>
            {url ? <Link className={clsx(
                'border border-[#28366D] hover:bg-[#1890FF]  hover:border-[#1890FF] hover:text-white font-medium text-center rounded-[5px] transition-all inline-block py-2.5 px-5 min-w-[170px] text-[#28366D]',
                className,
            )} href={url}> {children}</Link> : <button onClick={handleClick}
                                                       className={clsx(
                                                           'hover:bg-[#1890FF] hover:border-[#1890FF] hover:text-white border border-[#28366D] font-medium text-center rounded-[5px] transition-all inline-block py-2.5 px-5 min-w-[170px] text-[#28366D]',
                                                           className,
                                                       )}
            >
                {children}
            </button>}
        </>
    );
};

export default Button;