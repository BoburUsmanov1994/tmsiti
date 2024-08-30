"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Brand = () => {
  return (
    <Link className={"flex items-center"} href={"/main-page"}>
      <Image
        className={
          "mr-5 desktop:w-[70px] desktop:h-[70px] tablet:w-[56px] tablet:h-[60px] w-[40px] h-[40px]"
        }
        width={56}
        height={60}
        src={"/images/logo.svg"}
        alt={"image"}
      />
      <span className={"font-bold tablet:text-lg text-xs w-auto uppercase"}>
        Qurilish resurslari <br /> milliy klassifikatori
      </span>
    </Link>
  );
};

export default Brand;
