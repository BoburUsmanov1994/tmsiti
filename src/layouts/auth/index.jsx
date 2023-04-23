import React from 'react';
import Header from "./components/header";
import Wrapper from "@/components/wrapper";
import Footer from "@/components/footer";

const AuthLayout = ({children}) => {
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

export default AuthLayout;