import React, { useState } from "react";
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";

import Link from "next/link";

import { useCounter } from "@/context/counter";
import { useRouter } from "next/router";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get, head } from "lodash";
import { last } from "lodash/array";

const Index = () => {
  const { state, dispatch } = useCounter();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(48);
  const { stir } = router.query;

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.companyAds,
    url: `${URLS.companyAds}${stir}/`,
    params: {
      page,
      page_size: pageSize,
    },
  });

  console.log("state", state);

  const handleIncrement = (product) => {
    dispatch({ type: "INCREMENT", payload: product.id });
  };

  const handleDecrement = (product) => {
    dispatch({ type: "DECREMENT", payload: product.id });
    if (state.count <= 0) {
      state.count = 0;
    }
  };
  console.log("state", state);
  return (
    <Main>
      <Menu />
      <Section>
        <Link href={"#"}>Mahsulotga qaytish</Link>

        <main
          className={"min-h-[100vh] bg-white mt-[100px] rounded-[6px] p-[20px]"}
        >
          <h1 className={"text-3xl font-bold"}>Savat</h1>
          <div>
            {Object.entries(state).map((item, index) => (
              <div key={index} className={"flex justify-between"}>
                <p>{get(JSON.parse(head(item)), "material_description")}</p>
                <p>x{last(item)}</p>
                <p>
                  {get(JSON.parse(head(item)), "material_price", 0) *
                    last(item)}
                  ₽
                </p>
              </div>
            ))}
          </div>
        </main>
      </Section>
    </Main>
  );
};

export default Index;
