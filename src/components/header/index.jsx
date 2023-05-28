import React from 'react';
import Image from "next/image";
import Brand from "../brand";
import Link from "next/link";
import {useSession, signIn, signOut} from "next-auth/react"
import {get} from "lodash";
import useGetQuery from "../../hooks/api/useGetQuery";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";
import dynamic from "next/dynamic";
import {useTranslation} from "react-i18next";
import Search from "@/components/search";
const Lang = dynamic(
    () => import('@/components/lang'),
    { ssr: false }
)
const Header = () => {
    const {data: session} = useSession()
    const {t} = useTranslation()
    const {data: user} = useGetQuery({
        key: KEYS.getMe,
        url: URLS.getMe,
        headers: {Authorization: `${get(session, 'user.token')}`},
        enabled: !!(get(session, 'user.token'))
    })
    console.log('session', session)
    console.log('user', user)
    return (
        <header>
            <div className={' bg-[#182041]  py-2 '}>
                <div className={'container text-white text-sm'}>
                    <div className={'flex justify-between items-center'}>
                        <div className={'flex '}>
                            <Image width={10} height={12.5} alt={'map'} src={'/icons/map.svg'}/>
                            <span className={'ml-1.5 mr-1 cursor-pointer inline-block'}>Toshkent</span>
                            <Image width={9} height={6} alt={'map'} src={'/icons/arrow-down.svg'}/>
                        </div>
                        <Lang/>
                    </div>
                </div>
            </div>
            <div className={'bg-[#202B57]  py-4 '}>
                <div className={'container text-white text-sm grid grid-cols-12 items-center'}>
                    <div className="col-span-4">
                        <Brand/>
                    </div>
                    <div className="col-span-8 ">
                        <div className="flex justify-end items-center">
                         <Search />
                            <Link href={'/selected'} className={'relative ml-6 cursor-pointer'}>
                                <Image width={36} height={36} alt={'map'} src={'/icons/pin.svg'}/>
                                <span
                                    className={'absolute p-1 bg-[#1890FF] text-sm rounded-full text-white w-5 h-5 inline-flex justify-center items-center -top-[5px] -right-[6px]'}>3</span>
                            </Link>
                            <Link href={'/cart'} className={'relative ml-6 cursor-pointer'}>
                                <Image width={36} height={36} alt={'map'} src={'/icons/shopping-bag.svg'}/>
                                <span
                                    className={'absolute p-1 bg-[#1890FF] text-sm rounded-full text-white w-5 h-5 inline-flex justify-center items-center -top-[5px] -right-[6px]'}>4</span>
                            </Link>
                            <div className={'ml-6 flex items-center'}>
                                <Image className={'mr-1'} width={36} height={36} alt={'map'} src={'/icons/user.svg'}/>
                                {!get(session, 'user.token') ? <div>
                                    <button className={'block text-base bg-transparent'} onClick={() => signIn()}>
                                        {t('signin')}
                                    </button>
                                    <Link className={'block text-base'} href={'/auth/signup'}>
                                        {t("signup")}
                                    </Link>
                                </div> : <div>
                                    <button className={'block text-base bg-transparent'}>
                                        User
                                    </button>
                                    <button className={'block text-base'} onClick={() => signOut()}>
                                        {t('Logout')}
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;