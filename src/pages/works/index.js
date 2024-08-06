import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import { getMostOrdered, getCategories } from "@/api";
import { KEYS } from "@/constants/key";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { ContentLoader } from "@/components/loader";
import Category from "@/components/category";
import Title from "@/components/title";
import { get, isEmpty } from "lodash";

import ErrorPage from "@/pages/500";
import { URLS } from "@/constants/url";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import useGetQuery from "@/hooks/api/useGetQuery";
import Image from "next/image";
import { NumericFormat } from "react-number-format";
import axios from "axios";
export default function Works() {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(100);
  const [isActive, setIsActive] = useState(0);
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [url, setUrl] = useState(URLS.cmt);
  const [data, setData] = useState([]);
  const toggleTabs = (index) => {
    setTabs(index);
  };
  const [search, setSearch] = useState("");
  const [tabs, setTabs] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { data: cmt_category = {}, isLoading: isLoadingCmt_Category } =
    useGetQuery({
      url: URLS.cmt_category,
      key: KEYS.cmetaCategory,
    });

  const dataCategory = cmt_category.data?.results || [];
  const filteredDataCategory = dataCategory.filter((item) => {
    return Object.values(item).some((value) => String(value).toLowerCase());
  });

  const {
    data: sample_project_category = {},
    isLoading: isLoadingSample_Category,
  } = useGetQuery({
    url: URLS.sample_project_category,
    key: KEYS.sampleCategory,
  });

  const SampledataCategory = sample_project_category.data?.results || [];
  const SamplefilteredDataCategory = dataCategory.filter((item) => {
    return Object.values(item).some((value) => String(value).toLowerCase());
  });

  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const handleClick = async (id) => {
    try {
      const res = await axios.get(
        `https://backend-market.tmsiti.uz/cmeta/cmeta/${id}`
      );
      setData(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cmetaClick = async (id) => {
    try {
      const res = await axios.get(
        `https://backend-market.tmsiti.uz/cmeta/sample/${id}/?limit=10000`
      );
      setData(res.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlecmetaClick = (id) => {
    toggleTabs(id);
    cmetaClick(id);
  };
  // const data = cmt.data?.results || [];

  const columns = [
    {
      title: "№",
      key: "id",
      render: ({ index }) => <span className={"font-semibold"}>{index}</span>,
      classnames: "text-sm",
    },
    {
      title: "Mahsulot nomi",
      key: "name",
      sorter: true,
      classnames: "min-w-[175px] text-sm ",
      render: ({ value, row }) => (
        <Link
          className={"whitespace-nowrap text-[#1890FF]"}
          href={get(row, "resource_type")}
        >
          {value}
        </Link>
      ),
    },
    {
      title: "Mahsulot kodi",
      key: "code",
      sorter: true,
      classnames: "text-sm",
    },
    {
      title: "O’lchov birligi",
      key: "measure",
      classnames: "text-center text-sm",
    },
  ];
  const CMT = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const Sample = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickFormat = (type) => {
    setIsActive(type);
  };

  const {
    data: volumes,
    isError,
    isLoading,
    isFetching,
  } = useQuery([KEYS.categories], () =>
    getCategories({ url: URLS.categories, params: { key: KEYS.works } })
  );
  const {
    data: items,
    isLoading: machineLoading,
    isError: machineError,
  } = useQuery([KEYS.works, pageSize], () =>
    getMostOrdered({
      url: URLS.works,
      params: { key: KEYS.viewCounts, page_size: pageSize },
    })
  );
  if (isError || machineError) {
    return <ErrorPage />;
  }
  if (isLoading || machineLoading || isFetching) {
    return (
      <Main>
        <ContentLoader />
      </Main>
    );
  }

  return (
    <Main>
      <Menu active={3} />
      <Section>
        <div className={"grid grid-cols-12 tablet:gap-x-8 gap-x-4"}>
          <div
            className={"col-span-12 flex justify-center items-center gap-x-8"}
          >
            <button
              onClick={() => setTab(1)}
              className={`${
                tab === 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500 border-[1px]"
              }  py-2 px-6 rounded-[6px] active:scale-90 transition-all duration-300`}
            >
              Hajm usuli
            </button>
            <button
              onClick={() => setTab(2)}
              className={`bg-blue-500 ${
                tab === 2
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500 border-[1px]"
              }  py-2 px-6 rounded-[6px] active:scale-90 transition-all duration-300`}
            >
              Namunaviy loyihalar
            </button>
          </div>
        </div>
      </Section>
      {tab === 1 && (
        <Section>
          <div className="desktop:col-span-3 mobile:col-span-12 tablet:col-span-6 laptop:col-span-4 col-span-12 mb-5">
            {filteredDataCategory.length > 0 ? (
              filteredDataCategory.map((item, index) => (
                <button
                  onClick={() => handleClick(item.id)}
                  className={`bg-blue-500 ${
                    tab === item.id
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 border-blue-200"
                  } m-5 py-2 px-6 rounded-[6px] active:scale-90 transition-all duration-300`}
                  key={index}
                >
                  {index + 1}. {item.name}
                </button>
              ))
            ) : (
              <h1>No data available</h1>
            )}
          </div>

          <div className="col-span-12 tablet:col-span-7 laptop:col-span-8 desktop:col-span-9 tablet:mt-0 mt-[30px]">
            <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4">
              <div className="col-span-12">
                <div className={"col-span-12 "}>
                  <div className={"mb-5"}>
                    <div className={"mb-2.5"}>
                      <label
                        className={" font-medium text-primary"}
                        htmlFor="#"
                      >
                        Qidiruv
                      </label>
                      <p className={"text-sm text-[#516164]"}>
                        *
                        <NumericFormat
                          value={count}
                          displayType={"text"}
                          thousandSeparator={" "}
                        />{" "}
                        natija topildi
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Kerakli mahsulotni qidiring..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className={
                        "border border-transparent w-full px-5 py-2.5 mb-5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                      }
                    />
                  </div>
                </div>
                <div>
                  <table className="table-auto w-full">
                    <thead className="text-black text-center">
                      <tr>
                        <th
                          className={
                            "px-4 py-2  bg-white  text-gray-900 uppercase font-bold text-sm"
                          }
                        >
                          №
                        </th>
                        <th className="px-4 py-2   text-start bg-white text-gray-900 uppercase font-bold text-sm">
                          Mahsulot nomi
                        </th>
                        <th className="px-4 py-2   bg-white text-gray-900 uppercase font-bold text-sm">
                          Mahsulot Kodi
                        </th>
                        <th className="px-4 py-2   bg-white text-gray-900 uppercase font-bold text-sm">
                          O'lchov Birligi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {CMT.length > 0 ? (
                        CMT.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {index + 1}
                            </td>
                            {columns.slice(1).map((col) => (
                              <td
                                key={col.key}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                              >
                                {item[col.key] || "N/A"}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={columns.length}
                            className="px-6 py-4 text-center text-sm text-gray-800"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
      <Section>
        {tab === 2 && (
          <Section>
            <div className={"grid grid-cols-12 gap-x-[30px]"}>
              <div
                className={
                  "col-span-4 text-center relative flex justify-center items-start"
                }
              >
                {/* Modal */}
                {selectedRegion && (
                  <div className="absolute top-[70px] right-0 transform  bg-[#F4F4F4] shadow-xl rounded-[8px] bg-opacity-75 text-black p-4 w-[500px] max-h-[500px] overflow-y-scroll">
                    <div className={"flex justify-between "}>
                      <h1 className={"text-lg font-bold text-start p-2"}>
                        {regionName}
                      </h1>
                      <button onClick={closeRegion} className={""}>
                        {" "}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_717_3428)">
                            <path
                              d="M18 6L6 18"
                              stroke="#000"
                              strokeWidth="2.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 6L18 18"
                              stroke="#000"
                              strokeWidth="2.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_717_3428">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                    <div className={"flex items-start"}>
                      <div>
                        {get(region, "data", []).map((item) => (
                          <div className={"flex items-start"}>
                            <Link
                              href={`/company/${get(item, "company_stir")}`}
                            >
                              <abbr
                                className={"no-underline"}
                                title={`Manzili: ${get(
                                  item,
                                  "company_address"
                                )} \n Telefon-raqami: ${get(
                                  item,
                                  "company_phone_main"
                                )}`}
                              >
                                <h1
                                  className={
                                    "text-sm py-1 hover:bg-[#E6E6E6] px-2 rounded-[2px] transition-all duration-400"
                                  }
                                >
                                  {get(item, "company_name")}
                                </h1>{" "}
                              </abbr>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                "grid grid-cols-12 mt-[30px] min-h-fit gap-x-[30px] gap-y-[30px]"
              }
            >
              {SampledataCategory.map((item, index) => (
                <div
                  key={index}
                  // onClick={() => handleClick(item.id)}
                  onClick={() => handlecmetaClick(item.id)}
                  className={`col-span-4 flex items-center ${
                    tabs === item.id ? "bg-blue-200" : "bg-white-100"
                  } justify-center flex-col gap-y-[10px] border-[2px] min-h-[150px] rounded-[8px] cursor-pointer hover:bg-blue-200 transition-all duration-500 text-black`}
                >
                  <h3>{item.name}</h3>
                  <Image
                    src={`/images/${item?.name.toLowerCase()}.png`}
                    alt={item.name}
                    width={320}
                    height={240}
                  />
                </div>
              ))}
            </div>

            {tabs === 1 ? (
              <div className={"mt-[30px]"}>
                <Title>Bog'cha</Title>
                <Section>
                  <div className="col-span-12 tablet:col-span-7 laptop:col-span-8 desktop:col-span-9 tablet:mt-0 mt-[30px]">
                    <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4">
                      <div className="col-span-12">
                        <div className={"col-span-12 "}>
                          <div className={"mb-5"}>
                            <div className={"mb-2.5"}>
                              <label
                                className={" font-medium text-primary"}
                                htmlFor="#"
                              >
                                Qidiruv
                              </label>
                              <p className={"text-sm text-[#516164]"}>
                                *
                                <NumericFormat
                                  value={count}
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                />{" "}
                                natija topildi
                              </p>
                            </div>
                            <input
                              type="text"
                              placeholder="Kerakli mahsulotni qidiring..."
                              value={searchQuery}
                              onChange={handleSearch}
                              className={
                                "border border-transparent w-full px-5 py-2.5 mb-5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <table className="table-auto w-full mt-[20px]">
                            <thead>
                              <tr>
                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  №
                                </th>

                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  Mahsulot kodi
                                </th>
                                <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                                  Mahsulot nomi
                                </th>
                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  O'lchov birligi
                                </th>

                                <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                                  Narxi
                                </th>
                              </tr>
                            </thead>
                            {Sample.map((stockItem, index) => (
                              <tbody
                                key={index}
                                className={
                                  "even:bg-white odd:bg-[#FBFBFC] text-black"
                                }
                              >
                                <tr>
                                  <td className="border px-4 py-2 text-center">
                                    {index + 1}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "name")}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "code")}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "measure")}
                                  </td>

                                  <td className="border px-4 py-2 text-center">
                                    <NumericFormat
                                      value={get(stockItem, "price")}
                                      suffix={".00 so'm"}
                                      className={"bg-transparent text-center"}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
                <div className={"col-span-12 flex items-center gap-x-8"}></div>
              </div>
            ) : (
              ""
            )}

            {tabs === 2 ? (
              <div className={"mt-[30px]"}>
                <Title>Maktab</Title>
                <Section>
                  <div className="col-span-12 tablet:col-span-7 laptop:col-span-8 desktop:col-span-9 tablet:mt-0 mt-[30px]">
                    <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4">
                      <div className="col-span-12">
                        <div className={"col-span-12 "}>
                          <div className={"mb-5"}>
                            <div className={"mb-2.5"}>
                              <label
                                className={" font-medium text-primary"}
                                htmlFor="#"
                              >
                                Qidiruv
                              </label>
                              <p className={"text-sm text-[#516164]"}>
                                *
                                <NumericFormat
                                  value={count}
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                />{" "}
                                natija topildi
                              </p>
                            </div>
                            <input
                              type="text"
                              placeholder="Kerakli mahsulotni qidiring..."
                              value={searchQuery}
                              onChange={handleSearch}
                              className={
                                "border border-transparent w-full px-5 py-2.5 mb-5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <table className="table-auto w-full mt-[20px]">
                            <thead>
                              <tr>
                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  №
                                </th>

                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  Mahsulot kodi
                                </th>
                                <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                                  Mahsulot nomi
                                </th>
                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  O'lchov birligi
                                </th>

                                <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                                  Narxi
                                </th>
                              </tr>
                            </thead>
                            {Sample.map((stockItem, index) => (
                              <tbody
                                key={index}
                                className={
                                  "even:bg-white odd:bg-[#FBFBFC] text-black"
                                }
                              >
                                <tr>
                                  <td className="border px-4 py-2 text-center">
                                    {index + 1}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "name")}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "code")}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "measure")}
                                  </td>

                                  <td className="border px-4 py-2 text-center">
                                    <NumericFormat
                                      value={get(stockItem, "price")}
                                      suffix={".00 so'm"}
                                      className={"bg-transparent text-center"}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
                <div className={"col-span-12 flex items-center gap-x-8"}></div>
              </div>
            ) : (
              ""
            )}
            {tabs === 3 ? (
              <div className={"mt-[30px]"}>
                <Title>Polikilinka</Title>
                <Section>
                  <div className="col-span-12 tablet:col-span-7 laptop:col-span-8 desktop:col-span-9 tablet:mt-0 mt-[30px]">
                    <div className="grid grid-cols-12 tablet:gap-x-8 gap-x-4">
                      <div className="col-span-12">
                        <div className={"col-span-12 "}>
                          <div className={"mb-5"}>
                            <div className={"mb-2.5"}>
                              <label
                                className={" font-medium text-primary"}
                                htmlFor="#"
                              >
                                Qidiruv
                              </label>
                              <p className={"text-sm text-[#516164]"}>
                                *
                                <NumericFormat
                                  value={count}
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                />{" "}
                                natija topildi
                              </p>
                            </div>
                            <input
                              type="text"
                              placeholder="Kerakli mahsulotni qidiring..."
                              value={searchQuery}
                              onChange={handleSearch}
                              className={
                                "border border-transparent w-full px-5 py-2.5 mb-5  bg-white placeholder:italic placeholder:text-[#516164] h-[46px] rounded-[5px] outline-none focus:border-[#28366D]"
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <table className="table-auto w-full mt-[20px]">
                            <thead>
                              <tr>
                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  №
                                </th>

                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  Mahsulot kodi
                                </th>
                                <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                                  Mahsulot nomi
                                </th>
                                <th
                                  className={
                                    "px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm"
                                  }
                                >
                                  O'lchov birligi
                                </th>

                                <th className="px-4 py-2 bg-white border text-gray-600 uppercase font-semibold text-sm">
                                  Narxi
                                </th>
                              </tr>
                            </thead>
                            {Sample.map((stockItem, index) => (
                              <tbody
                                key={index}
                                className={
                                  "even:bg-white odd:bg-[#FBFBFC] text-black"
                                }
                              >
                                <tr>
                                  <td className="border px-4 py-2 text-center">
                                    {index + 1}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "name")}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "code")}
                                  </td>

                                  <td className="border px-4 py-2 text-sm">
                                    {get(stockItem, "measure")}
                                  </td>

                                  <td className="border px-4 py-2 text-center">
                                    <NumericFormat
                                      value={get(stockItem, "price")}
                                      suffix={".00 so'm"}
                                      className={"bg-transparent text-center"}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
                <div className={"col-span-12 flex items-center gap-x-8"}></div>
              </div>
            ) : (
              ""
            )}
          </Section>
        )}
      </Section>
    </Main>
  );
}

export const getStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([KEYS.categories], () =>
    getCategories({ url: URLS.categories, params: { key: KEYS.works } })
  );
  await queryClient.prefetchQuery([KEYS.works], () =>
    getMostOrdered({ url: URLS.works, params: { key: KEYS.viewCounts } })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
