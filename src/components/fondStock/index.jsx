import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, head } from "lodash";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

const FondStock = () => {
  const [open, setOpen] = useState(false);
  const { data: birja, isLoading } = useGetQuery({
    key: KEYS.apiBirja,
    url: URLS.apiBirja,
  });

  const Collapse = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className={"text-center bg-[#202B57] cursor-pointer py-3"}>
        <h3
          className={
            "!text-[#fff] tracking-normal hover:tracking-wide transition-all duration-500  hover:underline"
          }
        >
          Tovar-xom ashyo birjasi
        </h3>

        {head(
          get(birja, "data")?.map((item) => (
            <p key={get(item, "id")} className={"text-[#fff] text-sm"}>
              ({dayjs(get(item, "startdate")).format("DD.MM.YYYY")} -
              {dayjs(get(item, "enddate")).format("DD.MM.YYYY")})
            </p>
          ))
        )}
      </div>
      <div className={` bg-[#E7EEFC] transition-all duration-500`}>
        <div>
          <Marquee autoFill={true} pauseOnClick={true} direction={"right"}>
            {get(birja, "data", []).map((item, index) => (
              <div
                key={index}
                className={
                  "p-[15px] bg-white flex gap-x-[10px] justify-between w-[400px] h-[150px] mx-[10px] my-[10px] rounded-[10px]"
                }
              >
                <div className={"min-w-[156px] max-h-[130px]"}>
                  <Image
                    src={`/images/fond_image${(index % 7) + 1}.png`}
                    alt={"announcement"}
                    width={156}
                    height={120}
                    className={"w-[156px] h-[120px]"}
                  />
                </div>

                <div className="flex flex-col">
                  <h4
                    className={
                      "line-clamp-3  text-[14px] text-black mb-[10px] "
                    }
                  >
                    {get(item, "name")}
                  </h4>
                  <NumericFormat
                    thousandSeparator={" "}
                    value={Number(get(item, "price")).toFixed(1)}
                    className="bg-transparent text-sm font-semibold flex-grow"
                  />

                  <div className={"flex items-center justify-end   "}>
                    {Number(get(item, "changeSum")) > 0 ? (
                      <Image
                        src={"/images/increase.png"}
                        alt={"increase"}
                        width={20}
                        height={20}
                      />
                    ) : Number(get(item, "changeSum")) < 0 ? (
                      <Image
                        src={"/images/decrease.png"}
                        alt={"decrease"}
                        width={20}
                        height={20}
                      />
                    ) : (
                      ""
                    )}

                    <span
                      className={`${
                        Number(get(item, "changeSum")) > 0
                          ? "text-green-500"
                          : Number(get(item, "changeSum")) < 0
                          ? "text-red-500"
                          : "text-[#DE9C00]"
                      }  row-span-1  text-sm `}
                    >
                      {Number(get(item, "changeSum")).toFixed(2)}(
                      {get(item, "changePresent")})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default FondStock;
