import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";

const FondStock = () => {
  const { data: birja, isLoading } = useGetQuery({
    key: KEYS.apiBirja,
    url: URLS.apiBirja,
  });
  return (
    <div className={"bg-[#475ADC] "}>
      <Marquee autoFill={true} pauseOnClick={true} direction={"right"}>
        {get(birja, "data", []).map((item) => (
          <div
            key={get(item, "id")}
            className={"px-[5px] py-[8px] border border-[#c5c5c5] w-[180px] "}
          >
            <div className={"grid grid-rows-6 "}>
              <h4
                className={"line-clamp-3 row-span-4 text-[14px] text-[#F0F3F5]"}
              >
                {get(item, "name")}
              </h4>
              <p className={"text-xs  row-span-1  neon float-right"}>
                {Number(get(item, "price")).toFixed(2)}
              </p>
              <div
                className={"flex items-end justify-end float-right row-span-1"}
              >
                <Image
                  src={"/images/increase.png"}
                  alt={"increase"}
                  width={20}
                  height={20}
                />
                <span
                  className={
                    "text-green-500 row-span-1 place-items-end text-sm "
                  }
                >
                  +798.90(+2.04%)
                </span>
              </div>
            </div>
          </div>
        ))}

        {/*<div className={"px-[5px] py-[8px] border border-[#c5c5c5]"}>*/}
        {/*  <div>*/}
        {/*    <h4>Paxta yog'i</h4>*/}
        {/*    <p className={"text-xs"}>16 817.00</p>*/}
        {/*  </div>*/}

        {/*  <Image*/}
        {/*    src={"/images/decrease.png"}*/}
        {/*    alt={"increase"}*/}
        {/*    width={20}*/}
        {/*    height={20}*/}
        {/*  />*/}
        {/*</div>*/}
      </Marquee>
    </div>
  );
};

export default FondStock;
