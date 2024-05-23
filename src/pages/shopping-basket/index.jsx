import React, {useEffect, useState} from "react";
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";

import Link from "next/link";

import { useCounter } from "@/context/counter";
import { useRouter } from "next/router";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import {get, head, values} from "lodash";
import { last } from "lodash/array";
import {NumericFormat} from "react-number-format";
import Image from "next/image";
import Button from "@/components/button";
import {sum} from "lodash/math";
import Title from "@/components/title";

const Index = () => {
  const { state, dispatch } = useCounter();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(48);
  const [template, setTemplate] = useState('standard');
  const [isOpen, setIsOpen] = useState(false);
  const { stir } = router.query;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const selectTemplate = (temp) => {
    setTemplate(temp);
  }

  useEffect(() => {

  }, []);

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.companyAds,
    url: `${URLS.companyAds}${stir}/`,
    params: {
      page,
      page_size: pageSize,
    },
  });

  const handleIncrement = (product) => {
    console.log("product", product, JSON.stringify(product));
    dispatch({ type: "INCREMENT", payload: JSON.stringify(product) });
  };

  const handleDecrement = (product) => {
    dispatch({ type: "DECREMENT", payload: JSON.stringify(product) });
    if (state.count <= 0) {
      state.count = 0;
    }
  };



  return (
      <Main>
        <Menu/>
        <Section>


          <main
              className={" bg-white mt-[100px] rounded-[6px] p-[20px]"}
          >
            <div className={"flex justify-between items-center mb-[50px]"}>
              <h1 className={"text-3xl font-bold "}>Savat</h1>

              <div className={"flex gap-x-4"}>
                <button onClick={() => selectTemplate("standard")}>
                  <Image src={'/icons/menu-form1.svg'} alt={'icon'} width={30} height={30}
                         className={`${template === "standard" ? "bg-[#D1E9FF]" : ""}`}/>
                </button>

                <button onClick={() => selectTemplate("table")}>
                  <Image src={'/icons/menu-form2.svg'} alt={'icon'} width={30} height={30}
                         className={`${template === "table" ? "bg-[#D1E9FF]" : ""}`}/>
                </button>
              </div>
            </div>
            {template === "table" && <div>
              {Object.entries(state).map((item, index) => (
                  <div key={index} className={"grid grid-cols-12 gap-x-2"}>
                    <div className={"col-span-12"}>
                      <Title>
                        {get(JSON.parse(head(item)), "company_name")}

                      </Title>
                    </div>
                    <div className={'col-span-3'}>

                      {get(JSON.parse(head(item)), "material_image") ? <Image
                          className={"mx-auto"}
                          width={149}
                          height={105}
                          loader={() => get(JSON.parse(head(item)), "material_image")}
                          src={get(JSON.parse(head(item)), "material_image")}
                          alt={"logo"}
                      /> : <Image
                          className={"mx-auto"}
                          width={149}
                          height={105}
                          src={"/images/company.png"}
                          alt={"logo"}
                      />}

                    </div>
                    <div className={"col-span-3"}>
                      {/*<p>{get(JSON.parse(head(item)), "company_stir")}</p>*/}
                      <p className={"bg-[#D1E9FF] text-sm text-[#28366D] inline-flex p-2 my-[10px]"}>#{get(JSON.parse(head(item)), "material_name")}</p>
                      <p className={"text-base font-bold"}>{get(JSON.parse(head(item)), "material_description")}</p>
                    </div>

                    <div className={"col-span-3 text-center"}>
                      <h1 className={"text-lg font-bold mb-[20px]"}>Tanlangan mahsulot miqdori</h1>
                      <p className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"}>x{last(item)}</p>
                    </div>
                    {/*<p>*/}
                    {/*{get(JSON.parse(head(item)), "material_price", 0) **/}
                    {/*    last(item)}*/}
                    {/*  {get(JSON.parse(head(item)), "material_price_currency")}*/}
                    {/*</p>*/}

                    <div className={"col-span-3 text-center"}>
                      <h1 className={"text-lg font-bold mb-[20px]"}>Tanlangan mahsulotning umumiy narxi</h1>
                      <NumericFormat
                          displayType={"text"}
                          thousandSeparator={" "}
                          value={get(JSON.parse(head(item)), "material_price", 0) * last(item)}
                          suffix={` / ${get(JSON.parse(head(item)), "material_measure")}`}
                      />
                    </div>

                    <div className={'col-span-12 w-full h-[1px] bg-[#c5c5c5] my-[20px]'}></div>

                  </div>
              ))}
            </div>}
            {
                template === "standard" && <div>
                  {Object.entries(state).map((item, index) => (
                      <div key={index} className={"grid grid-cols-12 gap-x-2"}>
                        <div className={"col-span-12"}>
                          <Title>
                            {get(JSON.parse(head(item)), "company_name")}
                          </Title>
                        </div>


                        <div className={"col-span-4"}>
                          <p className={"bg-[#D1E9FF] text-sm text-[#28366D] inline-flex p-2 my-[10px]"}>#{get(JSON.parse(head(item)), "material_name")}</p>
                          <p className={"text-base font-bold"}>{get(JSON.parse(head(item)), "material_description")}</p>
                        </div>

                        <div className={"col-span-4 text-center"}>
                          <h1 className={"text-base font-bold mb-[20px]"}>Tanlangan mahsulot miqdori</h1>
                          <button className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"} onClick={() => handleDecrement(JSON.parse(head(item)))}>-</button>
                          <p className={"p-3  inline-flex  text-[#28366D]"}>{last(item)}</p>
                          <button className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"} onClick={() => handleIncrement(JSON.parse(head(item)))}>+</button>
                        </div>
                        {/*<p>*/}
                        {/*{get(JSON.parse(head(item)), "material_price", 0) **/}
                        {/*    last(item)}*/}
                        {/*  {get(JSON.parse(head(item)), "material_price_currency")}*/}
                        {/*</p>*/}

                        <div className={"col-span-4 text-center"}>
                          <h1 className={"text-lg font-bold mb-[20px]"}>Tanlangan mahsulotning umumiy narxi</h1>
                          <NumericFormat
                              displayType={"text"}
                              thousandSeparator={" "}
                              value={get(JSON.parse(head(item)), "material_price", 0) * last(item)}
                              suffix={` / ${get(JSON.parse(head(item)), "material_measure")}`}
                          />
                        </div>

                        <div className={'col-span-12 w-full h-[1px] bg-[#c5c5c5] my-[20px]'}></div>

                      </div>
                  ))}
                </div>
            }
          </main>
        </Section>
        <Section className="">
          <Button
              handleClick={openModal}
              className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Shartnoma tuzish
          </Button>

          {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md w-[500px] h-auto">
                  <h1 className="text-xl mb-4">Shartnoma tuzilishidan oldin, siz ro'yxatdan o'tishingiz lozim!</h1>
                  <p className="mb-4">Ro'yxatdan o'tish uchun pastdagi tugmani bosing</p>
                  <div className={"flex gap-x-2"}>
                    <Link href={"/auth/signup"}

                          className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Ro'yxatdan o'tish
                    </Link>

                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Yopish
                    </button>
                  </div>
                </div>
              </div>
          )}

          {sum(values(state)) === 0 && isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md w-[500px] h-auto">
                  <h1 className="text-xl mb-4">Shartnoma tuzilishidan oldin, birinchi navbatda kamida bitta mahsulot buyurtma qiling!</h1>

                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Yopish
                    </button>

                </div>
              </div>
          )}
        </Section>
      </Main>
  );
};

export default Index;