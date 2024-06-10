import React, {useState} from "react";
import AuthLayout from "../../layouts/auth";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useSettingsStore } from "@/store";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const {mutate: signupRequest, isLoading} = usePostQuery({listKeyId: KEYS.signup})

    const onSubmit = (data) => {
        signupRequest({
                url: URLS.resendVerificationCode,
                attributes: {...data}
            },
            {
                onSuccess: () => {
                    toast.success('We have sent confirmation code to your email address', {position: 'top-right'})
                    router.push("/auth/login")
                }
            })

    };



    return (
        <AuthLayout>
            <h2 className={"text-center mb-7 text-2xl font-medium"}>Elektron pochtani tasdiqlash</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>
                <div className={'mb-4'}>
                    <label className={'block mb-1.5'} htmlFor="#">Email*</label>
                    <input {...register("email", {required: true})}
                           className={'w-full shadow-input h-12 rounded-[5px] outline-none px-3'} type="text"/>
                    {errors.email &&
                        <span className={'text-xs text-red-500'}>{t("Ushbu qator to'ldirilishi shart")}</span>}
                </div>


                <div className={"mb-4 relative"}>
                    <label className={"block mb-1.5"} htmlFor="#">
                        Pochtangizga yuborilgan parolni kiriting
                    </label>
                    <input
                        {...register("password", {required: true})}
                        className={
                            "w-full shadow-input h-12 rounded-[5px] outline-none px-3"
                        }
                        type={showPassword ? "text" : "password"}
                    />
                    <button
                        type="button"
                        className="absolute top-[30px] px-3 bottom-0 right-0  flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '🔒' : '👁️'}
                    </button>
                    {errors.password && (
                        <span className={"text-xs text-red-500"}>
              {t("Ushbu qator to'ldirilishi shart")}
            </span>
                    )}
                </div>


                <div className="text-center">
                    <button
                        className={
                            "bg-[#017EFA] rounded-[5px] text-white text-xl font-medium py-2.5 px-7"
                        }
                    >
                        {t("Yuborish")}
                    </button>
                </div>

            </form>
        </AuthLayout>
    );
};

export default Login;
