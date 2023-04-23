import React from 'react';
import {get} from "lodash";
import clsx from "clsx";
import Image from "next/image";

const GridBody = ({columns = [], rows = [],pageSize=24,page=1,handleSort=()=>{}}) => {
    return (
        <table className={'bg-white w-full mb-8'}>
            <thead className={'font-medium text-black text-left'}>
            <tr>
                {
                    columns && columns.map(th =><th className={clsx('py-2.5 px-5',get(th, "classnames", ""))} key={get(th,'id')}>
                       <div className="inline-flex items-center">
                           <span>{get(th,'title')}</span>
                           {get(th,'sorter') && <div className="inline-flex flex-col ml-1">
                               <Image  onClick={()=>handleSort(get(th,'key'))} className={'cursor-pointer mb-[3px] max-w-none'} width={10} height={6} src={'/icons/sort-up.svg'} alt={'up'} />
                               <Image onClick={()=>handleSort(`-${get(th,'key')}`)} className={'cursor-pointer max-w-none'} width={10} height={6} src={'/icons/sort-down.svg'} alt={'up'} />
                           </div>}
                       </div>
                    </th>)
                }
            </tr>
            </thead>
            <tbody className={'text-[#212529] text-sm'}>
            {rows &&
                rows.map((tr,index) => {
                    return (
                        <>
                            <tr
                                className={"even:bg-white odd:bg-[#FBFBFC]"}
                                key={get(tr, get(columns, '[0].key'))}
                            >
                                {columns.map((th) =>
                                    <td className={clsx('py-2.5 px-5',get(th, "classnames", ""))}>
                                        {get(th, 'render')
                                            ?
                                            get(th, 'render')({
                                                value:get(tr, get(th, 'key')),
                                                row:tr,
                                                index:index+(page-1)*pageSize+1
                                            })
                                            :
                                            get(tr, get(th, 'key'))}
                                    </td>
                                )}
                            </tr>
                        </>
                    );
                })}

            </tbody>
        </table>
    );
};

export default GridBody;