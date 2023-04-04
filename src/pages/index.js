import Main from "@/layouts/main";
import Menu from "../components/menu";
import Section from "../components/section";
import {getMaterialVolumes, getMostOrderedMaterials} from "@/api";
import {KEYS} from "@/constants/key";
import {dehydrate, QueryClient, useQuery} from '@tanstack/react-query';
import {ContentLoader} from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import {get} from "lodash"
import Product from "@/components/product";


export default function Home() {
    const {
        data: volumes,
        isError,
        isLoading,
        isFetching
    } = useQuery([KEYS.materialVolumes], () => getMaterialVolumes());
    const {
        data: materials,
    } = useQuery([KEYS.materialsMostOrdered], () => getMostOrderedMaterials());
    if (isLoading || isFetching) {
        return <Main><ContentLoader/></Main>;
    }
    return (
        <Main>
            <Menu active={1}/>
            <Section>
                <div className="grid grid-cols-12 gap-x-8 ">
                    {
                        volumes.map(volume => <div key={get(volume, 'id')} className={'col-span-3 mb-5'}><Category
                            data={volume}/></div>)
                    }
                </div>
                <div className="grid grid-cols-12 gap-x-8 mt-[30px] min-h-fit">
                    <div className="col-span-12">
                        <Title>Ko‘p ko‘rilganlar</Title>
                    </div>
                    {
                        materials.map(material => <div key={get(material, 'material_csr_code')}
                                                       className={'col-span-3 mb-[30px] '}>
                            <Product data={material}/>
                        </div>)
                    }
                </div>
            </Section>
        </Main>
    )
}

export const getStaticProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([KEYS.materialVolumes],
        () => getMaterialVolumes(),
    );
    await queryClient.prefetchQuery([KEYS.materialsMostOrdered],
        () => getMostOrderedMaterials(),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};