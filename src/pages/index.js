import Main from "@/layouts/main";
import Menu from "../components/menu";
import Section from "../components/section";
import {getMostOrdered, getVolumes} from "@/api";
import {KEYS} from "@/constants/key";
import {dehydrate, QueryClient, useQuery} from '@tanstack/react-query';
import {ContentLoader} from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import {get, isEmpty} from "lodash"
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import {URLS} from "../constants/url";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {OverlayLoader} from "../components/loader";


export default function Home() {
    const [pageSize, setPageSize] = useState(24);
    const {t} = useTranslation()
    const {
        data: volumes,
        isError,
        isLoading,
        isFetching,
        error
    } = useQuery([KEYS.volumes], () => getVolumes({url: URLS.volumes, params: {key: KEYS.materials}}));
    const {
        data: materials,
        isLoading: materialLoading,
        isError: materialError,
        isFetching: isFetchingMaterials
    } = useQuery([KEYS.materials, pageSize], () => getMostOrdered({
        url: URLS.materials,
        params: {key: KEYS.viewCounts, page_size: pageSize}
    }));
    if (isError || materialError) {
        return <ErrorPage/>
    }
    if (isLoading || materialLoading || isFetching) {
        return <Main><ContentLoader/></Main>;
    }
    return (
        <Main>
            <Menu active={1}/>
            <Section>
                <div className="grid grid-cols-12 gap-x-8 ">
                    {
                        !isEmpty(get(volumes, 'results', [])) && get(volumes, 'results', []).map(volume => <div
                            key={get(volume, 'id')} className={'col-span-3 mb-5'}><Category logo_url={'volume_logo'}
                                                                                            data={volume}/></div>)
                    }
                </div>
                <div className="grid grid-cols-12 gap-x-8 mt-[30px] min-h-fit">
                    <div className="col-span-12">
                        <Title>{t('most_seen')}</Title>
                    </div>
                    {
                        isFetchingMaterials && <OverlayLoader/>
                    }
                    {
                        get(materials, 'results', []).map(material => <div key={get(material, 'material_csr_code')}
                                                                           className={'col-span-3 mb-[30px] '}>
                            <Product data={material}/>
                        </div>)
                    }
                    <div className="col-span-12 text-center">
                        <span className={'cursor-pointer underline'}
                              onClick={() => setPageSize(prev => prev + 24)}>{t('Barcha mahsulotlarni ko’rish')}</span>
                    </div>
                </div>
            </Section>
        </Main>
    )
}

export const getStaticProps = async (context) => {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([KEYS.volumes],
        () => getVolumes({url: URLS.volumes, params: {key: KEYS.materials}}),
    );
    await queryClient.prefetchQuery([KEYS.materials],
        () => getMostOrdered({url: URLS.materials, params: {key: KEYS.viewCounts}}),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};