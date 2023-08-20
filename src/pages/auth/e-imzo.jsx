import React, {useState} from 'react';
import AuthLayout from "@/layouts/auth";
import Link from "next/link";
import Button from "@/components/button";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";



const EimzoLogin = () => {
    const [choose, setChoose] = useState(true)
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <>
            {!choose ? <AuthLayout>
                <h2 className={'text-center mb-[50px] text-2xl font-medium'}>Tizimga ERI orqali kirish</h2>

                <div className={'!text-start !font-semibold mb-[20px]'}>
                    <h4 className={'text-base'}>ERI kalit topilmadi.</h4>

                </div>

                <div className={'!text-start text-sm '}>
                    <p>
                        Xatoni hal qilish uchun quyidagilarni bajaring:
                    </p>

                    <ol className={'list-decimal ml-[20px]'}>
                        <li>
                            ERI kalitlari C:\DSKEYS yoki D:\DSKEYS manzilida joylashganligini hamda ushbu kalitlar aynan sizga tegishligini tekshiring
                        </li>

                        <li>
                            Antivirus dasturi kalitlardan foydalanishni ta'qiqlamayotganligini tekshiring
                        </li>

                        <li>
                            Korporativ kompyuterlarni ko'llash holatida tashkilot siyosati sizga ERI kalitlaridan foydalanishga ruxsat berayotganiga ishonch hosil qiling
                        </li>
                    </ol>

                    <p className={"mt-[20px] text-[#525D8A]"}>E-Imzo modulini o'rnatish bo'yicha yo'riqnoma va yuzaga kelishi mumkin bo'lgan muammolar bilan <Link href={'https://e-imzo.uz/#instructions'} className={'text-[#017EFA] underline'}>shu yerda</Link> tanishishingiz mumkin</p>
                </div>

                <Button className={'mt-[30px]'}>Yangilash</Button>
            </AuthLayout> : <AuthLayout>
                <h2 className={'text-center mb-[50px] text-2xl font-medium'}>Tizimga ERI orqali kirish</h2>

                <div className={'!text-start !font-semibold mb-[20px]'}>
                    <h4 className={'text-base'}>ERI kalit tanlang.</h4>
                </div>

                <div onClick={() => toggleModal()} className={'p-[30px] grid grid-cols-12 gap-x-[20px] container mx-auto !text-start rounded-[5px] border-[1px] border-transparent cursor-pointer hover:border-[1px] hover:border-[#017EFA]  text-base bg-[#fff] transition-all duration-300'}>
                    <h3 className={'col-span-12 mb-[10px] font-semibold'}>FAMILIYA ISM SHARIF</h3>

                    <div className={'col-span-12 flex gap-x-[20px] flex-wrap'}>
                        <div className={''}>
                            <h4 className={'text-sm'}>JSHSHIR:</h4>
                            <p className={'font-medium'}>00000000000000</p>
                        </div>

                        <div className={''}>
                            <h4 className={'text-sm'}>STIR:</h4>
                            <p className={'font-medium'}>000000000</p>
                        </div>

                        <div className={''}>
                            <h4 className={'text-sm'}>Mulkchilik turi:</h4>
                            <p className={'font-medium'}>Yuridik shaxs</p>
                        </div>
                    </div>

                    <div className={'col-span-12 my-[10px]'}>
                        <h4 className={'text-sm'}>Tashkilot:</h4>
                        <p className={'font-medium'}>“Qurilish jarayon” MCHJ</p>
                    </div>

                    <div className={'col-span-12 flex justify-between'}>
                        <div className={''}>
                            <h4 className={'text-sm'}>Sertifikat raqami:</h4>
                            <p className={'font-medium'}>000d0000</p>
                        </div>

                        <div className={''}>
                            <h4 className={'text-sm'}>Sertifikatning amal qilish muddati:</h4>
                            <p className={'font-medium'}>00.00.0000 - 00.00.0000</p>
                        </div>
                    </div>
                </div>

                <div onClick={() => toggleModal()}  className={'p-[30px] grid grid-cols-12 gap-x-[20px] container mx-auto !text-start border-[1px] border-transparent cursor-pointer hover:border-[1px] hover:border-[#017EFA] text-base bg-[#fff] rounded-[5px] my-[10px] transition-all duration-300'}>
                    <h3 className={'col-span-12 mb-[10px] font-semibold'}>FAMILIYA ISM SHARIF</h3>

                    <div className={'col-span-12 flex gap-x-[20px] flex-wrap'}>
                        <div className={''}>
                            <h4 className={'text-sm'}>JSHSHIR:</h4>
                            <p className={'font-medium'}>00000000000000</p>
                        </div>

                        <div className={''}>
                            <h4 className={'text-sm'}>STIR:</h4>
                            <p className={'font-medium'}>000000000</p>
                        </div>

                        <div className={''}>
                            <h4 className={'text-sm'}>Mulkchilik turi:</h4>
                            <p className={'font-medium'}>Yuridik shaxs</p>
                        </div>
                    </div>

                    <div className={'col-span-12 my-[10px]'}>
                        <h4 className={'text-sm'}>Tashkilot:</h4>
                        <p className={'font-medium'}>“Qurilish jarayon” MCHJ</p>
                    </div>

                    <div className={'col-span-12 flex justify-between'}>
                        <div className={''}>
                            <h4 className={'text-sm'}>Sertifikat raqami:</h4>
                            <p className={'font-medium'}>000d0000</p>
                        </div>

                        <div className={''}>
                            <h4 className={'text-sm'}>Sertifikatning amal qilish muddati:</h4>
                            <p className={'font-medium'}>00.00.0000 - 00.00.0000</p>
                        </div>
                    </div>
                </div>

                <Button className={'mt-[30px]'}>Yangilash</Button>


                {/*Modal section*/}
                <div className={`fixed  inset-0 bg-black bg-opacity-30  flex justify-center items-center ${modal ? 'hidden' : 'visible'}`}>
                    <div className={'w-[550px] p-[30px] rounded-[5px] bg-white'}>
                        <div>
                            <Image onClick={() => toggleModal()} src={'/icons/closeModal.svg'} alt={'modalcloser'} width={24} height={24} className={'float-right block cursor-pointer'} />
                        </div> <br/>

                        <div className={'text-center !font-semibold mb-[20px]'}>
                            <h4 className={'text-base'}>ERI kalit parolini kiriting.</h4>
                        </div>

                        <form className={'text-start container mx-auto'}>
                            <label className={'text-start'}>DS0000000000000.pfx</label>
                            <input type={'password'} className={'w-[430px] h-[48px] px-[30px] py-[15px] focus:outline-[#017EFA] focus:shadow-xl border-[1px]  rounded-[5px] shadow-lg'}/>
                        </form>

                        <div className={''}>
                            <button className={'mt-[30px] bg-[#017EFA] rounded-[5px] font-medium text-2xl py-[10px] px-[26px] text-white text-center mx-auto'}>Tekshirish</button>
                        </div>
                    </div>
                </div>
            </AuthLayout>}


        </>
    );
};

export default EimzoLogin;