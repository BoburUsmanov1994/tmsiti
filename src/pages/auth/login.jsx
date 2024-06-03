import React from 'react';
import AuthLayout from "../../layouts/auth";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import usePostQuery from "@/hooks/api/usePostQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {useSettingsStore} from "@/store";
import {get} from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import {useTranslation} from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const router = useRouter();
    const {data: session} = useSession();
    const {mutate: signupRequest, isLoading} = usePostQuery({listKeyId: KEYS.login})
    const token = useSettingsStore(state => get(state, 'token', null))
    const setToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))

    const { data: customer } = useGetQuery({
        key: KEYS.getCustomer,
        url: URLS.getCustomer,
        headers: { token: `${get(session, "user.token")}`},
        enabled: !!get(session, "user.token"),
    })

    console.log(get(customer, "data.role"), "customer")


    const onSubmit = (data) => {
        // signIn("credentials", {
        //     email: get(data, 'email'),
        //     password: get(data, 'password'),
        // })
        signupRequest({
                url: URLS.login,
                attributes: {...data}
            },
            {
                onSuccess: ({data}) => {
                    setToken(get(data, 'token'))
                    toast.success("Siz ro'yxatdan o'tdingiz", {position: 'top-right'})
                    router.push("/")

                }
            })

    };
    return (
        <AuthLayout>
            <h2 className={'text-center mb-7 text-2xl font-medium'}>Kirish</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={'text-left'}>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Login</label>
                    <input {...register("email", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email && <span className={'text-xs text-red-500'}>{t("Ushbu qator to'ldirilishi shart")}</span>}
                </div>

                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Parol</label>
                    <input {...register("password", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="password"/>
                    {errors.password && <span className={'text-xs text-red-500'}>{t("Ushbu qator to'ldirilishi shart")}</span>}
                </div>
                <div className="mb-8">
                    <Link className={'text-[#525D89] text-sm'} href={'/auth/reset-password'}>{t("Parolni unitdingizmi")}</Link>
                </div>

                <div className="text-center">
                    <button
                        className={'bg-[#017EFA] rounded-[5px] text-white text-xl font-medium py-2.5 px-7'}>{t("Kirish")}
                    </button>
                </div>
                <div className="mt-5 text-center">
                    <Link className={'text-[#525D89] text-sm underline'} href={'/auth/signup'}>{t("Ro’yhatdan o’tmaganmisiz?")}</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;