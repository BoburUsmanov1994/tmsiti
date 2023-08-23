import React, {useEffect, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Button from "@/components/button";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import usePostQuery from "@/hooks/api/usePostQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {get} from "lodash"

const Ads = () => {
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [materialData, setMaterialData] = useState([]);
    const {mutate: searchMaterialRequest, isLoading} = usePostQuery({listKeyId: KEYS.materials})
    const searchMaterialByName = (_name) => {
        searchMaterialRequest({url: URLS.materials, attributes: {name: _name}}, {
            onSuccess: (response) => {
                setMaterialData(get(response, 'data'))
            }
        })
    }

    useEffect(() => {
        if (name) {
            searchMaterialByName(name);
        }
    }, [name])
    return (
        <Dashboard>
            <Subheader title={'Qurilish materiallari e’lon qo’shish'}/>
            <div className="p-7">
                <div className={'grid grid-cols-12 gap-x-[30px]'}>
                    {/*qidiruv qismi*/}
                    <div className={'col-span-12 mb-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Qidiruv</h4>
                    </div>

                    <div className={'col-span-12 flex gap-x-[30px]'}>
                        <input onChange={(e) => setName(e.target.value)} placeholder={'nomni rus tilida kiriting'}
                               className={'placeholder:italic py-[15px] px-[20px] w-full shadow-xl rounded-[5px]'}
                        />
                        <Button
                            className={'bg-[#1890FF] text-white !border-[#1890FF]  inline-flex items-center text-center'}>
                            <Image
                                className={'mr-1.5'} width={20} height={40} src={'/icons/search.svg'}
                                alt={'plus'}
                            />{t("Qidiruv")}
                        </Button>
                    </div>

                    {/*  material bo'limi  */}
                    <div className={'col-span-12  gap-x-[30px] mt-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material bo’limi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input placeholder={'Pardozbop va dekorativ materiallar'}
                               className={'placeholder py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    {/*  material kategoriyasi  */}
                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material kategoriyasi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            placeholder={'Грунтовки на основе сложных полиэфиров, акриловых или виниловых полимеров в наведной среде'}
                            className={' py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    {/*  material guruhi  */}

                    <div className={'col-span-12   gap-x-[30px]'}>

                        <h4 className={'text-[#28366D] text-base '}>Material guruhi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input placeholder={'Грунтовки полимерные'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    {/*  material nomi  */}

                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material nomi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>


                    <div className={'col-span-12 gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base my-[10px]'}>Material tavsifi</h4>
                        <textarea rows={5}
                                  className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}></textarea>
                    </div>

                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material narxi</h4>
                        <input placeholder={'123213'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material o’lchov birligi</h4>
                        <input placeholder={'123213'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material miqdori</h4>
                        <input placeholder={'123213'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material miqdor o’lchov birligi</h4>
                        <input placeholder={'123213'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>


                    <div className={'col-span-6 float-right'}>
                        <h4 className={'text-[#28366D] text-base '}>Material miqdori</h4>
                        <input placeholder={'123213'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material miqdor o’lchov birligi</h4>
                        <input placeholder={'123213'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                </div>
            </div>
        </Dashboard>
    );
};

export default Ads;