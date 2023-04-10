import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import {getMostOrdered, getVolumes} from "@/api";
import {KEYS} from "@/constants/key";
import {dehydrate, QueryClient, useQuery} from '@tanstack/react-query';
import {ContentLoader} from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import {get, isEmpty} from "lodash"
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import {URLS} from "@/constants/url";


export default function Works() {
    const {
        data: volumes,
        isError,
        isLoading,
        isFetching,
        error
    } = useQuery([KEYS.volumes], () => getVolumes({url: URLS.volumes, params: {key: KEYS.works}}));
    const {
        data: items,
        isLoading: machineLoading,
        isError: machineError,
    } = useQuery([KEYS.works], () => getMostOrdered({
        url: URLS.works,
        params: {key: KEYS.viewCounts}
    }));
    if (isError || machineError) {
        return <ErrorPage/>
    }
    if (isLoading || machineLoading || isFetching) {
        return <Main><ContentLoader/></Main>;
    }
    return (
        <Main>
            <Menu active={2}/>
            <Section>
                <div className="grid grid-cols-12 gap-x-8 ">
                    {
                        !isEmpty(get(volumes, 'results', [])) && get(volumes, 'results', []).map(volume => <div
                            key={get(volume, 'id')} className={'col-span-3 mb-5'}><Category
                            data={volume}/></div>)
                    }
                </div>
                <div className="grid grid-cols-12 gap-x-8 mt-[30px] min-h-fit">
                    <div className="col-span-12">
                        <Title>Ko‘p ko‘rilganlar</Title>
                    </div>
                    {
                        get(items, 'results', []).map(item => <div key={get(item, 'material_csr_code')}
                                                                   className={'col-span-3 mb-[30px] '}>
                            <Product data={item}/>
                        </div>)
                    }
                </div>
            </Section>
        </Main>
    )
}

export const getStaticProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([KEYS.volumes],
        () => getVolumes({url: URLS.volumes, params: {key: KEYS.works}}),
    );
    await queryClient.prefetchQuery([KEYS.works],
        () => getMostOrdered({url: URLS.works, params: {key: KEYS.viewCounts}}),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};