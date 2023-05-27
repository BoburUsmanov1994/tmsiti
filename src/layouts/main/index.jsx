import React from 'react';
import Header from "@/components/header";
import Wrapper from "@/components/wrapper";
import Footer from "@/components/footer";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const Main = ({children}) => {
    const {data} = useQuery(['currency'],()=>axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json'),{})
    return (
        <Wrapper>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </Wrapper>
    );
};

export default Main;