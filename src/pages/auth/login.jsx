import React, { useState } from "react";
import AuthLayout from "../../layouts/auth";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useRouter } from "next/router";
import { useSettingsStore } from "@/store";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useTranslation } from "react-i18next";
import { OverlayLoader } from "@/components/loader";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate: signupRequest, isLoading } = usePostQuery({
    listKeyId: KEYS.login,
  });

  const { data: customer } = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: { token: `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "customer"
    ),
  });

  const { data: logins } = useGetQuery({
    key: KEYS.login,
    url: URLS.login,
  });

  console.log(logins);

  const onChange = (value) => {
    setCaptchaValue(value);
  };

  const onSubmit = ({ data, sum }) => {
    let formData = new FormData();
    formData.append("sum", sum);
    signupRequest({
      url: URLS.login,
      attributes: {
        sum,
      },
    });
    signIn("credentials", {
      email: get(data, "email"),
      password: get(data, "password"),
      redirect: true,
      callbackUrl: "/dashboard/customer/my-orders",
    });
  };
  return (
    <AuthLayout>
      {isLoading && <OverlayLoader />}
      <h2 className={"text-center mb-7 text-2xl font-medium"}>Kirish</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={"text-left"}>
        <div className={"mb-4"}>
          <label className={"block mb-1.5"} htmlFor="#">
            Login
          </label>
          <input
            {...register("email", { required: true })}
            className={
              "w-full shadow-input h-12 rounded-[5px] outline-none px-3"
            }
            type="text"
          />
          {errors.email && (
            <span className={"text-xs text-red-500"}>
              {t("Ushbu qator to'ldirilishi shart")}
            </span>
          )}
        </div>

        <div className={"mb-4 relative"}>
          <label className={"block mb-1.5"} htmlFor="#">
            Parol
          </label>
          <input
            {...register("password", { required: true })}
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
            {showPassword ? "🔒" : "👁️"}
          </button>
          {errors.password && (
            <span className={"text-xs text-red-500"}>
              {t("Ushbu qator to'ldirilishi shart")}
            </span>
          )}
        </div>
        <div className="mb-8">
          <Link
            className={"text-[#525D89] text-sm"}
            href={"/auth/forget-password"}
          >
            {t("Parolni unitdingizmi")}
          </Link>
        </div>

        <div className="flex items-center gap-x-[40px] text-[30px] font-semibold mb-[30px]">
          <h1 className="bg-[#E3EFF8] p-[10px]">
            {get(logins, "data.random_number_1")}
          </h1>
          <span>+</span>
          <h1 className="bg-[#E3EFF8] p-[10px]">
            {get(logins, "data.random_number_2")}
          </h1>
          <span> = </span>
          <input
            {...register("sum", { required: true })}
            className={
              "w-full shadow-input h-12 rounded-[5px] outline-none px-3"
            }
            type={"text"}
          />
        </div>
        {/* <div className="mb-8">
          <ReCAPTCHA
            sitekey="6LcC5gsqAAAAAOw-JLW5sh9Ze_Vzp4RDTig6YVin"
            onChange={onChange}
          />
        </div> */}

        <div className="text-center">
          <button
            className={` bg-[#017EFA] rounded-[5px] text-white text-xl font-medium py-2.5 px-7 transition-all duration-500`}
          >
            {t("Kirish")}
          </button>
        </div>
        <div className="mt-5 text-center">
          <Link
            className={"text-[#525D89] text-sm underline"}
            href={"/auth/signup"}
          >
            {t("Ro’yhatdan o’tmaganmisiz?")}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
