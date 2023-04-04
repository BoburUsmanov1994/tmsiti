import React from 'react';
import Image from "next/image";
import {get} from "lodash";
import Button from "@/components/button";

const Product = ({data}) => {
    return (
        <div className={'drop-shadow-category bg-white p-2.5 rounded-[5px]'}>
            <div className={'relative h-[170px] rounded overflow-hidden mb-2.5'}>
                <Image layout={'fill'} objectFit={'cover'}
                       src={'/images/material.png'}/>
            </div>
            <div className={'flex justify-between mb-2.5'}>
                <span className={'text-xs py-[5px] px-2.5 bg-[#D1E9FF] text-[#28366D] font-medium'}>
                    #{
                    get(data, 'material_csr_code')
                }
                </span>
                <Image className={'cursor-pointer'} width={10} height={16} src={'/icons/label.svg'} alt={'label'}/>
            </div>
            <h2 className={'text-[#28366D] font-medium text-sm min-h-[150px] mb-5'}>
                {get(data, 'material_name')}
            </h2>
            <div className="flex justify-between">
                <Button>Ko’rish</Button>
                <Button className={'min-w-[48px] hover:bg-transparent hover:border-[#28366D]'}><Image width={24}
                                                                                                      height={24}
                                                                                                      src={'/icons/bag.svg'}/></Button>
            </div>
        </div>
    );
};

export default Product;