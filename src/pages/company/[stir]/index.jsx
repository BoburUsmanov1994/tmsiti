import React, {useState} from 'react';
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
import {get, split} from "lodash";
import GridView from "@/containers/grid-view";
import {NumericFormat} from 'react-number-format';
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import Title from "@/components/title";
import Link from "next/link";


const ViewPage = () => {
    const router = useRouter()
    const {stir} = router.query;
    const {t} = useTranslation()
    const [count, setCount] = useState(0)
    const {data: company, isLoading, isError} = useGetQuery({
        key: [KEYS.companies, stir],
        url: `${URLS.companies}${stir}/`,
        enabled: !!(stir)
    });
    const {data: currency} = useGetQuery({
        key: KEYS.currency,
        url: URLS.currency,
    });

    const columns = [
        {
            title: '№',
            key: 'id',
            render: ({index}) => <span className={'font-semibold'}>{index}</span>
        },
        {
            title: t('Rasm'),
            key: 'material_image',
            render: ({value}) => value ?
                <Image className={'mx-auto'} width={80} height={56} loader={() => value} src={value}
                       alt={'logo'}/> : <Image className={'mx-auto'} width={80} height={56} src={'/images/company.png'}
                                               alt={'logo'}/>,
            classnames: 'text-center'
        },
        {
            title: t('Resurs turi'),
            key: 'material_type',
            render: ({value, row}) => <Link href={`/${get(split(get(row, 'material_url'), '/'), '[1]', '#')}`}
                                            className={'underline text-[#146BBC] '}>{value}</Link>,
            classnames: 'text-center',
        },
        {
            title: t('Kodi'),
            key: 'material_name',
            render: ({value, row}) => <Link href={get(row, 'material_url', '#')}
                                            className={'underline text-[#146BBC] whitespace-nowrap '}>{value}</Link>,
            classnames: 'text-center',
        },
        {
            title: t('E’lon tavsifi'),
            key: 'material_description',
            render: ({value}) => <span>{value}</span>,
        },
        {
            title: t('Sertifikat'),
            key: 'sertificate_blank_num',
            render: ({row}) => <div className={'group relative inline-block cursor-pointer'}>
                <Image className={'mx-auto'} width={24} height={24} src={'/images/certificate.png'}
                       alt={'certificate'}/>
                <ul className="text-left text-white hidden group-hover:block absolute left-full bottom-full p-2.5 bg-[#3D7AB6] w-[200px] rounded shadow-[5px_5px_15px_rgba(0, 0, 0, 0.1)]">
                    {(get(row, 'sertificate_blank_num') && get(row, 'sertificate_reestr_num') && get(row, 'sertificate_reestr_num')?.length > 1 && get(row, 'sertificate_blank_num')?.length > 1) ? <>
                        <li>{t("Blank raqami")}: {get(row, 'sertificate_blank_num')}</li>
                        <li>{t("Reestr raqami")}: {get(row, 'sertificate_reestr_num')}</li>
                        <li className={'underline'}><a target={"_blank"}
                                                       href={`http://sert2.standart.uz/site/register?Search[number_of_blank]=${get(row, 'sertificate_blank_num')}&Search[gov_register]=${get(row, 'sertificate_reestr_num')}`}>{t("Tekshirish")}</a>
                        </li>
                    </> : <li>{t("Ma’lumot mavjud emas")}</li>}
                </ul>
            </div>,
            classnames: 'text-center'
        },
        {
            title: t('Narxi(so`m)'),
            key: 'material_price',
            render: ({value, row}) => (value * get(currency, `data[${get(row, 'material_price_currency')}]`, 1) > 0 ? <NumericFormat displayType={'text'} className={'text-center bg-transparent'}
                                                     thousandSeparator={' '}
                                                     value={value * get(currency, `data[${get(row, 'material_price_currency')}]`, 1)}
                                                     suffix={` (${get(row, 'material_measure')})`}/> : t("by_order")),
            classnames: 'text-center  whitespace-nowrap',
            sorter: true
        },
        {
            title: t('Miqdori'),
            key: 'material_amount',
            render: ({value, row}) => <NumericFormat displayType={'text'}
                                                     className={'text-center bg-transparent  whitespace-nowrap'}
                                                     thousandSeparator={' '}
                                                     value={value}
                                                     suffix={` ${get(row, 'material_measure')}`}/>,
            classnames: 'text-center',
            sorter: true
        },
        {
            title: t('Joylangan vaqt'),
            key: 'material_created_date',
            render: ({value}) => dayjs(value).format("DD.MM.YYYY HH:mm"),
            classnames: 'text-center',
            sorter: true
        },
        {
            title: t('Action'),
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
    if (isError) {
        return <ErrorPage/>
    }

    if (isLoading) {
        return <Main><ContentLoader/></Main>;
    }
    return (
        <>
            <Main>
                <Menu active={1}/>
                <Section className={'!bg-white'}>
                    <div className="grid grid-cols-12 gap-x-10">
                        <div className="col-span-2 text-center relative h-28">
                            {
                                get(company, 'data.company_logo') ?
                                    <Image className={'mr-2'} layout={'fill'} objectFit={'contain'}
                                           loader={() => get(company, 'data.company_logo')}
                                           src={get(company, 'data.company_logo')}
                                           alt={'code'}/> :
                                    <Image className={'mx-auto'} width={150} height={105} src={'/images/company.png'}
                                           alt={'company'}/>
                            }

                        </div>
                        <div className="col-span-10">
                            <div className="flex mb-2.5">
                                <h2 className={'text-[#212529] font-medium mr-3'}>{get(company, 'data.company_name')}</h2>
                                <div className={'inline-flex mr-8 cursor-pointer'}>
                                    <Image className={'mr-1.5'} width={24} height={24} src={'/icons/stick.svg'}
                                           alt={'code'}/>
                                </div>
                            </div>
                            <p className={'text-[#4B5055] text-sm'}>{get(company, 'data.company_desc', '-')}</p>
                            <div className="flex mt-2.5">
                                <div className={'mr-4'}>
                                    <strong>{t("Rahbar")}:</strong> {get(company, 'data.company_ceo')}</div>
                                <div className={'mr-4'}>
                                    <strong>{t("Telefon")}:</strong> {get(company, 'data.company_phone_main')}</div>
                                <div><strong>{t("Manzil")}:</strong> {get(company, 'data.company_address')}</div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 ">
                            <GridView
                                HeaderBody={<div className={'mb-5'}>
                                    <Title classNames={'!mb-2.5'}>Korxonaning bARCHA TAKLIFLARI</Title>
                                    <p className={'text-sm text-[#4B5055]'}><NumericFormat value={count}
                                                                                           displayType={'text'}
                                                                                           thousandSeparator={" "}/> e’lon
                                        mavjud</p>
                                </div>}
                                url={`${URLS.companyAds}${stir}/`}
                                key={KEYS.companyAds}
                                columns={columns}
                                getCount={setCount}
                            />
                        </div>
                    </div>
                </Section>
            </Main>
        </>
    );
};

export default ViewPage;