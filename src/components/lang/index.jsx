import React, { useState, useRef } from "react";
import Image from "next/image";
import { langs } from "@/constants";
import { get } from "lodash";
import { motion } from "framer-motion";
import { useOnClickOutside } from "@/hooks/general/use-outside-click";
import { useSettingsStore } from "@/store";
import { useTranslation } from "react-i18next";
import { config } from "@/config";
import clsx from "clsx";

const Lang = () => {
  const setLang = useSettingsStore((state) => get(state, "setLang", () => {}));
  const language = useSettingsStore((state) =>
    get(state, "lang", config.DEFAULT_APP_LANG)
  );
  const { i18n } = useTranslation();
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  const handleLangItemClick = (lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div ref={ref} className={"relative bg-white p-[6px] rounded-[2px]"}>
      <div
        className={"flex cursor-pointer "}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-x-[5px]">
          <Image
            src={`/images/${language.toLowerCase()}-flag.png`}
            width={30}
            height={30}
            alt="flag"
          />

          <div className="w-[1px] h-full bg-[#C5C5C5]"></div>
          <span
            className={
              "ml-1.5 mr-1 text-black cursor-pointer inline-block capitalize"
            }
          >
            {language}
          </span>
        </div>
        <Image
          width={9}
          height={6}
          alt={"map"}
          src={"/icons/arrow-down.svg"}
          className="text-black"
        />
      </div>
      {open && (
        <motion.ul
          className={
            "absolute top-full -left-[50px] bg-white w-[110px] text-[#8E8E8E] flex flex-col gap-y-[10px] text-sm p-2 capitalize z-10"
          }
        >
          {langs.map((lang) => (
            <li
              onClick={() => handleLangItemClick(get(lang, "key"))}
              className={clsx(
                "hover:text-[#1890FF] cursor-pointer flex gap-x-[10px] items-center ",
                {
                  "text-[#1890FF]":
                    get(lang, "key", config.DEFAULT_APP_LANG) == language,
                }
              )}
              key={get(lang, "id")}
            >
              <Image
                src={`/images/${get(lang, "image")}.png`}
                width={30}
                height={30}
                alt="flag"
              />
              {get(lang, "title")}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Lang;
