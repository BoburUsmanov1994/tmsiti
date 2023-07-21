import React from 'react';
import Dashboard from "../../../layouts/dashboard";
import Subheader from "../../../layouts/dashboard/components/subheader";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";

const Materials = () => {

    const columns = [
        {
            title: '№',
            key: 'id',
            render: ({index}) => <span>{index}</span>
        },
        {
            title: 'Kodi',
            key: 'material_csr_code',
            render: ({value}) => <span className={'text-[#28366D]'}>{value}</span>
        },
        {
            title: 'Nomi',
            key: 'material_name',
        },
        {
            title: 'Narxi',
            key: 'material_price',
            classnames: 'text-center'
        },
        {
            title: 'Miqdori',
            key: 'material_measure',
            classnames: 'text-center'
        },
        {
            title: 'Joylangan vaqti',
            key: 'material_date',
            classnames: 'text-center'
        },
        {
            title: 'Ko’rildi',
            key: 'material_views_count',
            classnames: 'text-center'
        },
    ]
    return (
        <Dashboard>
            <Subheader title={'Qurilish materiallari'}/>
            <div className="p-7">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 ">
                        <GridView
                            hasActionColumn
                            url={URLS.myMaterials}
                            key={KEYS.myMaterials}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Materials;