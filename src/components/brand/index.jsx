import React from 'react';
import Link from "next/link";
import Image from "next/image";
const Brand = () => {
    return (
        <Link href={'/'}>
            <Image width={306} height={60} src={'/images/logo.svg'} />
        </Link>
    );
};

export default Brand;