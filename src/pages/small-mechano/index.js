import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import {getMostOrdered, getCategories} from "@/api";
import {KEYS} from "@/constants/key";
import {dehydrate, QueryClient, useQuery} from '@tanstack/react-query';
import {ContentLoader} from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import {get, isEmpty} from "lodash"
import Product from "@/components/product";
import ErrorPage from "@/pages/500";
import {URLS} from "@/constants/url";


export default function SmallMechanos() {
    const {
        data: volumes,
        isError,
        isLoading,
        isFetching,
        error
    } = useQuery([KEYS.categories], () => getCategories({url: URLS.categories, params: {key: KEYS.smallMechanos}}));
    const {
        data: items,
        isLoading: machineLoading,
        isError: machineError,
    } = useQuery([KEYS.smallMechanos], () => getMostOrdered({
        url: URLS.smallMechanos,
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
            <Menu active={4}/>
            <Section>
                <div className="grid grid-cols-12 gap-x-8 ">
                    {
                        !isEmpty(get(volumes, 'results', [])) && get(volumes, 'results', []).map(volume => <div
                            key={get(volume, 'id')} className={'col-span-3 mb-5'}><Category name={'category_name'} url={'small-mechano/category'}
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
                            <Product viewUrl={'small-mechano'} name={'smallmechano_name'} code={'smallmechano_csr_code'} img={'smallmechano_image'} data={item}/>
                        </div>)
                    }
                </div>
            </Section>
        </Main>
    )
}

export const getStaticProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([KEYS.categories],
        () => getCategories({url: URLS.categories, params: {key: KEYS.smallMechanos}}),
    );
    await queryClient.prefetchQuery([KEYS.smallMechanos],
        () => getMostOrdered({url: URLS.smallMechanos, params: {key: KEYS.viewCounts}}),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};