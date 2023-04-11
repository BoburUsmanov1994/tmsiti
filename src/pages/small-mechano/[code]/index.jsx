import React from 'react';
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import {useRouter} from "next/router";
import ErrorPage from "@/pages/500";
import {ContentLoader} from "@/components/loader";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import Image from "next/image";
import {get} from "lodash";
import Select from "@/components/select";
import GridView from "@/containers/grid-view";
import {NumericFormat} from 'react-number-format';
import dayjs from "dayjs";

const columns = [
    {
        title: '№',
        key: 'id',
        render: ({index}) => <span className={'font-semibold'}>{index}</span>
    },
    {
        title: 'Logo',
        key: 'material_image',
        render: () => <Image className={'mx-auto'} width={80} height={56} src={'/images/company.png'} alt={'logo'}/>,
        classnames: 'text-center'
    },
    {
        title: 'Korxona nomi',
        key: 'company_name',
        render: ({value}) => <span className={'underline'}>{value}</span>,
        classnames: 'text-center',
        sorter: true
    },
    {
        title: 'Sertifikat',
        key: 'sertificate_blank_num',
        render: () => <Image className={'mx-auto'} width={24} height={24} src={'/images/certificate.png'}
                             alt={'certificate'}/>,
        classnames: 'text-center'
    },
    {
        title: 'Narxi (so’m)',
        key: 'material_price',
        render: ({value}) => <NumericFormat displayType={'text'} className={'text-center bg-transparent'}
                                            thousandSeparator={' '} value={value}/>,
        classnames: 'text-center',
        sorter: true
    },
    {
        title: 'Miqdori (kun-t)',
        key: 'material_amount',
        render: ({value}) => <NumericFormat displayType={'text'} className={'text-center bg-transparent'}
                                            thousandSeparator={' '} value={value}/>,
        classnames: 'text-center',
        sorter: true
    },
    {
        title: 'Oxirgi o’zgarish',
        key: 'material_updated_date',
        render: ({value}) => dayjs(value).format("DD.MM.YYYY HH:mm"),
        classnames: 'text-center',
        sorter: true
    },
    {
        title: 'Action',
        key: 'action',
        render: () => <div className={'flex items-center'}>
            <Image className={'mx-auto cursor-pointer'} width={24} height={24} src={'/images/shopping.png'}
                   alt={'certificate'}/>
            <Image className={'mx-auto cursor-pointer'} width={24} height={24} src={'/icons/stick.svg'}
                   alt={'certificate'}/>
        </div>,
        classnames: 'text-center'
    }
]
const ViewPage = () => {
    const router = useRouter()
    const {code} = router.query;
    const {data: material, isLoading, isError} = useGetQuery({
        key: [KEYS.smallMechanos, code],
        url: `${URLS.smallMechanos}${code}/`,
        enabled: !!(code)
    });

    if (isError) {
        return <ErrorPage/>
    }

    if (isLoading) {
        return <Main><ContentLoader/></Main>;
    }

    return (
        <>
            <Main>
                <Menu active={4}/>
                <Section className={'!bg-white'}>
                    <div className="grid grid-cols-12">
                        <div className="col-span-5 text-center">
                            <Image className={'mx-auto'} width={370} height={260} src={'/images/material.png'}
                                   alt={'company'}/>
                        </div>
                        <div className="col-span-7">
                            <div className="flex">
                                <div className={'inline-flex mr-8'}>
                                    <Image className={'mr-2'} width={24} height={24} src={'/icons/code.svg'}
                                           alt={'code'}/>
                                    <span
                                        className={'font-medium'}>#{get(material, 'data.smallmechano_csr_code')}</span>
                                </div>
                                <div className={'inline-flex mr-8'}>
                                    <Image className={'mr-2'} width={24} height={24} src={'/icons/eye.svg'}
                                           alt={'code'}/>
                                    <span
                                        className={'font-medium'}>{get(material, 'data.material_views_count', 0)}</span>
                                </div>
                                <div className={'inline-flex mr-8 cursor-pointer'}>
                                    <Image className={'mr-1.5'} width={24} height={24} src={'/icons/stick.svg'}
                                           alt={'code'}/>
                                    <span className={'font-medium'}>Saqlash</span>
                                </div>
                            </div>
                            <h2 className={'my-3 text-xl font-semibold'}>{get(material, 'data.smallmechano_name')}</h2>
                            <div className="flex mb-5 ">
                                <div className={'inline-flex mr-20'}>
                                    <strong className={'font-medium text-[#212529] mr-1'}>O’rtacha narx: </strong><span
                                    className={'text-[#4B5055]'}> 504 000 so’m</span>
                                </div>
                                <div className={'inline-flex'}>
                                    <strong className={'font-medium text-[#212529] mr-1'}>O’rtacha joriy narx: </strong><span
                                    className={'text-[#4B5055]'}> 504 000 so’m</span>
                                </div>
                            </div>
                            <p className={'text-[#4B5055] text-sm'}>{get(material, 'data.material_desc', '-')}</p>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 ">
                            <GridView HeaderBody={<div className="flex mb-5"><Select sm label={'Shahar / viloyat'}/>
                                <div className="ml-8"><Select sm label={'Tuman'}/></div>
                            </div>}
                                      url={`${URLS.smallMechanosAds}${code}/`}
                                      key={KEYS.smallMechanosAds}
                                      columns={columns}
                            />
                        </div>
                    </div>
                </Section>
            </Main>
        </>
    );
};

export default ViewPage;