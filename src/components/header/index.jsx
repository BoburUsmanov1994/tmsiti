import React, { useState } from "react";
import Image from "next/image";
import Brand from "../brand";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { get } from "lodash";
import useGetQuery from "../../hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import Search from "@/components/search";
import { useRouter } from "next/router";
import BurgerMenu from "@/components/burger-menu";
const Lang = dynamic(() => import("@/components/lang"), { ssr: false });
const Header = (toggleMenu) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const { data: user } = useGetQuery({
    key: KEYS.getMe,
    url: URLS.getMe,
    headers: { token: `${get(session, "user.token")}` },
    enabled: !!get(session, "user.token"),
  });

  return (
    <header>
      <div className={" bg-[#182041]  py-2 relative"}>
        <div className={"container text-white text-sm"}>
          <marquee className="absolute top-0 pt-1 text-red-600">
            <span className="font-semibold text-sm">
              {t("Tizim test rejimida ishlamoqda")}
            </span>
          </marquee>
          <div className={"flex justify-between items-center"}>
            <div className={"flex "}>
              <Image
                width={10}
                height={12.5}
                alt={"map"}
                src={"/icons/map.svg"}
              />
              <span className={"ml-1.5 mr-1 cursor-pointer inline-block"}>
                Toshkent
              </span>
              <Image
                width={9}
                height={6}
                alt={"map"}
                src={"/icons/arrow-down.svg"}
              />
            </div>
            <div className={"flex items-center gap-x-[30px] z-50"}>
              <Link
                href={
                  "https://www.youtube.com/playlist?list=PLO9ysq-3nKVUoY3rBerX7_XkwNkmw6I_h"
                }
                className={"cursor-pointer"}
              >
                Yo‘riqnoma
              </Link>
              <Lang />
            </div>
          </div>
        </div>
      </div>
      <div className={"bg-[#202B57]  py-4 "}>
        <div
          className={
            "container text-white text-sm grid grid-cols-12 justify-center items-center"
          }
        >
          <div className="laptop:col-span-6 col-span-12 laptop:mb-0 mb-[10px]">
            <Brand />
          </div>
          <div className="laptop:col-span-6 col-span-12 ">
            <div className="flex justify-end items-center">
              <Search />
              <Link
                href={"/selected"}
                className={"hidden tablet:block relative ml-6 cursor-pointer"}
              >
                <Image
                  width={36}
                  height={36}
                  alt={"map"}
                  src={"/icons/pin.svg"}
                />
                <span
                  className={
                    "absolute p-1 bg-[#1890FF] text-sm rounded-full text-white w-5 h-5 inline-flex justify-center items-center -top-[5px] -right-[6px]"
                  }
                >
                  3
                </span>
              </Link>
              <Link
                href={"/cart"}
                className={"hidden tablet:block relative ml-6 cursor-pointer"}
              >
                <Image
                  width={36}
                  height={36}
                  alt={"map"}
                  src={"/icons/shopping-bag.svg"}
                />
                <span
                  className={
                    "absolute p-1 bg-[#1890FF] text-sm rounded-full text-white w-5 h-5 inline-flex justify-center items-center -top-[5px] -right-[6px]"
                  }
                >
                  4
                </span>
              </Link>
              <div className={"ml-6 flex items-center"}>
                <Image
                  className={
                    "mr-1 w-[20px] h-[20px] laptop:w-[36px] laptop:h-[36px]"
                  }
                  width={36}
                  height={36}
                  alt={"map"}
                  src={"/icons/user.svg"}
                />
                {/*<button className={"block text-base bg-transparent"}>*/}
                {/*  <Link href={"/dashboard"}>sign in</Link>*/}
                {/*</button>*/}
                {!get(session, "user.token") ? (
                  <div>
                    <button
                      className={
                        "block laptop:text-base text-xs bg-transparent"
                      }
                      onClick={() => signIn()}
                    >
                      {t("signin")}
                    </button>
                    {/*<Link className={'block text-base'} href={'/auth/signup'}>*/}
                    {/*    {t("signup")}*/}
                    {/*</Link>*/}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => router.push("/dashboard")}
                      className={"block text-base bg-transparent"}
                    >
                      {get(user, "data.email")}
                    </button>
                    <button
                      className={"block text-base"}
                      onClick={() => signOut()}
                    >
                      {t("Logout")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
