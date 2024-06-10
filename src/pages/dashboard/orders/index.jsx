import React, {useState, useTransition} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import GridView from "@/containers/grid-view";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import usePostQuery from "@/hooks/api/usePostQuery";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import dayjs from "dayjs";




const Index = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(48);

    const {data: downloadExcel, isLoadingExcel} = useGetQuery({
        key: KEYS.orderExcel,
        url: URLS.orderExcel
    })

    console.log(downloadExcel?.data);

    const { mutate: sendOrderStatus, isLoading } = usePostQuery({
        listKeyId: "company-info-one",
    });



    const handleSendOrderStatus = (id, selectStatus) => {
        const selectedId = +id
        sendOrderStatus({
            url: `${URLS.sendOrderStatus}${selectedId}/`,
            attributes: {
                "order_status": `${selectStatus}`
            }
        })

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
                                    <p>Mahsulot yuborildi</p>
                                    <Image src={"/images/success.png"} alt={"success"} width={22} height={22}/>
                                </div>
                                <button
                                    className={"flex bg-yellow-600 text-white w-full py-2 px-2 justify-center text-center rounded-[6px] hover:bg-yellow-700 active:bg-yellow-500 items-center gap-x-2"}
                                    onClick={() => handleSendOrderStatus(get(row, "id"), "on_way")}>
                                    <p className={"!text-start"}>Yo'ldaligini aytish</p>
                                </button>
                            </div> : get(row, "order_status") === "customer_canceled" ?
                                <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                    <p>Buyurtmachi mahsulotni bekor qildi</p>
                                    <Image src={"/images/error.png"} alt={"success"} width={22} height={22}/>
                                </div> : get(row, "order_status") === "customer_accepted" ?
                                    <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                        <p>Buyurtmachi qabul qildi</p>
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
    ]

    return (
        <Dashboard>
            <Subheader title={"Buyurtmalar"}/>

            <div className="p-7">
                <a className={" items-center gap-x-2 inline-flex py-2.5 px-5 min-w-[170px] mb-[30px] rounded-[10px] bg-green-500 hover:bg-green-600 active:bg-green-400 text-white transition-all duration-400"}
                   href={`${downloadExcel?.data}`} download>
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