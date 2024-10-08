import React, { useEffect, useState } from "react";
import Brand from "../../../components/brand";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSettingsStore } from "@/store";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useSession } from "next-auth/react";
import { OverlayLoader } from "@/components/loader";

const customerMenu = [
  {
    id: 1,
    title: "Mening buyurtmalarim",
    url: "/dashboard/customer/my-orders",
  },
];

const companyMenu = [
  {
    id: 1,
    title: "Bosh sahifa",
    url: "/dashboard",
  },
  {
    id: 2,
    title: "Materiallar va buyumlar",
    url: "/dashboard/materials",
  },
  {
    id: 3,
    title: "Mashina mexanizmlar",
    url: "/dashboard/machine-mechano",
  },
  {
    id: 4,
    title: "Qurilish ishlari",
    url: "/dashboard/works",
  },
  {
    id: 5,
    title: "Kichik mexanizatsiya",
    url: "/dashboard/small-mechano",
  },
  {
    id: 6,
    title: "Kompaniya haqida",
    url: "/dashboard/about",
  },
  {
    id: 7,
    title: "Buyurtmalar",
    url: "/dashboard/orders",
  },
];

const Sidebar = ({ openSidebar }) => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [position, setPosition] = useState("supplier");
  const router = useRouter();
  const token = useSettingsStore((state) => get(state, "token", null));
  const {
    data: user,
    isLoading: isLoadingCompany,
    isFetching: isFetchingCompany,
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
    isLoading: isLoadingCustomer,
    isFetching: isFetchingCustomer,
  } = useGetQuery({
    key: KEYS.getCustomer,
    url: URLS.getCustomer,
    headers: { token: token ?? `${get(session, "user.token")}` },
    enabled: !!(
      get(session, "user.token") && get(session, "user.role") === "customer"
    ),
  });

  useEffect(() => {
    const checkRoleAndRedirect = () => {
      const userRole = get(session, "user.role");
      const pathname = router.pathname;

      if (
        userRole === "customer" &&
        pathname.startsWith("/dashboard") &&
        pathname !== "/dashboard/customer/my-orders"
      ) {
        router.push("/403");
      }

      if (
        userRole === "company" &&
        pathname.includes("/dashboard/customer/my-orders")
      ) {
        router.push("/403");
      }
    };

    checkRoleAndRedirect();
  }, [router.pathname, session]);

  return (
    <div
      className={clsx(
        "bg-[#28366D] shadow-[2px_0px_32px_rgba(0, 0, 0, 0.05)] w-[350px] h-screen fixed top-0 transition-transform duration-300 ease-linear",
        openSidebar ? "left-0" : "-translate-x-full"
      )}
    >
      <div className={"py-4 pl-5 pr-4 text-white text-sm"}>
        <Brand />
      </div>
      {get(session, "user.role") === "company" ? (
        <ul className={"text-[#8D97AD] mt-3"}>
          {get(user, "data.menu", []).map((item) => (
            <li key={get(item, "id")}>
              <Link
                className={clsx("py-3.5 px-7 block hover:text-white", {
                  "bg-[#3F54A5] text-white":
                    router.pathname === `${get(item, "url")}`,
                })}
                href={`${get(item, "url")}`}
              >
                {t(`${get(item, "title")}`)}
              </Link>
            </li>
          ))}
          {/* <li>
            <Link
              className={clsx(
                "py-3.5 px-7 block hover:text-white",
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/materials",
                },
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/materials/add-ads",
                }
              )}
              href={"/dashboard/materials"}
            >
              {t("Materiallar va buyumlar")}
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "py-3.5 px-7 block hover:text-white",
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/machine-mechano",
                },
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/machine-mechano/add-ads",
                }
              )}
              href={"/dashboard/machine-mechano"}
            >
              {t("Mashina mexanizmlar")}
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "py-3.5 px-7 block hover:text-white",
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/works",
                },
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/works/add-ads",
                }
              )}
              href={"/dashboard/works"}
            >
              {t("Qurilish ishlari")}
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "py-3.5 px-7 block hover:text-white",
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/small-mechano",
                },
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/small-mechano/add-ads",
                }
              )}
              href={"/dashboard/small-mechano"}
            >
              {t("Kichik mexanizatsiya")}
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "py-3.5 px-7 block hover:text-white",
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/technos",
                },
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/technos/add-ads",
                }
              )}
              href={"/dashboard/technos"}
            >
              {t("Uskuna va qurilmalar")}
            </Link>
          </li>
          <li>
            <Link
              className={clsx("py-3.5 px-7 block hover:text-white", {
                "bg-[#3F54A5] text-white":
                  router.pathname === "/dashboard/about",
              })}
              href={"/dashboard/about"}
            >
              {t("Kompaniya haqida")}
            </Link>
          </li> */}

          {/* <li>
            <Link
              className={clsx(
                "py-3.5 px-7 block hover:text-white",
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/orders",
                },
                {
                  "bg-[#3F54A5] text-white":
                    router.pathname === "/dashboard/orders/add-ads",
                }
              )}
              href={"/dashboard/orders"}
            >
              {t("Buyurtmalar")}
            </Link>
          </li> */}
        </ul>
      ) : get(session, "user.role") === "customer" ? (
        <ul className={"text-[#8D97AD] mt-3"}>
          {get(customer, "data.menu", []).map((item) => (
            <li key={get(item, "id")}>
              <Link
                className={clsx("py-3.5 px-7 block hover:text-white", {
                  "bg-[#3F54A5] text-white":
                    router.pathname === `${get(item, "url")}`,
                })}
                href={`${get(item, "url")}`}
              >
                {t(`${get(item, "title")}`)}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
