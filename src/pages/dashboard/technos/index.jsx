import React, {useState} from 'react';
import Dashboard from "../../../layouts/dashboard";
import Subheader from "../../../layouts/dashboard/components/subheader";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import Image from "next/image";
import Button from "@/components/button";
import {useTranslation} from "react-i18next";
import Search from "@/layouts/dashboard/components/search";
import PageSizeSelector from "@/layouts/dashboard/components/select";
import {get} from "lodash";
import {NumericFormat} from "react-number-format";
import useGetQuery from "@/hooks/api/useGetQuery";
import dayjs from "dayjs";
import Link from "next/link";

const Technos = () => {
    const {t} = useTranslation();
    const [pageSize, setPageSize] = useState(20);
    const [count, setCount] = useState(0)


    const {data, isLoading} =useGetQuery({
        key: KEYS.myTechnos,
        url: URLS.myTechnos
    })
    const columns = [
        {
            title: '№',
            key: 'id',
            render: ({index}) => <span>{index}</span>
        },
        {
            title: 'Kodi',
            key: 'techno_code',
            render: ({value, row}) =><Link className={'underline'} href={`/technos/${get(data, `data.techno_code`)}`}>
                <span className={'text-[#28366D]'}>{value}</span>
            </Link>
        },
        {
            title: 'Nomi',
            key: 'techno_name',
        },
        {
            title: 'Narxi',
            key: 'techno_price',
            render: ({
                         value,
                         row
                     }) => (value * get(data, `data[${get(row, 'techno_price_currency')}]`, 1) > 0 ?
                <NumericFormat displayType={'text'} className={'text-center bg-transparent'}
                               thousandSeparator={' '}
                               value={(value * get(data, `data[${(get(row, 'techno_price_currency'))}]`, 1)).toFixed(2)}/> : t("by_order")),
            classnames: 'text-center'
        },
        {
            title: 'Miqdori',
            key: 'techno_measure',
            classnames: 'text-center'
        },
        {
            title: 'Joylangan vaqti',
            key: 'techno_created_date',
            render: ({date}) => <span>{dayjs(get(data, `data[${get(date, 'techno_created_date')}]`)).format("DD.MM.YYYY, HH:mm")}</span>,
            classnames: 'text-center',



        },
        // {
        //     title: 'Ko’rildi',
        //     key: 'techno_views_count',
        //     classnames: 'text-center'
        // },
    ]
    return (
        <Dashboard>
            <Subheader title={'Uskuna va qurilmalar'}/>
            <div className="p-7">
                <div className="grid grid-cols-12">
                    <div className={'col-span-12 flex items-center justify-between mb-[30px]'}>
                        <div className={'flex  items-center'}>

                            <select className={'p-[10px] cursor-pointer'}  onChange={(e)=>setPageSize(e?.target?.value)} value={pageSize}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </select>

                            <span className={'ml-[10px]'}> {t("tadan ko'rish")} </span>

                            <Search classname={'ml-[31px]'}/>
                        </div>

                        <Button url={'/dashboard/technos/add-ads'}
                                className={'bg-[#1890FF] text-white !border-[#1890FF]  inline-flex items-center'}>
                            <Image

                                className={'mr-1.5'} width={20} height={40} src={'/icons/plus.svg'}
                                alt={'plus'}
                            />{

                            t("E’lon qo’shish")}
                        </Button>
                    </div>
                    <div className={'col-span-12 mb-[10px]'}>
                        <p className={'text-sm text-[#516164]'}>*<NumericFormat value={count}
                                                                                displayType={'text'}
                                                                                thousandSeparator={" "}/> ta natija
                            mavjud</p>
                    </div>
                    <div className="col-span-12 ">
                        <GridView
                            getCount={setCount}
                            hasActionColumn
                            url={URLS.myTechnos}
                            key={[KEYS.myTechnos,pageSize]}
                            columns={columns}
                            defaultPageSize={pageSize}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Technos;