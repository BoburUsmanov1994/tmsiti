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

];

const Index = () => {
    return (
        <Dashboard>
            <Subheader title={'Mening buyurtmalarim'} />
            <div className="p-7">
                <GridView columns={columns} key={KEYS.orderListCustomer} url={URLS.orderListCustomer}/>
            </div>
        </Dashboard>
    );
};

export default Index;