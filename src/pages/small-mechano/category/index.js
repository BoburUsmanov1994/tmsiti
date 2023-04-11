import React, {useState} from 'react';
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu, {menuData} from "@/components/menu";
import Title from "@/components/title";
import Select from "@/components/select";
import {get, isEqual} from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {ContentLoader, OverlayLoader} from "@/components/loader";
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import {useRouter} from "next/router";
import {getDefaultValue, getOptionList} from "@/utils";
import Pagination from "@/components/pagination";

const Index = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const {data: materials, isLoading, isError: isErrorMaterials, isFetching} = useGetQuery({
        key: KEYS.smallMechanos,
        url: URLS.smallMechanos,
        params: {
            page,
            key: KEYS.viewCounts,
        },
    });
    const {
        data: categories,
        isLoading: isLoadingCategory,
        isError: isErrorCategory
    } = useGetQuery({key: KEYS.categories, url: URLS.categories, params: {key: KEYS.smallMechanos}});




    if (isErrorCategory || isErrorMaterials) {
        return <ErrorPage/>
    }

    if (isLoading || isLoadingCategory) {
        return <Main><ContentLoader/></Main>;
    }


    return (
        <Main>
            {isFetching && <OverlayLoader/>}
            <Menu active={4}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title center>Kichik mexanizatsiya</Title>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            name={'material'}
                            defaultValue={getDefaultValue(getOptionList(menuData, 'filterUrl', 'title', true), '/small-mechano/category')}
                            getValue={(val) => {
                                if (get(val, 'value') && !isEqual(get(val, 'value'), '/small-mechano/category')) {
                                    router.push(get(val, 'value'))
                                }
                            }}
                            options={getOptionList(menuData, 'filterUrl', 'title', true)}
                            label={'Tanlangan mahsulot turi'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            getValue={(val) => {
                                if (get(val, 'value')) {
                                    setPage(1)
                                    router.push(`/small-mechano/category/${get(val, 'value')}`)
                                }
                            }}
                            options={getOptionList(get(categories, 'data.results', []), 'id', 'category_name')}
                            label={'Tanlangan kategoriya'}/>
                    </div>

                    <div className="col-span-12 mb-5">
                        <Select
                                options={[]}
                                label={'Tanlangan guruh'}/>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-x-8 mt-8 items-start">
                    <div className="col-span-4">
                        <Title>mahsulotlar</Title>
                    </div>
                    <div className="col-span-8">
                        <div className="flex justify-end">
                            <Select sm label={'Shahar / viloyat'}/>
                            <div className="ml-8">
                                <Select sm label={'Tuman'}/>
                            </div>
                        </div>
                    </div>
                    {
                        get(materials, 'data.results', []).map(material => <div key={get(material, 'smallmechano_csr_code')}
                                                                                className={'col-span-3 mb-[30px] '}>
                            <Product viewUrl={'small-mechano'} img={'smallmechano_image'} code={'smallmechano_csr_code'} name={'smallmechano_name'} data={material}/>
                        </div>)
                    }
                    <div className={'col-span-12'}>
                        <Pagination page={page} setPage={setPage} pageCount={get(materials, 'data.total_pages', 0)}/>
                    </div>
                </div>
            </Section>
        </Main>
    );
};

export default Index;