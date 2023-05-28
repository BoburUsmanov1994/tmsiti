import React from 'react';
import Image from "next/image";

const Pofile = () => {
    return (
        <div className={'inline-flex items-center'}>
            <span className={'mr-3'}>Ism Familiya</span>
            <Image width={48} height={48} className={'rounded-full'} src={'/images/avatar.png'} alt={'avatar'}/>
        </div>
    );
};

export default Pofile;