import React, {useRef} from "react";
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import { useRouter } from "next/router";
import ErrorPage from "@/pages/500";
import { ContentLoader } from "@/components/loader";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Image from "next/image";
import {get, values} from "lodash";
import Select from "@/components/select";
import GridView from "@/containers/grid-view";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getOptionList } from "@/utils";
import Link from "next/link";
import {useCounter} from "@/context/counter";
import {sum} from "lodash/math";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useSettingsStore} from "@/store";
import Title from "@/components/title";

const ViewPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const {data: session} = useSession();
  const inputRef = useRef(null);
  const [comments, setComments] = useState([])
  const token = useSettingsStore(state => get(state, 'token', null))
  const { t } = useTranslation();
  const [regionId, setRegionId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  const { state, dispatch } = useCounter();

  const handleIncrement = (product) => {
    console.log("product", product, JSON.stringify(product));
    dispatch({ type: "INCREMENT", payload: JSON.stringify(product) });
    toast.success('Tanlagan mahsulotingiz savatchaga qo\'shildi!', {
      duration: 3000,
      position: "top-left"
    });

  };

  const { data: customer } = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: {token: token ??`${get(session, 'user.token')}`},
    enabled: !!(get(session, 'user.token') || token)
  })

  const submitComment = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;


    const firstName = get(customer, "data.first_name")
    const lastName = get(customer, "data.last_name")

    const info = {
      inputValue,
      firstName,
      lastName
    }
    if (inputValue.trim()) {
      const newComments = [...comments, info];
      setComments(newComments);
      localStorage.setItem('comments', JSON.stringify(newComments));
      inputRef.current.value = ''; // Clear the input field after submission
    }
  }

  const deleteComment = (index) => {
    const newComments = comments.filter((_, i) => i !== index);
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
  };


  const {data: smallMechanoAds, isLoading: isLoadingMaterialAds} = useGetQuery({
    key: KEYS.smallMechanosAds,
    url: `${URLS.smallMechanosAds}${code}/`,

  })
  const { data: currency } = useGetQuery({
    key: KEYS.currency,
    url: URLS.currency,
  });
  const {
    data: material,
    isLoading,
    isError,
  } = useGetQuery({
    key: [KEYS.smallMechanos, code],
    url: `${URLS.smallMechanos}${code}/`,
    enabled: !!code,
  });

  const { data: regions, isLoading: isLoadingRegion } = useGetQuery({
    key: [KEYS.territories, "regions"],
    url: `${URLS.territories}`,
    params: {
      key: "regions",
    },
  });
  const { data: districts, isLoading: isLoadingDistrict } = useGetQuery({
    key: [KEYS.territories, regionId, "districts"],
    url: `${URLS.territories}`,
    params: {
      key: "districts",
      filter: regionId,
    },
    enable: !!regionId,
  });

  const totalPrice = get(smallMechanoAds, "data.results", []).reduce((sumResult, price) => sumResult + (price["smallmechano_rent_price"] * get(currency, `data[${price["smallmechano_rent_price_currency"]}]`, 1)), 0)
  const averagePrice = +(totalPrice / get(smallMechanoAds, "data.results", []).length).toFixed(2)

  const maxPrice = get(smallMechanoAds, "data.results", []).reduce((max, obj) => {
    return obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) > max ? obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) : max
  }, 0)

  const minPrice = get(smallMechanoAds, "data.results", []).reduce((min, obj) => {
    return obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) < min ? obj["smallmechano_rent_price"] * get(currency, `data[${obj["smallmechano_rent_price_currency"]}]`, 1) : min
  }, Infinity)


  const columns = [
    {
      title: "№",
      key: "id",
      render: ({ index }) => <span className={"font-semibold"}>{index}</span>,
    },
    {
      title: t("Logo"),
      key: "material_image",
      render: () => (
        <Image
          className={"mx-auto"}
          width={80}
          height={56}
          src={"/images/company.png"}
          alt={"logo"}
        />
      ),
      classnames: "text-center",
    },

    {
      title: t("Korxona nomi"),
      key: "company_name",
      render: ({ value, row }) => (
        <Link
          href={`/company/${get(row, "company_stir")}`}
          className={"underline text-[#146BBC]"}
        >
          {value}
        </Link>
      ),
      classnames: "text-center, ",
      sorter: true,
    },
    {
      title: t("Mahsulot tavsifi"),
      key: "smallmechano_description",
    },
    {
      title: t("Sertifikat"),
      key: "sertificate_blank_num",
      render: ({ row }) => (
        <div className={"group relative inline-block cursor-pointer"}>
          <Image
            className={"mx-auto"}
            width={24}
            height={24}
            src={"/images/certificate.png"}
            alt={"certificate"}
          />
          <ul className="text-left text-white hidden group-hover:block absolute left-full bottom-full p-2.5 bg-[#3D7AB6] w-[200px] rounded shadow-[5px_5px_15px_rgba(0, 0, 0, 0.1)]">
            {get(row, "sertificate_blank_num") &&
            get(row, "sertificate_reestr_num") &&
            get(row, "sertificate_reestr_num")?.length > 1 &&
            get(row, "sertificate_blank_num")?.length > 1 ? (
              <>
                <li>
                  {t("Blank raqami")}: {get(row, "sertificate_blank_num")}
                </li>
                <li>
                  {t("Reestr raqami")}: {get(row, "sertificate_reestr_num")}
                </li>
                <li className={"underline"}>
                  <a
                    target={"_blank"}
                    href={`http://sert2.standart.uz/site/register?Search[number_of_blank]=${get(
                      row,
                      "sertificate_blank_num",
                    )}&Search[gov_register]=${get(
                      row,
                      "sertificate_reestr_num",
                    )}`}
                  >
                    {t("Tekshirish")}
                  </a>
                </li>
              </>
            ) : (
              <li>{t("Ma’lumot mavjud emas")}</li>
            )}
          </ul>
        </div>
      ),
      classnames: "text-center",
    },
    {
      title: t("Narxi(so`m)"),
      key: "smallmechano_rent_price",
      render: ({ value, row }) =>
        value *
          get(
            currency,
            `data[${get(row, "smallmechano_rent_price_currency")}]`,
            1,
          ) >
        0 ? (
          <NumericFormat
            displayType={"text"}
            className={"text-center bg-transparent"}
            thousandSeparator={" "}
            value={
              value *
              get(
                currency,
                `data[${get(row, "smallmechano_rent_price_currency")}]`,
                1,
              )
            }
            suffix={` (${get(row, "smallmechano_measure")})`}
          />
        ) : (
          t("by_order")
        ),
      classnames: "text-center",
      sorter: true,
    },
    {
      title: t("Kompaniya telefon raqami"),
      key: "phone_number",
      render: ({ value }) => (
        <Link href={`tel:${value}`} className={"text-[#146BBC]"}>
          {value}
        </Link>
      ),
      classnames: "text-center",
    },
    {
      title: t("Oxirgi o’zgarish"),
      key: "smallmechano_updated_date",
      render: ({ value }) => dayjs(value).format("DD.MM.YYYY HH:mm"),
      classnames: "text-center",
      sorter: true,
    },
    {
      title: t("Action"),
      key: "action",
      render: ({row}) => (
          <div className={"flex items-center justify-between gap-x-4 relative"}>
            <Image
                onClick={() => handleIncrement(row)}
                className={"mx-auto cursor-pointer"}
                width={24}
                height={24}
                src={"/images/shopping.png"}
                alt={"certificate"}
            />

            <Image
                className={"mx-auto cursor-pointer"}
                width={24}
                height={24}
                src={"/icons/stick.svg"}
                alt={"certificate"}
            />
          </div>
      ),
      classnames: "text-center",
    },
  ];

  if (isError) {
    return <ErrorPage/>;
  }

  if (isLoading) {
    return (
        <Main>
          <ContentLoader/>
        </Main>
    );
  }

  return (
      <>
        <Main>
          <Menu active={4}/>
          <Section className={"!bg-white"}>
            <div className="grid grid-cols-12">
              <div
                  className="tablet:col-span-5 col-span-12  items-center flex justify-center tablet:items-start tablet:justify-start relative h-64">
                {get(material, "data.smallmechano_image") ? (
                    <Image
                        className={"mr-2"}
                        layout={"fill"}
                        objectFit={"contain"}
                        loader={() => get(material, "data.smallmechano_image")}
                        src={get(material, "data.smallmechano_image")}
                        alt={"code"}
                    />
                ) : (
                    <Image
                        className={
                          "laptop:w-[370px] laptop:h-[260px] tablet:w-[330px] tablet:h-[220px] w-[300px] h-[200px]"
                        }
                        width={370}
                        height={260}
                        src={"/images/material.png"}
                        alt={"company"}
                    />
                )}
              </div>
              <div className="tablet:col-span-7 col-span-12">
                <div className="flex tablet:justify-start tablet:items-start justify-center items-center">
                  <div className={"inline-flex mr-8"}>
                    <Image
                        className={
                          "mr-2 tablet:w-[20px] tablet:h-[20px] laptop:w-[24px] laptop:h-[24px] w-[18px] h-[18px]"
                        }
                        width={24}
                        height={24}
                        src={"/icons/code.svg"}
                        alt={"code"}
                    />
                    <span
                        className={
                          "font-medium tablet:text-sm laptop:text-base text-xs"
                        }
                    >
                    #{get(material, "data.smallmechano_csr_code")}
                  </span>
                  </div>
                  <div className={"inline-flex mr-8"}>
                    <Image
                        className={
                          "mr-2 tablet:w-[20px] tablet:h-[20px] laptop:w-[24px] laptop:h-[24px] w-[18px] h-[18px]"
                        }
                        width={24}
                        height={24}
                        src={"/icons/eye.svg"}
                        alt={"code"}
                    />
                    <span
                        className={
                          "font-medium tablet:text-sm laptop:text-base text-xs"
                        }
                    >
                    {get(material, "data.material_views_count", 0)}
                  </span>
                  </div>
                  <div className={"inline-flex mr-8 cursor-pointer"}>
                    <Image
                        className={
                          "mr-1.5 tablet:w-[20px] tablet:h-[20px] laptop:w-[24px] laptop:h-[24px] w-[18px] h-[18px]"
                        }
                        width={24}
                        height={24}
                        src={"/icons/stick.svg"}
                        alt={"code"}
                    />
                    <span
                        className={
                          "font-medium tablet:text-sm laptop:text-base text-xs"
                        }
                    >
                    {t("Saqlash")}
                  </span>
                  </div>
                </div>
                <h2
                    className={
                      "my-3 laptop:text-xl tablet:tex-lg text-base tablet:text-start  text-center  font-semibold"
                    }
                >
                  {get(material, "data.smallmechano_name")}
                </h2>
                {/*<div className="flex mb-5 ">*/}
                {/*    <div className={'inline-flex mr-20'}>*/}
                {/*        <strong className={'font-medium text-[#212529] mr-1'}>O’rtacha narx: </strong><span*/}
                {/*        className={'text-[#4B5055]'}> 504 000 so’m</span>*/}
                {/*    </div>*/}
                {/*    <div className={'inline-flex'}>*/}
                {/*        <strong className={'font-medium text-[#212529] mr-1'}>O’rtacha joriy narx: </strong><span*/}
                {/*        className={'text-[#4B5055]'}> 504 000 so’m</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <p className={"text-[#4B5055] text-sm"}>
                  {get(material, "data.material_desc", "")}
                </p>
              </div>
            </div>

            <div className={"grid-cols-12 grid mt-[20px] tablet:gap-x-4 gap-y-8 "}>
              <div className={"tablet:col-span-4 col-span-12 p-[20px] shadow-2xl rounded-[4px]"}>
                <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Davlat soliq qo'mitasi</h4>
                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'tgan oydagi savdolar soni:</p>
                  <span className={"text-sm"}>20</span>
                </div>

                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'rtacha narx:</p>
                  <span className={"text-sm"}>20</span>
                </div>
              </div>
              <div className={"tablet:col-span-4 col-span-12 p-[20px] shadow-2xl rounded-[4px]"}>
                <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Tovar xom-ashyo birjasi</h4>
                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'tgan oydagi savdolar hajmi(4 hafta):</p>
                  <span className={"text-sm"}>20</span>
                </div>

                <div className={"flex justify-between"}>
                  <p className={"text-sm mb-[5px]"}>O'rtacha narx:</p>
                  <span className={"text-sm"}>20</span>
                </div>
              </div>
              <div className={"tablet:col-span-4 col-span-12 p-[20px] shadow-2xl rounded-[4px]"}>
                <div className={"flex gap-x-2"}>
                  <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Maksimal narx:</h4>
                  <NumericFormat thousandSeparator={" "} value={maxPrice} suffix={" so`m"} className={"mb-[10px]"}/>
                </div>
                <div className={"flex gap-x-2"}>
                  <h4 className={"mb-[8px] text-[#22497C] font-bold"}>O'rtacha narx:</h4>
                  <NumericFormat thousandSeparator={" "} value={averagePrice} suffix={" so`m"} className={"mb-[10px]"}/>
                </div>
                <div className={"flex gap-x-2"}>
                  <h4 className={"mb-[8px] text-[#22497C] font-bold"}>Minimum narx:</h4>
                  <NumericFormat thousandSeparator={" "} value={minPrice} suffix={" so`m"} className={"mb-[10px]"}/>
                </div>
              </div>
            </div>
          </Section>
          <Section>
            <div className="grid grid-cols-12">
              <div className="col-span-12 ">
                <GridView
                    HeaderBody={
                      <div className="flex tablet:flex-row  flex-col mb-5">
                        <Select
                            getValue={(val) => setRegionId(get(val, "value"))}
                            sm
                            label={t("region")}
                            options={getOptionList(
                                get(regions, "data.results", []),
                                "id",
                                "region_name",
                            )}
                        />
                        <div className="tablet:ml-8 tablet:mt-0 mt-[15px]   ">
                          <Select
                              getValue={(val) => setDistrictId(get(val, "value"))}
                              sm
                              label={t("district")}
                              options={getOptionList(
                                  get(districts, "data.results", []),
                                  "id",
                                  "district_name",
                              )}
                          />
                        </div>
                      </div>
                    }
                    url={`${URLS.smallMechanosAds}${code}/`}
                    key={KEYS.smallMechanosAds}
                    params={{
                      region: regionId,
                      district: districtId,
                    }}
                    columns={columns}
                />
              </div>
            </div>
          </Section>

          <Section>
            <div className={"bg-white p-4"}>
              <Title>Sharh</Title>
              <p className={"mb-[15px]"}>Mahsulot bo'yicha o'z fikringiz, taklifingiz yoki e'tirozlaringizni
                qoldirishingiz mumkin</p>
              {comments.map((comment, index) =>
                  <div key={index} className={" w-full border mb-[30px] rounded-[6px] shadow-xl p-2"}>
                    <p className={"text-sm text-gray-400"}>{get(comment, "firstName")} {get(comment, "lastName")}</p>
                    <h1 className={"text-lg"}>{get(comment, "inputValue")}</h1>
                    <button className={"bg-red-500 px-[30px] text-white text-sm mt-[50px] active:bg-red-400 hover:bg-red-600 rounded-[6px] py-[5px]"} onClick={() => deleteComment(index)}>O'chirish</button>
                  </div>
              )}



              <form className={"flex gap-x-8"} onClick={submitComment}>

                <input ref={inputRef} type={"text"} className={'w-2/3 border rounded-[6px] h-[50px] text-base px-2'}
                       placeholder={"Izoh yozishingiz uchun joy"}/>
                <button
                    className={"w-1/3 border h-[50px] bg-[#62B3FF] text-white active:bg-blue-500 rounded-[6px]"}>Yuborish
                </button>
              </form>
            </div>
          </Section>
        </Main>
      </>
  );
};

export default ViewPage;
