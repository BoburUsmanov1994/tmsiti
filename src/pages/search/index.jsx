import React, {useState} from 'react';
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu, {menuData} from "@/components/menu";
import Title from "@/components/title";
import Select from "@/components/select";
import {debounce, get, head, isEqual, split} from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {ContentLoader, OverlayLoader} from "@/components/loader";
import Product from "@/components/product";
import {useRouter} from "next/router";
import {getDefaultValue, getOptionList} from "@/utils";
import Pagination from "@/components/pagination";

const Index = () => {
    const router = useRouter();
    const {query,category} = router.query;
    const [page, setPage] = useState(1);
    const {data, isLoading, isFetching} = useGetQuery({
        key: KEYS.search,
        url: URLS.search,
        params: {
            key: category,
            value: query,
            page
        },
    });

    if (isLoading) {
        return <Main><ContentLoader/></Main>;
    }
    return (
        <Main>
            {isFetching && <OverlayLoader/>}
            <Menu active={4}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title center>Qidiruv</Title>
                    </div>
                    <div className="col-span-12 mb-5">
                        <label className={'block mb-1.5 text-[#202B57]'} htmlFor="#">Qidiruv maydoni</label>
                        <input defaultValue={query} onChange={debounce(function (e) {
                                router.push(`/search?query=${e.target.value}`)
                            }, 500
                        )}
                               className={'w-full h-11  rounded-[5px] outline-none px-3'} type="text"/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            name={'material'}
                            defaultValue={getDefaultValue(getOptionList([{
                                id: 11,
                                title: 'all',
                                url: '/',
                                filterUrl: '/home'
                            }, ...menuData], 'title', 'title', true), category)}
                            getValue={(val) => {
                                router.push(`/search?query=${query}&category=${get(val, 'value')}`)
                            }}
                            options={getOptionList([{
                                id: 11,
                                title: 'all',
                                url: '/',
                                filterUrl: '/home'
                            }, ...menuData], 'title', 'title', true)}
                            label={'Tanlangan mahsulot turi'}/>
                    </div>

                </div>
                <div className="grid grid-cols-12 gap-x-8 mt-8 items-start">
                    <div className="col-span-12">
                        <Title>Qidiruv natijalari</Title>
                    </div>
                    {
                        get(data, 'data.results', []).map(material => <div
                            key={get(material, 'resource_code')}
                            className={'col-span-3 mb-[30px] '}>
                            <Product viewUrl={get(split(get(material, 'resource_url'), '/'), '[1]')}
                                     img={'resource_image'} code={'resource_code'}
                                     name={'resource_name'} data={material}/>
                        </div>)
                    }
                    <div className={'col-span-12'}>
                        <Pagination page={page} setPage={setPage} pageCount={get(data, 'data.total_pages', 0)}/>
                    </div>
                </div>
            </Section>
        </Main>
    );
};

export default Index;