import React, {useState} from 'react';
import Dashboard from "../../../layouts/dashboard";
import Subheader from "../../../layouts/dashboard/components/subheader";
import {useTranslation} from "react-i18next";
import Search from "@/layouts/dashboard/components/search";
import Button from "@/components/button";
import Image from "next/image";
import GridView from "@/containers/grid-view";
import {URLS} from "@/constants/url";
import {KEYS} from "@/constants/key";
import {get} from "lodash";
import {NumericFormat} from "react-number-format";
import useGetQuery from "@/hooks/api/useGetQuery";
import dayjs from "dayjs";
import Link from "next/link";
import {useRouter} from "next/router";

const MachineMechano = () => {
    const {t} = useTranslation();
    const [pageSize, setPageSize] = useState(20);
    const router = useRouter();
    const { id } = router.query;

    const { data: currency } = useGetQuery({
        key: KEYS.currency,
        url: URLS.currency,
    });
    const {data, isLoading} =useGetQuery({
        key: KEYS.myMachineMechano,
        url: URLS.myMachineMechano
    })




    const columns = [
        {
            title: '№',
            key: 'id',
            render: ({index}) => <span>{index}</span>
        },
        {
            title: "Kodi",
            key: "mmechano_csr_code",
            render: ({ value, row }) => (
                <Link
                    className={"underline"}
                    href={`machine-mechano/${get(row, "mmechano_csr_code")}`}
                >
                    <span className={"text-[#28366D]"}>{value}</span>
                </Link>
            ),
        },
        {
            title: 'Nomi',
            key: 'mmechano_name',
        },
        {
            title: "Narxi",
            key: "mmechano_rent_price",
            render: ({ value, row }) =>
                value *
                get(currency, `data[${get(row, "mmechano_rent_price_currency")}]`, 1) >
                0 ? (
                    <NumericFormat
                        displayType={"text"}
                        className={"text-center bg-transparent"}
                        thousandSeparator={" "}
                        value={(
                            value *
                            get(currency, `data[${get(row, "mmechano_rent_price_currency")}]`, 1)
                        ).toFixed(2)}
                    />
                ) : (
                    t("by_order")
                ),
            classnames: "text-center",
        },
        {
            title: 'Miqdori',
            key: 'mmechano_measure',
            classnames: 'text-center'
        },
        {
            title: 'Joylangan vaqti',
            key: 'mmechano_updated_date',
            render: ({date}) => <span>{dayjs(get(data, `data[${get(date, 'mmechano_created_date')}]`)).format("DD.MM.YYYY, HH:mm")}</span>,
            classnames: 'text-center'
        },

        {
            title: "Action",
            key: "action",
            render: ({ row }) => {
                return (
                    <div className={"flex"}>
                        <Link
                            href={`/machine-mechano/${get(row, "mmechano_csr_code")}`}
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
                        <Link href={`${URLS.machinesMechanos}${row.id}`}>
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
                                alt={"trash"}
                            />
                        </div>
                    </div>
                );
            },
        },
        // {
        //     title: 'Ko’rildi',
        //     key: 'material_views_count',
        //     classnames: 'text-center'
        // },
    ]
    return (
        <Dashboard>
            <Subheader title={'Mashina va mexanizmlar'}/>
            <div className="p-7">
                <div className="grid grid-cols-12">
                    <div className={'col-span-12 flex items-center justify-between mb-[30px]'}>
                        <div className={'flex  items-center'}>

                            <select className={'p-[10px] cursor-pointer'} onChange={(e)=>setPageSize(e?.target?.value)} value={pageSize}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>

                            <span className={'ml-[10px]'}> {t("tadan ko'rish")} </span>

                            <Search classname={'ml-[31px]'}/>
                        </div>

                        <Button url={'/dashboard/machine-mechano/add-ads'}
                            className={'bg-[#1890FF] text-white !border-[#1890FF]  inline-flex items-center'}>

                            <Image
                                className={'mr-1.5'} width={20} height={40} src={'/icons/plus.svg'}
                                alt={'plus'}
                            />{t("E’lon qo’shish")}
                        </Button>
                    </div>
                    <div className="col-span-12 ">
                        <GridView
                            hasActionColumn
                            url={URLS.myMachineMechano}
                            key={[KEYS.myMachineMechano,pageSize]}
                            columns={columns}
                            defaultPageSize={pageSize}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default MachineMechano;