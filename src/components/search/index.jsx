import React, {useState} from 'react';
import Image from "next/image";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";

const Search = () => {
    const [open, setOpen] = useState(false)
    const {register, handleSubmit} = useForm();
    const router = useRouter()
    const onSubmit = ({query}) => {
        router.push(`/search?query=${query}`)
    }
    return (
        <div className={'flex items-center'}>
            {!open && <button onClick={() => setOpen(true)} type={'button'}><Image width={26} height={26} alt={'map'}
                                                                                   src={'/icons/search.svg'}/>
            </button>}
            {open &&
                <form onSubmit={handleSubmit(onSubmit)} className={'h-10 w-full bg-white w-[520px] rounded relative'}>
                    <input {...register("query")}
                           className={'absolute rounded h-full w-[calc(100%-40px)] outline-none text-[#28366D] p-3'}
                           type="text"/>
                    <button className={'absolute top-0 right-0 z-50 bg-[#1890FF] p-2.5 h-full rounded-r'}><Image
                        width={18} height={18} alt={'map'}
                        src={'/icons/search.svg'}/></button>
                </form>}
        </div>
    );
};

export default Search;