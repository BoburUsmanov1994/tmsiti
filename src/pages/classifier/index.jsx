import React, {useState} from 'react';
import Main from "../../layouts/main";
import Menu from "../../components/menu";
import Section from "../../components/section";
import Title from "../../components/title";
import useGetQuery from "../../hooks/api/useGetQuery";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";
import {ContentLoader} from "../../components/loader";
import {get, debounce} from "lodash"
import Image from "next/image";
import {motion} from "framer-motion"
import clsx from "clsx";
import Select from "../../components/select";
import {getDefaultValue, getOptionList} from "../../utils";
import {NumericFormat} from "react-number-format";
import GridView from "../../containers/grid-view";

const columns = [
    {
        title: '№',
        key: 'id',
        render: ({index}) => <span className={'font-semibold'}>{index}</span>
    },
    {
        title: 'Resurs kodi',
        key: 'resource_code',
        sorter: true,
        classnames: 'min-w-[175px]'
    },
    {
        title: 'Resurs nomi',
        key: 'resource_name',
        sorter: true
    },
    {
        title: 'O’lchov birligi',
        key: 'resource_measure',
        classnames: 'text-center'
    },
    {
        title: 'Joriy narx (so’m)',
        key: 'resource_current_average_price',
        render: ({value}) => <NumericFormat displayType={'text'} className={'text-center bg-transparent'}
                                            thousandSeparator={' '} value={value}/>,
        classnames: 'text-center',
        sorter: true
    },
    {
        title: 'O’rtacha joriy narx (so’m)',
        key: 'resource_average_price',
        render: ({value}) => <NumericFormat displayType={'text'} className={'text-center bg-transparent'}
                                            thousandSeparator={' '} value={value}/>,
        classnames: 'text-center',
        sorter: true
    },

    {
        title: 'Action',
        key: 'action',
        render: () => <div className={'flex items-center'}>
            <Image className={'mx-auto cursor-pointer'} width={24} height={24} src={'/icons/stick.svg'}
                   alt={'certificate'}/>
        </div>,
        classnames: 'text-center'
    }
]
const Classifier = () => {
    const [count,setCount] = useState(0)
    const [search, setSearch] = useState('')
    const [volumeId, setVolumeId] = useState(null)
    const [partId, setPartId] = useState(null)
    const [chapterId, setChapterId] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const {data: volumes, isLoading: isLoadingVolumes} = useGetQuery({
        key: KEYS.classifier,
        url: URLS.classifier,
        params: {
            key: "volumes"
        }
    });
    const {data: parts, isLoading: isLoadingParts,isFetching:isFetchingParts} = useGetQuery({
        key: [KEYS.classifier, volumeId],
        url: URLS.classifier,
        params: {
            key: "parts",
            parent: volumeId
        },
        enabled: !!(volumeId)
    });


    if (isLoadingVolumes) {
        return <Main><ContentLoader/></Main>;
    }

    console.log('parts',parts)
    return (
        <Main>
            <Menu active={6}/>
            <Section>
                <div className="grid grid-cols-12 gap-x-8">
                    <div className="col-span-12 text-center mt-5">
                        <Title center>Qurilish resurslari Klassifikatori</Title>
                    </div>
                    <div className={'col-span-12 '}>
                        <div className={'mb-5'}>
                            <div className={'mb-2.5'}>
                                <label className={' font-medium text-primary'} htmlFor="#">
                                    Qidiruv
                                </label>
                                <p className={'text-sm text-[#516164]'}>*<NumericFormat value={count} displayType={'text'} thousandSeparator={" "} /> natija topildi</p>
                            </div>
                            <input onChange={debounce(function (e) {
                                    setSearch(e.target.value)
                                }, 500
                            )} placeholder={'Kerakli mahsulot nomini yozing'}
                                   className={'border border-transparent w-full px-5 py-2.5 rounded-[5px] bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]'}
                                   type="text"/>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <ul className={'bg-white shadow-category p-2'}>
                            {
                                get(volumes, 'data.results', []).map(volume => <li
                                    onClick={() => setVolumeId(get(volume, 'id'))}
                                    className={clsx('p-1.5 transition cursor-pointer mb-3 hover:bg-[#C7E3FC]', {'text-[#1B41C6] font-medium hover:bg-transparent': get(volume, 'id') == volumeId})}
                                    key={get(volume, 'id')}>
                                    <div className={'flex items-start'}>
                                    <motion.div className={'mr-2 flex-none'} animate={{
                                        rotate: get(volume, 'id') == volumeId ? 180 : 0,
                                    }}><Image width={24} height={24}
                                              src={get(volume, 'id') == volumeId ? '/icons/arrow-down-category-active.svg' : '/icons/arrow-down-category.svg'}
                                              alt={'arrow'}/>
                                    </motion.div>
                                    <span>{get(volume, 'volume_name')}</span>
                                    </div>
                                    {get(volume, 'id') == volumeId && ((isLoadingParts || isFetchingParts) ? <ContentLoader classNames={'!bg-transparent min-h-[25vh]'} /> : <ul className={'pl-3 py-1.5'}>
                                        {get(parts,'data.results',[]).map((part,j)=><li  onClick={() => setPartId(get(part, 'id'))}
                                                                                     className={clsx(' transition cursor-pointer mb-2 flex items-start hover:text-[#1B41C6] text-sm text-[#28366D] font-normal', {'text-[#017EFA] !font-medium': get(part, 'id') == partId,'mb-0':get(parts,'data.results',[])?.length == j+1})} key={get(part,'id')}>
                                            <motion.div className={'mr-2 flex-none '} animate={{
                                                rotate: get(part, 'id') == partId ? 90 : 0,
                                            }}><Image width={18} height={18}
                                                      src={get(part, 'id') == partId ? '/icons/arrow-down-category-active.svg' : '/icons/arrow-down-category.svg'}
                                                      alt={'arrow'}/>
                                            </motion.div>
                                            <span>{get(part, 'part_name')}</span>
                                        </li>)}
                                    </ul>)}
                                </li>)
                            }

                        </ul>
                    </div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-12 gap-x-8 ">
                            <div className="col-span-6">
                                <Select isClearable label={<div>
                                    <label className={' font-medium text-primary'} htmlFor="#">
                                        Tanlangan Razdel
                                    </label>
                                    <p className={'text-sm text-[#516164]'}>*<NumericFormat displayType={'text'}
                                                                                            thousandSeparator={" "}
                                                                                            value={get(volumes, 'data.count', 0)}/> natija
                                        topildi</p>
                                </div>}
                                        defaultValue={getDefaultValue(getOptionList(get(volumes, 'data.results', []), 'id', 'volume_name'), volumeId)}
                                        getValue={(val) => {
                                            setVolumeId(get(val, 'value'))
                                        }}
                                        options={getOptionList(get(volumes, 'data.results', []), 'id', 'volume_name')}
                                        placeholder={'Barcha razdellar'}/>
                            </div>
                            <div className="col-span-6">
                                <Select isClearable label={<div>
                                    <label className={' font-medium text-primary'} htmlFor="#">
                                        Tanlangan Guruh
                                    </label>
                                    <p className={'text-sm text-[#516164]'}>*3568 natija topildi</p>
                                </div>} options={[]} placeholder={'Barcha guruhlar'}/>
                            </div>
                            <div className="col-span-12 mt-5">
                                {volumeId ?  <GridView
                                        getCount={setCount}
                                        url={URLS.classifierResources}
                                        key={[KEYS.classifierResources,volumeId]}
                                        params={search ? {key: 'name', parent: search} : {key: 'volume',value:volumeId}}
                                        columns={columns}
                                    />:
                                <GridView
                                    getCount={setCount}
                                    url={URLS.classifier}
                                    key={KEYS.classifier}
                                    params={search ? {key: 'name', parent: search} : {key: 'resources'}}
                                    columns={columns}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Main>
    );
};

export default Classifier;