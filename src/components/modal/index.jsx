import React from 'react';
import Image from "next/image";

const Modal = () => {
    return (
        <div>
            <div className={'mb-[20px]'}>
                <Image onClick={closeModal} src={'/icons/closeModal.svg'} alt={'modalcloser'} width={24} height={24} className={'float-right block cursor-pointer'} />
            </div>

            <div className={' text-center !font-semibold mb-[20px]'}>
                <h4 className={'text-base'}>ERI kalit parolini kiriting.</h4>
            </div>


            <form className={'container mx-auto'}>
                <label className={''}>DS0000000000000.pfx</label>
                <input type={'password'} className={'w-[430px] h-[48px] px-[30px] py-[15px] focus:outline-[#017EFA] border-[1px]  rounded-[5px] shadow-xl'}/>
            </form>

            <div className={'text-center'}>
                <button className={'mt-[30px] bg-[#017EFA] rounded-[5px] font-medium text-2xl py-[10px] px-[26px] text-white text-center mx-auto'}>Tekshirish</button>
            </div>
        </div>
    );
};

export default Modal;