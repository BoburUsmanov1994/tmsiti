import React from 'react';
import Brand from "@/components/brand";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";

const Footer = () => {
    return (
        <footer className={'bg-[#28366D]  py-8 '}>
            <div className={'container text-white'}>
                <div className="grid grid-cols-12">
                    <div className="col-span-4">
                        <Brand/>
                        <p className={'my-5'}>Qurilish materiallari, mashina va mexanizmlari, ish turlari elektron
                            portali</p>
                        <h4 className={'font-medium'}>Bizni ijtimoiy tarmoqlarda kuzating:</h4>
                        <ul className={'flex my-2.5'}>
                            <li className={'mr-3'}>
                                <Link href={'#'}>
                                    <Image width={24} height={24} src={'/icons/facebook.svg'}/>
                                </Link>
                            </li>
                            <li className={'mr-3'}>
                                <Link href={'#'}>
                                    <Image width={24} height={24} src={'/icons/telegram.svg'}/>
                                </Link>
                            </li>
                            <li className={'mr-3'}>
                                <Link href={'#'}>
                                    <Image width={24} height={24} src={'/icons/youtube.svg'}/>
                                </Link>
                            </li>
                            <li>
                                <Link href={'#'}>
                                    <Image width={24} height={24} src={'/icons/instagram.svg'}/>
                                </Link>
                            </li>
                        </ul>
                        <span className={'text-sm font-light'}>All rights reserved © {dayjs().format("YYYY")}</span>
                    </div>
                    <div className="col-span-4">
                        <h4 className={'text-xl font-bold mb-2.5'}>Menu</h4>
                        <ul>
                            <li className={'mb-2 hover:text-[#1890FF]'}>
                                <Link href={'/'}>Qurilish materiallari</Link>
                            </li>
                            <li className={'mb-2 hover:text-[#1890FF]'}>
                                <Link href={'/machine-mechano'}>Mashina mexanizmlar</Link>
                            </li>
                            <li className={'mb-2 hover:text-[#1890FF]'}>
                                <Link href={'/works'}>Qurilish ishlari</Link>
                            </li>
                            <li className={'mb-2 hover:text-[#1890FF]'}>
                                <Link href={'#'}>Korxonalar</Link>
                            </li>
                            <li className={'mb-2 hover:text-[#1890FF]'}>
                                <Link href={'/classifier'}>Klassifikator</Link>
                            </li>
                            <li className={'mb-2 hover:text-[#1890FF]'}>
                                <Link href={'#'}>Yangiliklar</Link>
                            </li>
                            <li className={'hover:text-[#1890FF]'}>
                                <Link href={'#'}>Aloqa</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-4 text-center">
                        <h4 className={'mt-16 '}>Yangiliklarga obuna bo‘ling!</h4>
                        <p className={'text-sm mb-5'}>Tezkor yangiliklar e-mail orqali</p>
                        <form action="#">
                            <input placeholder={'Email kiriting'}
                                   className={'w-[270px] rounded-[5px] p-2.5 text-center placeholder:text-[#28366D] text-[#28366D]'}/>
                            <Button className={'bg-[#1890FF] !text-white !block mx-auto w-[270px] mt-2.5'}>Obuna
                                bo‘lish</Button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;