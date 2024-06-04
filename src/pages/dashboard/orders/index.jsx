import React, {useState, useTransition} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import GridView from "@/containers/grid-view";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import Button from "@/components/button";
import usePostQuery from "@/hooks/api/usePostQuery";




const Index = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(20);

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
            render: ({ row }) =>
                get(row, "order_status") === "new_order" ?
                    <div className={"flex flex-col gap-y-2"}>
                            <button onClick={() => handleSendOrderStatus(get(row, "id"), "accepted")} className={"bg-green-600 hover:bg-green-700 active:bg-green-500 text-white py-2 px-8 rounded-[6px]"}>
                                Qabul qilish
                            </button>
                            <button className={"bg-red-600 hover:bg-red-700 active:bg-red-500 text-white py-2 px-8 rounded-[6px]"}>
                                Bekor qilish

                            </button>
                        </div>
                        : get(row, "order_status") === "accepted" ?
                        <div>
                            <button className={"bg-blue-600  hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-8 rounded-[6px]"}>
                                Yuborish
                            </button>
                        </div> : "new_order"
                ,

            classnames: "text-center",
        },
    ]

    return (
        <Dashboard>
            <Subheader title={"Buyurtmalar"}/>
            <div className="p-7">
                <GridView columns={columns}  key={KEYS.orderListCompany} url={URLS.orderListCompany} defaultPageSize={pageSize} />
            </div>
        </Dashboard>
    );
};

export default Index;