import React from 'react';
import Image from "next/image";
import {get} from "lodash";
import {config} from "@/config";
import Link from "next/link";

const Category = ({data}) => {
    return (
        <Link href={`/materials/volume/${get(data,'id')}`} className={'rounded-[5px] p-2.5 bg-white drop-shadow-category flex'}>
            <Image height={38} width={38} src={`${config.FILE_URL}${get(data,'id')}.png`}  loader={() => `${config.FILE_URL}${get(data,'id')}.png`} />
            <h4 className={'ml-3 text-sm'}>{get(data,'volume_name')}</h4>
        </Link>
    );
};

export default Category;