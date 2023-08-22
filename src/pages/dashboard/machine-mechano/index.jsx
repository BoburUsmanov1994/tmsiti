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

const MachineMechano = () => {
    const {t} = useTranslation();
    const [pageSize, setPageSize] = useState(20);


    const columns = [
        {
            title: '№',
            key: 'id',
            render: ({index}) => <span>{index}</span>
        },
        {
            title: 'Kodi',
            key: 'material_csr_code',
            render: ({value}) => <span className={'text-[#28366D]'}>{value}</span>
        },
        {
            title: 'Nomi',
            key: 'material_name',
        },
        {
            title: 'Narxi',
            key: 'material_price',
            classnames: 'text-center'
        },
        {
            title: 'Miqdori',
            key: 'material_measure',
            classnames: 'text-center'
        },
        {
            title: 'Joylangan vaqti',
            key: 'material_date',
            classnames: 'text-center'
        },
        {
            title: 'Ko’rildi',
            key: 'material_views_count',
            classnames: 'text-center'
        },
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
                            url={URLS.machinesMechanos}
                            key={[KEYS.machinesMechanos,pageSize]}
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