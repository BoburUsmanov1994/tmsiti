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
import {lightGreen} from "@mui/material/colors";

const Ads = () => {
    const {t} = useTranslation();
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [search, setSearch] = useState('')
    const [fromCurrency, setCurrency] = useState('');
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

    const {data: currency, isLoadingCurrency} = useGetQuery({
        key: KEYS.currency,
        url: URLS.currency
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
                },
                onError: () => {
                    toast.error("Error is occured,", {position: 'top-right'})
                }
            }
        )
    }

    useEffect(() => {
        if (!isEmpty(head(get(materials, 'data.results', [])))) {
            setMaterial(find(get(materials, 'data.results', []),({material_name})=> material_name === search))
        }
    }, [materials])

    console.log('material',  materials)

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

                        <input defaultValue={get(material,'material_volume_name')} placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               {...register('material_volume_name',)}
                               className={'placeholder py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  material kategoriyasi  */}
                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material kategoriyasi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            defaultValue={get(material,'material_category_name')}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            {...register('material_category_name')}
                            className={' py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            disabled={true}
                        />
                    </div>

                    {/*  material guruhi  */}

                    <div className={'col-span-12   gap-x-[30px]'}>

                        <h4 className={'text-[#28366D] text-base '}>Material guruhi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                               defaultValue={get(material,'material_group_name')}
                               {...register('material_group_name')}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  material nomi  */}

                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material nomi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input
                            defaultValue={get(material,'material_name')}
                            placeholder={'*qidiruv natijasiga ko’ra avtomatik to’ldiriladi'}
                            className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}

                            {...register('material_csr_code', {required: true})}
                            disabled={true}
                        />
                        <input
                            placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                            className={'hidden'} value={1}
                            {...register('material_owner', {required: true})}

                        />

                    </div>

                    {/* Material tavsifi */}
                    <div className={'col-span-12 gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base my-[10px]'}>Material tavsifi</h4>
                        <textarea {...register('material_desc')} rows={5}
                                  className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}></textarea>
                    </div>


                    {/* Material narxi */}
                    <div className={'col-span-6 '}>
                        <h4 className={'text-[#28366D] text-base '}>Material narxi</h4>
                        <div className={'flex items-center rounded-[5px]'}>
                            <input placeholder={''}
                                   {...register('material_price', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl  my-[10px]'}
                                   defaultValue={(value, set) => (value * get(currency, `data[${get(set, 'material_price_currency')}]`, 1) > 0)}
                            />

                            <select className={'p-[16px]'} {...register('material_price_currency')}>
                                <option>USD</option>
                                <option>RUB</option>
                            </select>
                        </div>
                    </div>



                    {/* Material o'lchov birligi */}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material o’lchov birligi</h4>
                        <input placeholder={'tonna'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               {...register('material_measure')}

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
                               {...register('material_image')}
                        />
                    </div>

                    <div className={'col-span-6'}>

                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati blank raqami</h4>
                            <input placeholder={'Mahsulot sertifikati blank raqami'}
                                   {...register('sertificate_blank_num', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            />
                        </div>

                        {/*Mahsulot sertifikati reestr raqami*/}
                        <div>
                            <h4 className={'text-[#28366D] text-base '}>Mahsulot sertifikati reestr raqami</h4>
                            <input placeholder={'Mahsulot sertifikati reestr raqami'}
                                   {...register('sertificate_reestr_num', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                            />
                        </div>
                    </div>


                    <div>
                        <button

                            className={' col-span-12 w-[170px] text-base text-white bg-[#1890FF] py-[12px] px-[54px] rounded-[5px] mt-[30px]'}>
                            <p>Saqlash</p>
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default Ads;

// converting money

// defaultValue={(value, set) => (value * get(currency, `data[${get(set, 'material_price_currency')}]`, 1) > 0)}