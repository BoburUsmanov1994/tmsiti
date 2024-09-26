import React, { useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import clsx from "clsx";
import useGetQuery from "@/hooks/api/useGetQuery";
import { URLS } from "@/constants/url";
import { KEYS } from "@/constants/key";
import { useSession } from "next-auth/react";
import { useSettingsStore } from "@/store";
import { useRouter } from "next/router";

const Dashboard = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const router = useRouter();
  const token = useSettingsStore((state) => get(state, "token", null));
  const { data: session } = useSession();
  const {
    data: user,
    isLoadingCompany,
    isFetchingCompany,
  } = useGetQuery({
    key: KEYS.getMe,
    url: URLS.getMe,
    headers: { token: token ?? `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "company"
    ),
  });

  const {
    data: customer,
    isLoadingCustomer,
    isFetchingCustomer,
  } = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: { token: token ?? `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "customer"
    ),
  });
  return (
    <div className={"flex"}>
      <Sidebar openSidebar={openSidebar} />
      <main
        className={clsx(
          openSidebar ? "w-[calc(100%-350px)] ml-[350px]" : "w-full"
        )}
      >
        <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        <section className={"bg-[#F4F8FA] min-h-screen"}>{children}</section>
      </main>
    </div>
  );
};

export default Dashboard;
