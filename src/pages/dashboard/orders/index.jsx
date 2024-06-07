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




const Index = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(48);

    const {data: downloadExcel, isLoadingExcel} = useGetQuery({
        key: KEYS.orderExcel,
        url: URLS.orderExcel
    })

    console.log(downloadExcel);

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
                                    className={"bg-blue-600  hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-8 rounded-[6px]"}>
                                Yuborish
                            </button>
                        </div> : get(row, "order_status") === "sent" ?
                            <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                <p>Mahsulot yuborildi</p>
                                <Image src={"/images/success.png"} alt={"success"} width={22} height={22}/>
                            </div> : get(row, "order_status") === "customer_canceled" ?
                                <div className={"flex items-center gap-x-2  rounded-[6px]"}>
                                    <p>Buyurtmachi mahsulotni bekor qildi</p>
                                    <Image src={"/images/error.png"} alt={"success"} width={22} height={22}/>
                                </div> : ""
            ,

            classnames: "text-center",
        },
    ]

    return (
        <Dashboard>
            <Subheader title={"Buyurtmalar"}/>
            <div>
                <button>yuklab olish</button>
            </div>
            <div className="p-7">
                <GridView columns={columns} key={KEYS.orderListCompany} url={URLS.orderListCompany}
                          defaultPageSize={pageSize}/>
            </div>
        </Dashboard>
    );
};

export default Index;