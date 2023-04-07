import React, {useState} from 'react';
import GridHeader from "@/containers/grid-view/components/grid-header";
import GridBody from "@/containers/grid-view/components/grid-body";
import useGetQuery from "@/hooks/api/useGetQuery";
import {ContentLoader, OverlayLoader} from "@/components/loader";
import {useRouter} from "next/router";
import Pagination from "@/components/pagination";
import {get} from "lodash";

const GridView = ({
                      HeaderBody = null,
                      columns = [],
                      url,
                      key,
                      params = {},
                      enabled = true,
                  }) => {
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState(undefined)
    const {data, isLoading, isFetching} = useGetQuery({
        key: key,
        url: url,
        params: {
            page,
            ...params,
            sort_by:sort
        },
        enabled
    });


    if (isLoading) {
        return <ContentLoader/>;
    }
    return (
        <>
            {isFetching && <OverlayLoader/>}
            <GridHeader>{HeaderBody}</GridHeader>
            <GridBody handleSort={setSort} columns={columns} rows={get(data, 'data.results')} page={page}/>
            <Pagination page={page} setPage={setPage} pageCount={get(data, 'data.total_pages', 0)}/>
        </>
    );
};

export default GridView;