import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({
                        page = 1,
                        pageCount = 10,
                        setPage = () => {
                        }
                    }) => {
    return (
        <div>
            <ReactPaginate forcePage={page - 1} onPageChange={({selected}) => setPage(selected + 1)}
                           pageCount={pageCount} nextLabel={<span>Oldingi</span>}
                           previousLabel={<span>Keyingi</span>} className={'flex justify-center my-2 items-center'}
                           pageClassName={'ml-2.5'}
                           pageLinkClassName={'inline-flex w-8 h-8 rounded-[5px] justify-center items-center bg-[#E0E0E0] text-black text-sm'}
                           nextClassName={'ml-2.5  text-sm text-[#313B3D]'} previousClassName={'text-sm text-[#313B3D]'}
                           breakLinkClassName={'ml-4 mr-1.5'} activeLinkClassName={'!bg-[#1890FF] !text-white'}/>
        </div>
    );
};

export default Pagination;