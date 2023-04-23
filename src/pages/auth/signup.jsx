import React from 'react';
import AuthLayout from "../../layouts/auth";
import {useForm} from "react-hook-form";

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <AuthLayout>
            <h2 className={'text-center mb-7 text-2xl font-medium'}>Ro’yhatdan o’tish</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={'text-left'}>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Email*</label>
                    <input {...register("email",{required:true})} className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Login*</label>
                    <input {...register("username",{required:true})}  className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.username && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>

                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Parol*</label>
                    <input {...register("password1",{required:true})} className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="password"/>
                    {errors.password1 && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>
                <div className={'mb-10'}>
                    <label className={'block mb-1.5'} htmlFor="#">Parolni takrorlang*</label>
                    <input {...register("password2",{required:true})} className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="password"/>
                    {errors.password2 && <span className={'text-xs text-red-500'}>This field is required</span>}
                </div>
              <div className="text-center">
                  <button className={'bg-[#017EFA] rounded-[5px] text-white text-xl font-medium py-2.5 px-7'}>Yuborish</button>
              </div>
            </form>
        </AuthLayout>
    );
};

export default Signup;