import React from 'react';
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu from "@/components/menu";
import Title from "@/components/title";

const Index = () => {
    return (
        <Main>
            <Menu active={1}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title  center>Materiallar va buyumlar</Title>
                    </div>
                </div>
            </Section>
        </Main>
    );
};

export default Index;