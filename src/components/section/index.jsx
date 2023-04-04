import React from 'react';

const Section = ({children}) => {
    return (
        <div className={'bg-[#F4F8FA] py-[30px]'}>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Section;