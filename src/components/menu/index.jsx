import React, { useState } from "react";
import Link from "next/link";
import { get, isEqual } from "lodash";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import BurgerMenu from "@/components/burger-menu";
import Search from "@/components/search";

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
  const [open, setOpen] = useState(true);
  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div className={" bg-[#28366D]  py-5 "}>
      {/*  desktop version */}
      <div
        onClick={toggleMenu}
        className={"tablet:hidden flex items-end justify-end container"}
      >
        <BurgerMenu />
      </div>

      <ul
        className={`container text-[#8D97AD] tablet:flex tablet:text-xs laptop:text-sm desktop:text-base hidden  justify-between`}
      >
        {menuData.map((item) => (
          <li>
            <Link
              className={clsx(
                `hover:text-white transition-all border-b border-b-transparent font-medium`,
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
        className={` laptop:hidden ${
          open ? "hidden" : "flex"
        } container text-[#8D97AD] flex-col items-center gap-y-[10px] justify-between`}
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
