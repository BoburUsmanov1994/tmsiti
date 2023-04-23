import React, {useEffect, useState} from 'react';
import GridHeader from "@/containers/grid-view/components/grid-header";
import GridBody from "@/containers/grid-view/components/grid-body";
import useGetQuery from "@/hooks/api/useGetQuery";
import {ContentLoader, OverlayLoader} from "@/components/loader";
import Pagination from "@/components/pagination";
import {get,isNil} from "lodash";

const GridView = ({
                      HeaderBody = null,
                      columns = [],
                      url,
                      key,
                      params = {},
                      enabled = true,
                      getCount = () => {},
                  }) => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(48)
    const [sort, setSort] = useState(undefined)
    const {data, isLoading, isFetching} = useGetQuery({
        key: key,
        url: url,
        params: {
            page,
            ...params,
            sort_by:sort,
            page_size:pageSize
        },
        enabled
    });
    useEffect(()=>{
        if(!isNil(get(data, 'data.count'))){
            getCount(get(data, 'data.count',0))
        }
    },[data])


    if (isLoading) {
        return <ContentLoader/>;
    }

    return (
        <>
            {isFetching && <OverlayLoader/>}
            <GridHeader>{HeaderBody}</GridHeader>
            {get(data, 'data.results',[])?.length > 0 ? <>
            <GridBody handleSort={setSort} columns={columns} rows={get(data, 'data.results',[])} pageSize={pageSize} page={page} setPage={setPage}/>
            <Pagination page={page} setPage={setPage} pageCount={get(data, 'data.total_pages', 0)}/></>:<p className={'py-5'}>Ushbu mahsulot bo’yicha hozircha e’lonlar mavjud emas...</p>}
        </>
    );
};

export default GridView;