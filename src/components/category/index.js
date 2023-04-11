import React from 'react';
import Image from "next/image";
import {get} from "lodash";
import Link from "next/link";

const Category = ({data,url='materials/volume',name='volume_name',logo_url='volume_logo'}) => {
    return (
        <Link href={`/${url}/${get(data,'id')}`} className={'rounded-[5px] p-2.5 bg-white drop-shadow-category flex items-start min-h-full'}>
            <Image height={38} width={38} src={get(data,logo_url)}  loader={() => get(data,logo_url)} />
            <h4 className={'ml-3 text-sm'}>{get(data,name)}</h4>
        </Link>
    );
};

export default Category;