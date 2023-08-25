
import React, {useEffect, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Button from "@/components/button";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import usePostQuery from "@/hooks/api/usePostQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {debounce, find, get, isEmpty, isEqual} from "lodash";


import {useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import Form from "@/containers/form";
import Input from "@/containers/form/components/Input";
import useGetQuery from "@/hooks/api/useGetQuery";
import {OverlayLoader} from "@/components/loader";
import {log} from "next/dist/server/typescript/utils";
const Ads = () => {
    const {t} = useTranslation();
    const { register, handleSubmit, formState: {errors}} = useForm()
    const [search, setSearch] = useState('')
    const [techno, setTechno] = useState(null)

    const {data: technos, isLoadingTechnos} = useGetQuery({
        key: KEYS.technos,
        url: URLS.technos,
        params: {
            key: 'name',
            value: search,

        },
        enabled: !!(search)
    })

    const {mutate: addAds, isLoading} = usePostQuery({listKeyId: KEYS.technoAddAds})
    const onSubmit = (data) => {
        addAds({
                url: URLS.technoAddAds,
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
        if (!isEmpty(get(technos, 'data.results', []))) {
            setTechno(find(get(technos, 'data.results', []),({techno_name})=> techno_name == search))
        }
    }, [technos])

    return (
        <Dashboard>
            <Subheader title={'Uskunalar va qurilmalar e’lon qo’shish'} />
            <div className="p-7">
                {(isLoadingTechnos || isLoading) && <OverlayLoader/>}
                <form  className={'grid grid-cols-12 gap-x-[30px]'} onSubmit={handleSubmit(onSubmit)}>
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
                                get(technos, 'data.results', []).map(item=><option value={get(item,'techno_name')}></option>)
                            }
                        </datalist>
                    </div>

                    {/*  material bo'limi  */}
                    <div className={'col-span-12  gap-x-[30px] mt-[10px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material bo’limi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input defaultValue={get(techno, 'techno_volume_name')}  placeholder={'Pardozbop va dekorativ materiallar'}
                                {...register('techno_volume_name', )}
                                className={'placeholder py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  material kategoriyasi  */}
                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material kategoriyasi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input defaultValue={get(techno, 'techno_category_name')}  placeholder={'Грунтовки на основе сложных полиэфиров, акриловых или виниловых полимеров в наведной среде'}
                               {...register('techno_category_name', ) }
                               disabled={true}
                               className={' py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />
                    </div>

                    {/*  material guruhi  */}

                    <div className={'col-span-12   gap-x-[30px]'}>

                        <h4 className={'text-[#28366D] text-base '}>Material guruhi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>

                        <input placeholder={'Грунтовки полимерные'}   defaultValue={get(techno, 'techno_group_name')}
                               {...register('techno_group_name', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               disabled={true}
                        />
                    </div>

                    {/*  material nomi  */}

                    <div className={'col-span-12  gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base'}>Material nomi</h4>
                        <p className={'text-[12px] text-[#516164]'}>*qidiruv natijasiga ko’ra avtomatik to’ldiriladi</p>
                        <input placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               defaultValue={get(techno, 'techno_name')}

                               {...register('techno_name', {required: true})}
                               disabled={true}
                        />
                        <input placeholder={'Грунтовка полимерная для повышения адгезия битумно-полимерных мастик и герметиков при герметизации деформационных швов асфальта'}
                               className={'hidden'} value={1}
                               {...register('techno_owner', {required: true})}
                        />

                    </div>




                    <div className={'col-span-12 gap-x-[30px]'}>
                        <h4 className={'text-[#28366D] text-base my-[10px]'}>Material tavsifi</h4>
                        <textarea {...register('techno_desc' )} rows={5} className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}></textarea>
                    </div>

                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material narxi</h4>
                        <form className={'flex items-center rounded-[5px]'}>
                            <input placeholder={'123213'}
                                   {...register('techno_price', {required: true})}
                                   className={'py-[15px] px-[20px] w-full shadow-xl  my-[10px]'}
                            />

                            <select className={'p-[16px] shadow-xl'} {...register('material_price_currency')}>
                                <option>USD</option>
                                <option>RUB</option>
                            </select>
                        </form>
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
                               {...register('techno_amount', {required: true})}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                        />

                    </div>
                    {/*Material miqdor o’lchov birligi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material miqdor o’lchov birligi</h4>
                        <input placeholder={'kilogram'}
                               className={'py-[15px] px-[20px] w-full shadow-xl rounded-[5px] my-[10px]'}
                               {...register('techno_amount_measure')}
                        />
                    </div>





                    {/*Material rasmi*/}
                    <div className={'col-span-6'}>
                        <h4 className={'text-[#28366D] text-base '}>Material rasmi</h4>
                        <label for="dropzone-file"  className={'shadow-2xl py-[20px] px-[30px] my-[10px] rounded-[5px] cursor-pointer  flex flex-col justify-center items-center  w-[320px] h-[224px] bg-white'}>
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






                    <button className={' col-span-12 w-[170px] text-base text-white bg-[#1890FF] py-[12px] px-[54px] rounded-[5px] mt-[30px]'}>
                        <p>Saqlash</p>
                    </button>
                </form>
            </div>
        </Dashboard>
    );
};

export default Ads;