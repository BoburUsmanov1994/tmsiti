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

const ViewPage = () => {
    const router = useRouter()
    const {code} = router.query;
    const {data: material, isLoading, isError} = useGetQuery({
        key: [KEYS.materials, code],
        url: `${URLS.materials}/${code}/`,
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
                <Menu active={1}/>
                <Section className={'!bg-white'}>
                    <div className="grid grid-cols-12">
                        <div className="col-span-5 text-center">
                            <Image className={'mx-auto'} width={370} height={260} src={'/images/company.png'}
                                   alt={'company'}/>
                        </div>
                        <div className="col-span-7">
                            <div className="flex">
                                <div className={'inline-flex mr-8'}>
                                    <Image className={'mr-2'} width={24} height={24} src={'/icons/code.svg'}
                                           alt={'code'}/>
                                    <span className={'font-medium'}>#{get(material, 'data.material_csr_code')}</span>
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
                            <h2 className={'my-3 text-xl font-semibold'}>{get(material, 'data.material_name')}</h2>
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
                            <p className={'text-[#4B5055] text-sm'}>{get(material,'data.material_desc','-')}</p>
                        </div>
                    </div>
                </Section>
                <Section>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 mb-5">
                            <div className="flex">
                                <Select sm label={'Shahar / viloyat'}/>
                                <div className="ml-8">
                                    <Select sm label={'Tuman'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </Main>
        </>
    );
};

export default ViewPage;