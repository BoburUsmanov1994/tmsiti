import React from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";
import Link from "next/link";
import {get} from "lodash";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import Image from "next/image";
import {URLS} from "@/constants/url";
import GridView from "@/containers/grid-view";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";




const columns = [
    {
        title: "№",
        key: "id",
        render: ({ index }) => <span>{index}</span>,
    },
    {
        title: "Yetkazib beruvchi",
        key: "company",
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
        classnames: "text-center",
    },

    {
        title: "Joylangan vaqti",
        key: "material_updated_date",
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

const Index = () => {
    return (
        <Dashboard>
            <Subheader title={'Mening buyurtmalarim'} />
            <div className="p-7">
                <GridView columns={columns} hasActionColumn={true} key={KEYS.orderList} url={URLS.orderList}/>
            </div>
        </Dashboard>
    );
};

export default Index;