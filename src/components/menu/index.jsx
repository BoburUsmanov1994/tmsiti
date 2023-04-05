import React from 'react';
import Link from "next/link";
import {get, isEqual} from "lodash"
import clsx from "clsx";

export const menuData = [
    {
        id: 1,
        title: 'Materiallar va buyumlar',
        url: '/',
        filterUrl:'/materials/volume'
    },
    {
        id: 2,
        title: 'Mashina mexanizmlar',
        url: '/machine-mechano',
        filterUrl:'/machine-mechano/category'
    },
    {
        id: 3,
        title: 'Qurilish ishlari',
        url: '/works',
        filterUrl:'/works/category'
    },
    {
        id: 4,
        title: 'Kichik mexanizatsiya',
        url: '/small-mechano',
        filterUrl:'/small-mechano/category'
    },
    {
        id: 5,
        title: 'Uskuna va qurilmalar',
        url: '/technos',
        filterUrl:'/technos/volume'
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
                    menuData.map(item => <li>
                        <Link
                            className={clsx('hover:text-white transition-all border-b border-b-transparent font-medium', {'!border-b-[#1890FF] text-white': isEqual(get(item, 'id'), active)})}
                            href={get(item, 'url')}>{get(item, 'title')}</Link>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Menu;