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
    const {id} = router.query;
    const [page,setPage] = useState(1);
    const [categoryId, setCategoryId] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const {data: materials, isLoading, isError: isErrorMaterials,isFetching} = useGetQuery({
        key: ['materials',id,page],
        url: `${URLS.materialVolume}${id}/`,
        params:{
            page
        },
        enabled:!!(id)
    });
    const {
        data: volumes,
        isLoading: isLoadingVolumes,
        isError: isErrorVolumes
    } = useGetQuery({key: KEYS.materialVolumes, url: URLS.materialVolumes});
    const {
        data: categories,
        isLoading: isLoadingCategory,
    } = useGetQuery({
        key: [KEYS.materialCategory, id],
        url: URLS.materialCategory + id + '/',
        enabled: !!(id)
    });

    const {
        data: groups,
        isLoading: isLoadingGroup,
    } = useGetQuery({
        key: [KEYS.materialGroup, categoryId],
        url: URLS.materialGroup + categoryId + '/',
        enabled: !!(categoryId)
    });

    if (isErrorVolumes || isErrorMaterials) {
        return <ErrorPage/>
    }

    if (isLoading || isLoadingVolumes) {
        return <Main><ContentLoader/></Main>;
    }


    return (
        <Main>
            {isFetching && <OverlayLoader/>}
            <Menu active={1}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title center>Materiallar va buyumlar</Title>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select defaultValue={getDefaultValue(getOptionList(menuData, 'filterUrl', 'title'), '/materials/volume')}
                                getValue={(val) => {
                                    if(get(val,'value') && !isEqual(get(val,'value'),'/materials/volume')){
                                        router.push(get(val,'value'))
                                    }
                                }}
                                options={getOptionList(menuData, 'filterUrl', 'title')}
                                label={'Tanlangan mahsulot turi'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select
                            getValue={(val) => {
                                if(get(val,'value')){
                                    router.push(`/materials/volume/${get(val,'value')}`)
                                }
                            }}
                            defaultValue={getDefaultValue(getOptionList(get(volumes, 'data.results', []), 'id', 'volume_name'), id)}
                            options={getOptionList(get(volumes, 'data.results', []), 'id', 'volume_name')}
                            label={'Tanlangan bo‘lim'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select getValue={(val) => setCategoryId(get(val, 'value'))}
                                options={getOptionList(get(categories, 'data.results', []), 'id', 'category_name')}
                                label={'Tanlangan kategoriya'}/>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select getValue={(val) => setGroupId(get(val, 'value'))}
                                options={getOptionList(get(groups, 'data.results', []), 'id', 'group_name')}
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
                        get(materials, 'data.results', []).map(material => <div key={get(material, 'material_csr_code')}
                                                                                className={'col-span-3 mb-[30px] '}>
                            <Product data={material}/>
                        </div>)
                    }
                    <div className={'col-span-12'}>
                        <Pagination page={page} setPage={setPage} pageCount={get(materials,'data.total_pages',0)}/>
                    </div>
                </div>
            </Section>
        </Main>
    );
};

export default Index;