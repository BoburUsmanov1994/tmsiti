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




const Index = () => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(20);


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
            render: ({row}) => {
                {
                    get(row, "order_status") === "new_order" ?
                        <div className={"flex"}>
                            <button>
                                Qabul qilish
                            </button>
                            <button>
                                Bekor qilish
                            </button>
                        </div>
                        : get(row, "order_status") === "accepted" ?
                        <div>
                            <button>
                                Yuborish
                            </button>
                        </div> : "new_order"
                }
            },
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