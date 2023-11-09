import React from "react";
import Link from "next/link";
import { get, isEqual } from "lodash";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export const menuData = [
  {
    id: 1,
    title: "materials",
    url: "/",
    filterUrl: "/materials/volume",
  },
  {
    id: 2,
    title: "machine_mechanos",
    url: "/machine-mechano",
    filterUrl: "/machine-mechano/category",
  },
  {
    id: 3,
    title: "works",
    url: "/works",
    filterUrl: "/works/category",
  },
  {
    id: 4,
    title: "small_mechanos",
    url: "/small-mechano",
    filterUrl: "/small-mechano/category",
  },
  {
    id: 5,
    title: "technos",
    url: "/technos",
    filterUrl: "/technos/volume",
  },
  {
    id: 6,
    title: "csr",
    url: "/classifier",
  },
  {
    id: 7,
    title: "blocks",
    url: "/volumes",
  },
];
const Menu = ({ active = 0 }) => {
  const { t } = useTranslation();
  return (
    <div className={" bg-[#28366D]  py-5 "}>
      {/*  desktop version */}
      <ul
        className={
          "container text-[#8D97AD] laptop:flex hidden justify-between"
        }
      >
        {menuData.map((item) => (
          <li>
            <Link
              className={clsx(
                "hover:text-white transition-all border-b border-b-transparent font-medium",
                {
                  "!border-b-[#1890FF] text-white": isEqual(
                    get(item, "id"),
                    active,
                  ),
                },
              )}
              href={get(item, "url")}
            >
              {t(get(item, "title"))}
            </Link>
          </li>
        ))}
      </ul>
      {/*  mobile version*/}
      <ul
        className={
          " laptop:hidden container text-[#8D97AD] flex justify-between"
        }
      >
        {menuData.map((item) => (
          <li>
            <Link
              className={clsx(
                "hover:text-white transition-all border-b border-b-transparent font-medium",
                {
                  "!border-b-[#1890FF] text-white": isEqual(
                    get(item, "id"),
                    active,
                  ),
                },
              )}
              href={get(item, "url")}
            >
              {t(get(item, "title"))}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
