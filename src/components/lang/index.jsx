import React, {useState} from 'react';
import Image from "next/image";
import {langs} from "../../constants";
import {get} from "lodash";

const Lang = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className={'flex cursor-pointer relative'}>
            <span className={'ml-1.5 mr-1 cursor-pointer inline-block'}>Uz</span>
            <Image width={9} height={6} alt={'map'} src={'/icons/arrow-down.svg'}/>
            <ul>
                {
                    langs.map(lang => <li key={get()}></li>)
                }
            </ul>
        </div>
    );
};

export default Lang;