import React from 'react';
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu, {menuData} from "@/components/menu";
import Title from "@/components/title";
import Select from "@/components/select";
import {get} from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import {ContentLoader} from "@/components/loader";
import Product from "@/components/product";

const Index = () => {
    const {data:materials, isLoading} = useGetQuery({key: KEYS.materialsMostOrdered, url: URLS.materialsMostOrdered});
    if(isLoading){
        return <Main><ContentLoader /></Main>;
    }
    console.log('data',materials)
    return (
        <Main>
            <Menu active={1}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title center>Materiallar va buyumlar</Title>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select defaultValue={1} getValue={(val) => console.log(val)}
                                options={menuData.map((menu) => ({label: get(menu, 'title'), value: get(menu, 'id')}))}
                                label={'Tanlangan mahsulot turi'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select label={'Tanlangan bo‘lim'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select label={'Tanlangan kategoriya'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select label={'Tanlangan guruh'}/>
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
                        get(materials,'data',[]).map(material => <div key={get(material, 'material_csr_code')}
                                                       className={'col-span-3 mb-[30px] '}>
                            <Product data={material}/>
                        </div>)
                    }
                </div>
            </Section>
        </Main>
    );
};

export default Index;