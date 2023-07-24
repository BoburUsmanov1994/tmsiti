import React from 'react';
import Dashboard from "../../../layouts/dashboard";
import Subheader from "../../../layouts/dashboard/components/subheader";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import Select from "@/layouts/dashboard/components/select";
import Image from "next/image";
import Button from "@/components/button";
import {useTranslation} from "react-i18next";
import Search from "@/layouts/dashboard/components/search";

const Materials = () => {
    const {t} = useTranslation();

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
            <Subheader title={'Qurilish materiallari'}/>
            <div className="p-7">
                <div className="grid grid-cols-12">
                    <div className={'col-span-12 flex items-center justify-between'}>
                        <div className={'flex  items-center'}>
                            <Select/>
                            <span className={'ml-[10px]'}> tadan ko'rish </span>

                            <Search classname={'ml-[31px]'}/>
                        </div>

                        <Button
                                className={'bg-[#1890FF] text-white !border-[#1890FF]  inline-flex items-center'}>
                            <Image

                                className={'mr-1.5'} width={20} height={40} src={'/icons/plus.svg'}
                                alt={'plus'}
                            />{

                            t("E’lon qo’shish")}
                        </Button>
                    </div>
                    <div className="col-span-12 ">
                        <GridView
                            hasActionColumn
                            url={URLS.myMaterials}
                            key={KEYS.myMaterials}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Materials;