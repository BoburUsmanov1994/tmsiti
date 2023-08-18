import React, {useState} from 'react';
import AuthLayout from "@/layouts/auth";
import Link from "next/link";
import Button from "@/components/button";
import Modal from 'react-modal';
import Image from "next/image";
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";


const EimzoLogin = () => {
    const [choose, setChoose] = useState(true)
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = async ({email, password}) => {
        const result = await signIn("credentials", {
            password,
            redirect: true,
            callbackUrl: "/dashboard"
        })
    };



    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '550px',
            padding: '30px',

            transform: 'translate(-50%, -50%)',

        },
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }



    function closeModal() {
        setIsOpen(false);
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

                <div onClick={openModal} className={'p-[30px] grid grid-cols-12 gap-x-[20px] container mx-auto !text-start rounded-[5px] border-[1px] border-transparent cursor-pointer hover:border-[1px] hover:border-[#017EFA]  text-base bg-[#fff] transition-all duration-300'}>
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

                <div onClick={openModal} className={'p-[30px] grid grid-cols-12 gap-x-[20px] container mx-auto !text-start border-[1px] border-transparent cursor-pointer hover:border-[1px] hover:border-[#017EFA] text-base bg-[#fff] rounded-[5px] my-[10px] transition-all duration-300'}>
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

                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={closeModal}
                    style={{

                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            width: '550px',
                            padding: '30px',
                            transform: 'translate(-50%, -50%)',

                        }
                    }}
                    contentLabel="Example Modal"

                >
                    <div className={'mb-[20px]'}>
                        <Image onClick={closeModal} src={'/icons/closeModal.svg'} alt={'modalcloser'} width={24} height={24} className={'float-right block cursor-pointer'} />
                    </div>

                    <div className={' text-center !font-semibold mb-[20px]'}>
                        <h4 className={'text-base'}>ERI kalit parolini kiriting.</h4>
                    </div>


                    <form className={'container mx-auto'} onSubmit={handleSubmit(onSubmit)}>
                        <label className={''}>DS0000000000000.pfx</label>
                        <input type={'password'} className={'w-[430px] h-[48px] px-[30px] py-[15px] focus:outline-[#017EFA] border-[1px]  rounded-[5px] shadow-xl'}/>
                    </form>

                    <div className={'text-center'}>
                        <button className={'mt-[30px] bg-[#017EFA] rounded-[5px] font-medium text-2xl py-[10px] px-[26px] text-white text-center mx-auto'}>Tekshirish</button>
                    </div>
                </Modal>

                <Button className={'mt-[30px]'}>Yangilash</Button>
            </AuthLayout>}


        </>
    );
};

export default EimzoLogin;