import React from 'react';
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const Dashboard = ({children}) => {
    return (
        <div className={'flex'}>
            <Sidebar/>
            <main className={'w-[calc(100%-350px)] ml-[350px]'}>
                <Header/>
                <section className={'bg-[#F4F8FA] min-h-screen'}>
                    {children}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;