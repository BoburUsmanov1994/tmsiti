import React from 'react';
import Header from "@/components/header";
import Wrapper from "@/components/wrapper";
import Footer from "@/components/footer";
import {useTranslation} from "react-i18next";

const Main = ({children}) => {
    const {t} = useTranslation()
    return (
        <Wrapper>
            <marquee className="absolute top-0 pt-1 text-red-600 z-50">
                <span class="font-semibold text-sm">{t("Tizim test rejimida ishlamoqda")}</span>
            </marquee>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </Wrapper>
    );
};

export default Main;