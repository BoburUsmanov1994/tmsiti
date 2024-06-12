import React, {useRef, useState, useTransition} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get, parseInt} from "lodash";
import {useTranslation} from "react-i18next";
import GridView from "@/containers/grid-view";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import usePostQuery from "@/hooks/api/usePostQuery";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import dayjs from "dayjs";
import Title from "@/components/title";
import {config} from "@/config";
import { saveAs } from 'file-saver';
import {findCategoryName} from "@/utils";




const Index = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(48);
    const productCategoryRef = useRef(null);
    const productIdRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)
    const [extractedData, setExtractedData] = useState(null);



    const {data: downloadExcel, isLoadingExcel} = useGetQuery({
        key: KEYS.orderExcel,
        url: URLS.orderExcel
    })

    console.log(downloadExcel?.data);

    const { mutate: sendOrderStatus, isLoading } = usePostQuery({
        listKeyId: "company-info-one",
    });


    const downloadFile = (data,full)=>{
        console.log(full,"FULL")
        saveAs(data, "hello-world.xlsx")
    }


    const handleSendOrderStatus = (id, selectStatus) => {
        const selectedId = +id
        sendOrderStatus({
            url: `${URLS.sendOrderStatus}${selectedId}/`,
            attributes: {
                "order_status": `${selectStatus}`
            }
        })

    }

    function handleListComment({row}) {

        fetch(`${config.API_URL}${URLS.customerComment}`, {
            method: "POST",
            body: JSON.stringify({
                "product_category": row?.product_category,
                "ad_id": parseInt(row?.ad_id),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                const extractedData = data; // replace 'someSpecificField' with the actual field name
                console.log(extractedData);
                if (Array.isArray(extractedData)) {
                    setExtractedData(extractedData);
                } else {
                    console.error("Extracted data is not an array:", extractedData);
                }

            })
    }

    const openModal = () => {
        setIsOpen(!isOpen)

    }


    const columns =[
        {
            title: "№",
            key: "id",
            render: ({ index }) => <span>{index}</span>,
        },
        {
            title: "Buyurtmachi",
            key: "customer",
            render: ({ row }) => <p>{get(row, "first_name")} {get(row, "last_name")}</p>
        },
        {
            title: "Kodi",
            key: "product_code",
        },
        {
            title: "Nomi",
            key: "product_name",
        },
        {
            title: "Telefon raqami",
            key: "phone",
        },
        {
            title: "Vaqti",
            key: "create_at",
            render: ({ value }) =>
                dayjs(value).format("DD.MM.YYYY HH:mm ", "Asia/Tashkent"),
        },
        {
            title: "Narxi",
            key: "price",
            classnames: "text-center",
        },
        {
            title: "Miqdori",
            key: "quantity",
            classnames: "text-center",
        },
        {
            title: "Buyurtmaning holati",
            key: "order_status",
            render: ({row}) =>
                get(row, "order_status") === "new_order" ?
                    <div className={"flex flex-col gap-y-2"}>
                        <button onClick={() => handleSendOrderStatus(get(row, "id"), "accepted")}
                                className={"bg-green-600 hover:bg-green-700 active:bg-green-500 text-white py-2 px-8 rounded-[6px]"}>
                            Qabul qilish
                        </button>
                        <button onClick={() => handleSendOrderStatus(get(row, "id"), "canceled")}
                                className={"bg-red-600 hover:bg-red-700 active:bg-red-500 text-white py-2 px-8 rounded-[6px]"}>
                            Bekor qilish
                        </button>
                    </div>
                    : get(row, "order_status") === "accepted" ?
                        <div>
                            <button onClick={() => handleSendOrderStatus(get(row, "id"), "sent")}
                                    className={"bg-blue-600  hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-8 rounded-[6px] w-full"}>
                                Yuborish
                            </button>
                        </div> : get(row, "order_status") === "sent" ?
                            <div className={"flex flex-col items-center gap-y-2  rounded-[6px]"}>
                                <div className={"flex items-center gap-x-2"}>
                                    <p>Mahsulot yo'lda</p>
                                    <Image src={"/images/success.png"} alt={"success"} width={22} height={22}/>
                                </div>
                            </div> : get(row, "order_status") === "customer_canceled" ?
                                <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                    <p>Buyurtmachi mahsulotni bekor qildi</p>
                                    <Image src={"/images/error.png"} alt={"success"} width={22} height={22}/>
                                </div> : get(row, "order_status") === "customer_accepted" ?
                                    <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                        <p>Mahsulot yetkazildi</p>
                                        <Image src={"/images/success.png"} alt={"success"} width={22} height={22}/>
                                    </div> : get(row, "order_status") === "canceled" ?
                                        <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                            <p>Buyurtmani bekor qildingiz</p>
                                            <Image src={"/images/error.png"} alt={"success"} width={22} height={22}/>
                                        </div> : get(row, "order_status") === "on_way" ?
                                            <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                                <p>Xabar yetkazildi</p>
                                                <Image src={"/images/success.png"} alt={"success"} width={22} height={22}/>
                                            </div> : ""


        },
        {
            title: "Sharhni ko'rish",
            key: "",
            render: ({row, index}) => <div className={""}>
                <button onClick={()=>{
                    setIsOpen(row)
                }} className={"text-center"}>
                    Ko'rish
                </button>

                {Boolean(isOpen) &&
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-smbg-transparent bg-opacity-30">
                        <div
                            className="bg-white p-8 rounded shadow-md w-[700px] h-[500px] overflow-y-scroll flex flex-col">
                            <div className={"flex justify-between items-center"}>
                                <button className={"text-lg "} onClick={() => handleListComment({isOpen})}>Ko'rish</button>

                                <button onClick={() => setIsOpen(!isOpen)}>
                                    <Image

                                        src={"/icons/closeModal.svg"}
                                        alt={"modalcloser"}
                                        width={24}
                                        height={24}
                                        className={
                                            "float-right block cursor-pointer bg-white p-1 rounded-[2px]"
                                        }
                                    />
                                </button>
                            </div>

                            {
                                extractedData?.map((item, index) =>
                                    <div key={index} className={"border mb-[10px] shadow rounded-[10px]"}>
                                        <div className={"flex gap-x-2 p-2 font-bold"}>
                                            <p>{get(item, "first_name")}</p>
                                            <p>{get(item, "last_name")}</p>
                                        </div>

                                        <p className={"text-lg mb-[15px] p-2"}>Mahsulotga berilgan baho</p>
                                        <div className={"mb-[10px] p-2"} style={{display: 'flex', flexDirection: 'row'}}>
                                            {[...Array(get(item, "rating"))].map((star, index) => {

                                                return (
                                                    <label key={index} style={{display: 'inline-block'}}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={get(item, "rating")}
                                                            style={{display: 'none'}}
                                                        />
                                                        <svg
                                                            className="star"
                                                            width="25"
                                                            height="25"
                                                            viewBox="0 0 24 24"
                                                            fill={"#ffd700"}
                                                            fill={"#ffd700"}

                                                        >
                                                            <polygon
                                                                points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8"/>
                                                        </svg>
                                                    </label>
                                                );
                                            })}
                                        </div>

                                        <div className={"w-full mt-[10px]  p-2"}>
                                            <p>{get(item, "comment")}</p>
                                        </div>

                                        <div className={"w-full h-[1px] bg-gray-400 my-[20px]"}></div>
                                        <p className={"text-lg p-2 mb-[15px]"}>Yetkazib beruvchiga berilgan baho</p>
                                        <div style={{display: 'flex', flexDirection: 'row', padding: "6px`"}}>
                                            {[...Array(get(item, "rating_company"))].map((star, index) => {

                                                return (
                                                    <label key={index} style={{display: 'inline-block'}}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={get(item, "rating_company")}
                                                            style={{display: 'none'}}
                                                        />
                                                        <svg
                                                            className="star"
                                                            width="25"
                                                            height="25"
                                                            viewBox="0 0 24 24"
                                                            fill={"#ffd700"}
                                                            fill={"#ffd700"}

                                                        >
                                                            <polygon
                                                                points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8"/>
                                                        </svg>
                                                    </label>
                                                );
                                            })}
                                        </div>

                                    </div>
                                )
                            }

                        </div>
                    </div>
                }
            </div>,

        },
    ]

    return (
        <Dashboard>
            <Subheader title={"Buyurtmalar"}/>

            <div className="p-7">
                <a className={" items-center gap-x-2 inline-flex py-2.5 px-5 min-w-[170px] mb-[30px] rounded-[10px] bg-green-500 hover:bg-green-600 active:bg-green-400 text-white transition-all duration-400"}
                   onClick={() => {
                       downloadFile(downloadExcel?.data, downloadExcel)
                   }}>
                <Image src={'/images/excel.png'} alt={"excel"} width={40} height={40}/>
                    yuklab olish
                </a>


                <GridView columns={columns} key={KEYS.orderListCompany} url={URLS.orderListCompany}
                          defaultPageSize={pageSize}/>
            </div>
        </Dashboard>
    );
};

export default Index;