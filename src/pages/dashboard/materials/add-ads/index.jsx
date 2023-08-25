import React, {useEffect, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import usePostQuery from "@/hooks/api/usePostQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {debounce, head, get, isEmpty, find} from "lodash";
import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import useGetQuery from "@/hooks/api/useGetQuery";
import {OverlayLoader} from "@/components/loader";

const Ads = () => {
    const {t} = useTranslation();
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [search, setSearch] = useState('')
    const [material, setMaterial] = useState(null)
    const {data: materials, isLoadingMaterial} = useGetQuery({
        key: KEYS.materials,
        url: URLS.materials,
        params: {
            key: 'name',
            value: search,
        },
        enabled: !!(search)
    })
    const {mutate: addAds, isLoading} = usePostQuery({listKeyId: KEYS.addAds})

    const onSubmit = (data) => {
        addAds({
                url: URLS.addAds,
                attributes: {...data}
            },
            {
                onSuccess: () => {
                    toast.success('All details were sent correctly,  ', {position: 'top-right'});
                }
            }
        )
    }

    useEffect(() => {
        if (!isEmpty(get(materials, 'data.results', []))) {
            setMaterial(find(get(materials, 'data.results', []),({material_name})=>material_name == search))
        }
    }, [materials])


    return (
        <Dashboard>
            <Subheader title={'Qurilish materiallari e’lon qo’shish'}/>
            <div className="p-7">
                {(isLoadingMaterial || isLoading) && <OverlayLoader/>}
                <form className={'grid grid-cols-12 gap-x-[30px]'} onSubmit={handleSubmit(onSubmit)}>
                    <div className={'col-span-12 mb-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Qidiruv</h4>
                    </div>

                    <div className={'col-span-12 flex gap-x-[30px]'}>
                        <input list={'search-list'} defaultValue={search} placeholder={'nomni rus tilida kiriting'}
                               onChange={debounce(function (e) {
                                   setSearch(e.target.value)
                               }, 500)}
                               className={'placeholder:italic py-[15px] px-[20px] w-full shadow-xl rounded-[5px]'}
                        />
                            <datalist id={'search-list'}>

                                {
                                    get(materials, 'data.results', []).map(item=><option value={get(item,'material_name')}></option>)
                                }
                            </datalist>
                    </div>

                    {/*  material bo'limi  */}
                    <div className={'col-span-12  gap-x-[30px] mt-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material bo’limi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input defaultValue={get(material,'material_volume_name')} placeholder={'Pardozbop va dekorativ materiallar'}
                               {...register('material_volume_name',)}
                               className={'placeholder py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    {/*  material kategoriyasi  */}
                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material kategoriyasi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            defaultValue={get(material,'material_category_name')}
                            placeholder={'Грунтовки на основе сложных полиэфиров, акриловых или виниловых полимеров в наведной среде'}
                            {...register('material_category_name')}
                            className={' py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    {/*  material guruhi  */}

                    <div className={'col-span-12   gap-x-[30px]'}>

                        <h4 className={'text-[#28366D] text-base '}>Material guruhi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input placeholder={'Грунтовки полимерные'}
                               defaultValue={get(material,'material_group_name')}
                               {...register('material_group_name', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    {/*  material nomi  */}

                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material nomi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            defaultValue={get(material,'material_name')}
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            {...register('material_name', {required: true})}
                        />
                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'hidden'} value={1}
                            {...register('material_owner', {required: true})}
                        />

                    </div>


                    <div className={'col-span-12 gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base my-[10px]'}>Material tavsifi</h4>
                        <textarea {...register('material_desc')} rows={5}
                                  className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}></textarea>
                    </div>

                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material narxi</h4>
                        <input placeholder={'123213'}
                               {...register('material_price', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />


                    </div>


                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material o’lchov birligi</h4>
                        <input placeholder={'tonna'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}

                        />
                    </div>
                    {/*Material miqdori*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material miqdori</h4>

                        <input placeholder={'123213'}
                               {...register('material_amount', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />

                    </div>
                    {/*Material miqdor o’lchov birligi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material miqdor o’lchov birligi</h4>
                        <input placeholder={'kilogram'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               {...register('material_amount_measure')}
                        />
                    </div>


                    {/*Material rasmi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material rasmi</h4>
                        <label for="dropzone-file"
                               className={'shadow-2xl py-[20px] px-[30px] my-[10px] rounded-[5px] cursor-pointer  flex flex-col justify-center items-center  w-[320px] h-[224px] bg-white'}>
                            <Image src={'/icons/upload.svg'} alt={'upload'} width={48} height={48}/>
                            <p>yuklash</p>
                        </label>
                        <input id={"dropzone-file"} className={'hidden '} type={"file"}

                        />
                    </div>

                    <div className={'col-span-6'}>

                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati blank raqami</h4>
                            <input placeholder={'123213'}
                                   {...register('sertificate_blank_num', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            />
                        </div>

                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati reestr raqami</h4>
                            <input placeholder={'123213'}
                                   {...register('sertificate_reestr_num', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            />
                        </div>
                    </div>


                    <button
                        className={' col-span-12 w-[170px] text-base text-white bg-[#1890FF] py-[12px] px-[54px] rounded-[5px] mt-[30px]'}>
                        <p>Saqlash</p>
                    </button>
                </form>
            </div>
        </Dashboard>
    );
};

export default Ads;