import React, {useEffect, useRef, useState} from "react";
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";

import Link from "next/link";

import { useCounter } from "@/context/counter";
import { useRouter } from "next/router";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import {get, head, isEmpty, isNull, values} from "lodash";
import { last } from "lodash/array";
import {NumericFormat} from "react-number-format";
import Image from "next/image";
import Button from "@/components/button";
import {sum} from "lodash/math";
import Title from "@/components/title";
import usePostQuery from "@/hooks/api/usePostQuery";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useSettingsStore} from "@/store";

const Index = () => {
  const { state, dispatch } = useCounter();
  const {data: session} = useSession()
  const router = useRouter();
  const token = useSettingsStore(state => get(state, 'token', null))
  const [page, setPage] = useState(1);
  const [basket, setBasket] = useState({})
  const [pageSize, setPageSize] = useState(48);
  const [template, setTemplate] = useState('standard');

  const [isOpen, setIsOpen] = useState(false);
  const materialNameRef = useRef(null);
  const materialCodeRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const companyRef = useRef(null);
  const productIdRef = useRef(null);
  const productCategoryRef = useRef(null);
  const { stir } = router.query;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const selectTemplate = (temp) => {
    setTemplate(temp);
  }

  const {data: user} = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: {token: token ??`${get(session, 'user.token')}`},
    enabled: !!(get(session, 'user.token') || token)
  })


  const {mutate: sendOrders, isLoading: isLoadingOrders} = usePostQuery({listKeyId: "order-one"})


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


  const onSubmit = (e) => {
    e.preventDefault()
    const enteredMaterialName = materialNameRef.current?.textContent;
    const enteredMaterialCode =  materialCodeRef.current?.textContent;
    const enteredQuantity =  +quantityRef.current?.textContent;
    const enteredPrice =  priceRef.current?.textContent;
    const enteredCompany =  companyRef.current?.textContent;
    const productId = +productIdRef.current?.textContent;
    const productCategory = productCategoryRef.current?.textContent;
    const customer =  +get(user, "data.id");
    const phone = isNull(get(user, "data.phone")) ? "+998933151043" : get(user, "data.phone");

    const ProductInfo = {
      product_name: enteredMaterialName,
      product_code: enteredMaterialCode,
      quantity: enteredQuantity,
      price: enteredPrice,
      company: enteredCompany,
      customer: customer,
      phone: phone,
      ad_id: productId,
      product_category: productCategory,
    };

    if(price !== 0) {
      const newBasket = [...basket, ProductInfo];
      setBasket(newBasket)

      sendOrders({
            url: URLS.sendOrders,
            attributes: newBasket,
          },
          {
            onSuccess: () => {
              toast.success('Buyurtma yetkazib beruvchi kompaniyaga yuborildi', {position: 'top-right'})
            }
          })

    }





  }



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

                      <div>
                        <div key={index}
                             className={`grid grid-cols-12 gap-x-2 ${last(item) === 0 ? "hidden" : "visible"}`}>
                          <div className={"col-span-12"}>
                            <h1
                                className={"mb-[30px] text-[#202B57] uppercase font-medium mobile:text-base tablet:text-lg laptop:text-xl desktop:text-2xl text-base "}>
                              {get(JSON.parse(head(item)), "company_name")}
                            </h1>
                            <p ref={companyRef} className={'hidden'}>{get(JSON.parse(head(item)), "company_stir")}</p>
                            <p ref={productIdRef} className={'hidden'}>{get(JSON.parse(head(item)), "id")}</p>
                            <p ref={productCategoryRef} className={'hidden'}>{get(JSON.parse(head(item)), "material_code") ? "material" : get(JSON.parse(head(item)), "mmechano_code") ? "mmechano" : get(JSON.parse(head(item)), "techno_code") ? "techno" : get(JSON.parse(head(item)), "smallmechano_code") ? "smallmechano" : get(JSON.parse(head(item)), "work_code") ? "work" : ""}</p>
                          </div>


                          <div className={`col-span-4 `}>
                          {/* Product description*/}
                            <p ref={materialCodeRef}
                               className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "material_code")) ? "hidden" : "visible"} text-sm text-[#28366D] inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "material_code")}</p>
                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "smallmechano_code")) ? "hidden" : "visible"} text-sm text-[#28366D] inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "smallmechano_code")}</p>
                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "mmechano_code")) ? "hidden" : "visible"} text-sm text-[#28366D] inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "mmechano_code")}</p>
                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "techno_code")) ? "hidden" : "visible"} text-sm text-[#28366D]  inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "techno_code")}</p>
                            <p className={`bg-[#D1E9FF]  ${isEmpty(get(JSON.parse(head(item)), "work_code")) ? "hidden" : "visible"} text-sm text-[#28366D]  inline-flex p-2 my-[10px]`}>{get(JSON.parse(head(item)), "work_code")}</p>

                            {/* Product Name */}
                            <p ref={materialNameRef}
                               className={`text-base font-bold ${isEmpty(get(JSON.parse(head(item)), "material_name")) ? "hidden" : "visible"}`}>{get(JSON.parse(head(item)), "material_name")}</p>
                            <p
                               className={`text-base ${isEmpty(get(JSON.parse(head(item)), "smallmechano_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "smallmechano_name")}</p>
                            <p className={`text-base ${isEmpty(get(JSON.parse(head(item)), "techno_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "techno_name")}</p>
                            <p className={`text-base ${isEmpty(get(JSON.parse(head(item)), "work_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "work_name")}</p>
                            <p className={`text-base ${isEmpty(get(JSON.parse(head(item)), "mmechano_name")) ? "hidden" : "visible"} font-bold`}>{get(JSON.parse(head(item)), "mmechano_name")}</p>
                          </div>

                          <div className={"col-span-4 text-center"}>
                            <h1 className={"text-base font-bold mb-[20px]"}>Tanlangan mahsulot miqdori</h1>
                            <button className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"}
                                    onClick={() => handleDecrement(JSON.parse(head(item)))}>-
                            </button>
                            <p ref={quantityRef} className={"p-3  inline-flex  text-[#28366D]"}>{last(item)}</p>
                            <button className={"p-3 border inline-flex rounded-[6px] bg-[#28366D] text-white"}
                                    onClick={() => handleIncrement(JSON.parse(head(item)))}>+
                            </button>
                          </div>
                          {/*<p>*/}
                          {/*{get(JSON.parse(head(item)), "material_price", 0) **/}
                          {/*    last(item)}*/}
                          {/*  {get(JSON.parse(head(item)), "material_price_currency")}*/}
                          {/*</p>*/}

                          <div className={"col-span-4 text-center"}>
                            <h1 className={"text-lg font-bold mb-[20px]"}>Tanlangan mahsulotning umumiy narxi</h1>
                            <p ref={priceRef}>
                              <NumericFormat
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                  value={get(JSON.parse(head(item)), "material_price", 0) * last(item)}
                                  suffix={` / ${get(JSON.parse(head(item)), "material_measure")}`}
                              />
                            </p>
                          </div>

                          <div className={'col-span-12 w-full h-[1px] bg-[#c5c5c5] my-[20px]'}></div>

                        </div>

                        <div
                            className={`w-1/2 mx-auto gap-x-8 flex justify-center  items-center ${last(item) === 0 ? " !visible" : "hidden"}`}>
                          <div className={"flex gap-x-2 items-center"}>
                            <Image src={"/images/warning.png"} alt={"warning"} width={30} height={30} />
                            <p className={"text-lg"}>Mahsulot savatdan yo'q qilindi</p>
                          </div>
                          <button onClick={() => handleIncrement(JSON.parse(head(item)))} className={"px-[30px]  py-3 rounded-[8px] hover:border-gray-500 border"}>Bekor qilish</button>
                        </div>


                      </div>
                  ))}
                </div>
            }
          </main>
        </Section>
        <Section className="">
          <Button
              handleClick={onSubmit}
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
                  <h1 className="text-xl mb-4">Shartnoma tuzilishidan oldin, birinchi navbatda kamida bitta mahsulot
                    buyurtma qiling!</h1>

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
