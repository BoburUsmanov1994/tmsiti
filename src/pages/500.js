import React from 'react';
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import Title from "@/components/title";
import {useTranslation} from "react-i18next";


const ErrorPage = () => {
    const {t} = useTranslation()
    return (
        <Main>
            <Menu active={0}/>
            <Section>
                <div className={'relative w-[75%] bg-white mx-auto my-28 p-24 drop-shadow-empty text-center'}>
                    <h1 className={'text-[#28366D] font-semibold mb-2.5 text-9xl'}>500</h1>
                    <Title center>{t('title_500')}</Title>
                    <p>{t('Serverning ichki xatoligi, iltimos keyinroq qayta urinib ko\'ring!')}</p>
                </div>
            </Section>
        </Main>
    );
};

export default ErrorPage;