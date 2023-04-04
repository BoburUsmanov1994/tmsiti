import React from 'react';
import Link from "next/link";
import {get,isEqual} from "lodash"
import clsx from "clsx";

const data = [
    {
        id: 1,
        title: 'Materiallar va buyumlar',
        url: '/',
    },
    {
        id: 2,
        title: 'Mashina mexanizmlar',
        url: '/machine-mechano',
    },
    {
        id: 3,
        title: 'Qurilish ishlari',
        url: '/works',
    },
    {
        id: 4,
        title: 'Kichik mexanizatsiya',
        url: '/small-mechano',
    },
    {
        id: 5,
        title: 'Uskuna va qurilmalar',
        url: '/technos',
    },
    {
        id: 6,
        title: 'Klassifikator',
        url: '/classifier',
    },
    {
        id: 7,
        title: 'Bo’limlar',
        url: '/volumes',
    }
]
const Menu = ({active = 1}) => {
    return (
        <div className={' bg-[#28366D]  py-5 '}>
            <ul className={'container text-[#8D97AD] flex justify-between'}>
                {
                    data.map(item => <li>
                        <Link className={clsx('hover:text-white transition-all border-b border-b-transparent font-medium',{'border-b-[#1890FF] text-white':isEqual(get(item,'id'),active)})} href={get(item,'url')}>{get(item,'title')}</Link>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Menu;