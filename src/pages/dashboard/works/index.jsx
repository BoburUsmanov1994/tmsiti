import React, {useState} from 'react';
import Dashboard from "../../../layouts/dashboard";
import Subheader from "../../../layouts/dashboard/components/subheader";
import Link from "next/link";
import {get} from "lodash";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import Image from "next/image";
import {URLS} from "@/constants/url";
import Button from "@/components/button";
import GridView from "@/containers/grid-view";
import {KEYS} from "@/constants/key";
import {useTranslation} from "react-i18next";

const columns = [
    {
        title: "№",
        key: "id",
        render: ({ index }) => <span>{index}</span>,
    },
    {
        title: "Kodi",
        key: "work_code",
        render: ({ value, row }) => (
            <Link
                className={"underline"}
                href={`/materials/${get(row, "material_code")}`}
            >
                <span className={"text-[#28366D]"}>{value}</span>
            </Link>
        ),
    },
    {
        title: "Nomi",
        key: "work_name",
    },
    {
        title: "Narxi",
        key: "work_price",
        render: ({ value, row }) =>
            value *
            get(currency, `data[${get(row, "work_price_currency")}]`, 1) >
            0 ? (
                <NumericFormat
                    displayType={"text"}
                    className={"text-center bg-transparent"}
                    thousandSeparator={" "}
                    value={(
                        value *
                        get(currency, `data[${get(row, "work_price_currency")}]`, 1)
                    ).toFixed(2)}
                />
            ) : (
                t("by_order")
            ),
        classnames: "text-center",
    },
    {
        title: "Miqdori",
        key: "work_measure",
        classnames: "text-center",
    },
    {
        title: "Joylangan vaqti",
        key: "work_updated_date",
        render: ({ value }) =>
            dayjs(value).format("DD.MM.YYYY HH:mm ", "Asia/Tashkent"),
        classnames: "text-center",
    },
    {
        title: "Action",
        key: "action",
        render: ({ row }) => {
            return (
                <div className={"flex"}>
                    <Link
                        href={`/materials/${get(row, "material_code")}`}
                        className={"mr-1.5 inline"}
                    >
                        <Image
                            className={"inline"}
                            width={20}
                            height={20}
                            src={"/icons/eye-icon.svg"}
                            alt={"eye"}
                        />
                    </Link>
                    <Link href={`${URLS.materials}/${row.id}`}>
                        <Image
                            src={"/icons/edit-icon.svg"}
                            className={"mr-1.5 inline"}
                            width={20}
                            height={20}
                            alt={"edit"}
                        />
                    </Link>
                    <div className={"cursor-pointer"}>
                        <Image
                            className={"inline"}
                            width={20}
                            height={20}
                            src={"/icons/trash-icon.svg"}
                            onClick={() => setItemId(get(row, "id"))}
                            alt={"trash"}
                        />
                    </div>
                </div>
            );
        },
    },
];

const Works = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(20);
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);
    return (
        <Dashboard>
            <Subheader title={'Qurilish ishlari'}/>
            <div className="p-7">
                <div className="grid grid-cols-12">
                    <div
                        className={
                            "col-span-12 flex items-center justify-between mb-[30px]"
                        }
                    >
                        <div className={"flex  items-center gap-x-[30px]"}>
                            <select
                                className={"p-[10px] cursor-pointer"}
                                onChange={(e) => setPageSize(e?.target?.value)}
                                value={pageSize}
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>

                            <span className={"ml-[10px]"}> {t("tadan ko'rish")} </span>

                            <div className={"w-[370px] h-[40px] flex relative "}>
                                <input
                                    type="search"
                                    placeholder={"Qidirish..."}
                                    onChange={(e) => setSearch(e?.target?.value)}
                                    value={search}
                                    className="bg-white h-[40px] w-[370px] pl-[50px]  rounded-lg focus:outline-none hover:cursor-pointer"
                                    name=""
                                />
                                <span className="absolute top-2 left-0 pl-4 z-50">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                  >
                    <g clipPath="url(#clip0_1_1276)">
                      <rect width="24" height="24" fill="white"/>
                      <path
                          d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                          stroke="#516164"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      />
                      <path
                          d="M21 21L15 15"
                          stroke="#516164"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_1276">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                            </div>
                        </div>

                        <Button
                            url={"/dashboard/works/add-ads"}
                            className={
                                "bg-[#1890FF] text-white !border-[#1890FF]  inline-flex items-center"
                            }
                        >
                            <Image
                                className={"mr-1.5"}
                                width={20}
                                height={40}
                                src={"/icons/plus.svg"}
                                alt={"plus"}
                            />
                            {t("E’lon qo’shish")}
                        </Button>
                    </div>
                    <div className={"col-span-12 mb-[10px]"}>
                        <p className={"text-sm text-[#516164]"}>
                            *
                            <NumericFormat
                                value={count}
                                displayType={"text"}
                                thousandSeparator={" "}
                            />{" "}
                            ta natija mavjud
                        </p>
                    </div>
                    <div className="col-span-12 ">
                        <GridView
                            getCount={setCount}
                            url={URLS.myMaterials}
                            key={KEYS.myMaterials}
                            columns={columns}
                            defaultPageSize={pageSize}
                            params={{value: search, key: "all"}}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Works;
