import React from "react";
import Header from "@/components/header";
import Wrapper from "@/components/wrapper";
import Footer from "@/components/footer";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import FondStock from "../../components/fondStock/index";

const Main = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <FondStock />

      <Header />
      <main className={" overflow-hidden"}>
        {children}
        <Link
          href={
            "https://www.youtube.com/playlist?list=PLO9ysq-3nKVUoY3rBerX7_XkwNkmw6I_h"
          }
        >
          <button
            className={
              "fixed -right-[140px] py-[7px] px-[73px] rounded-t-[5px] top-[494px] hover:py-[20px] hover:text-lg   transition-all duration-400 text-base bg-[#017EFA] z-50 text-white -rotate-90"
            }
          >
            Tizim bo‘yicha qo‘llanma
          </button>
        </Link>
      </main>
      <Footer />
    </Wrapper>
  );
};

export default Main;
