import React from 'react';
import Main from "@/layouts/main";
import Menu from "@/components/menu";
import Section from "@/components/section";
import {useRouter} from "next/router";

const ViewPage = () => {
    const router = useRouter()
    const {code} = router.query;
    return (
        <>
            <Main>
                <Menu active={1}/>
                <Section>
                    view {code}
                </Section>
            </Main>
        </>
    );
};

export default ViewPage;