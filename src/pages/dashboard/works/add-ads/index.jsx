import React, {useEffect, useState} from 'react';
import Dashboard from "@/layouts/dashboard";
import Subheader from "@/layouts/dashboard/components/subheader";

const Ads = () => {



    return (
        <Dashboard>
            <Subheader title={'Qurilish materiallari va buyumlari e’lonini qo’shish'}/>

        </Dashboard>
    );
};

export default Ads;

// converting money

// defaultValue={(value, set) => (value * get(currency, `data[${get(set, 'material_price_currency')}]`, 1) > 0)}