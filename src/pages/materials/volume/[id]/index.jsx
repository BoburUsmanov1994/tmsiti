import React from 'react';
import Main from "@/layouts/main";
import Section from "@/components/section";
import Menu from "@/components/menu";
import Title from "@/components/title";
import Select from "@/components/select";

const Index = () => {
    return (
        <Main>
            <Menu active={1}/>
            <Section>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 text-center mt-5">
                        <Title  center>Materiallar va buyumlar</Title>
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select label={'Tanlangan mahsulot turi'} />
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select label={'Tanlangan bo‘lim'} />
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select label={'Tanlangan kategoriya'} />
                    </div>
                    <div className="col-span-12 mb-5">
                        <Select label={'Tanlangan guruh'} />
                    </div>
                </div>
            </Section>
        </Main>
    );
};

export default Index;