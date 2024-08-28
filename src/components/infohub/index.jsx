import Image from "next/image";
import React from "react";
import Link from "next/link";

const InfoHub = () => {
  return (
    <div
      className={
        "fixed rounded-t-[5px] top-[50px] right-0 z-50 laptop:hover:text-lg transition-all duration-400"
      }
    >
      <ul>
        <li className="bg-[#017EFA] text-white px-[10px] py-[10px] mb-[10px] icon-item">
          <Link
            href={"https://tmsiti.uz/"}
            className="flex items-center justify-between gap-x-[10px] cursor-pointer "
          >
            <p className="description">Rasmiy veb-sayt</p>
            <Image
              src={"/images/official-website.png"}
              alt="official-website"
              width={40}
              height={40}
            />
          </Link>
        </li>
        <li className="bg-[#017EFA] z-50 text-white px-[10px] py-[10px] mb-[10px] icon-item">
          <Link
            href={"#"}
            className="flex items-center justify-between gap-x-[10px]"
          >
            <p className="description">Call markaz</p>
            <Image
              src={"/images/call-center.png"}
              alt="call-center"
              width={40}
              height={40}
            />
          </Link>
        </li>
        <li className="bg-[#017EFA] z-50 text-white px-[10px] py-[10px] mb-[10px] icon-item">
          <Link
            href={"#"}
            className="flex items-center justify-between gap-x-[10px]"
          >
            <p className="description">Ishonch telefoni</p>
            <Image
              src={"/images/phone.png"}
              alt="phone"
              width={40}
              height={40}
            />
          </Link>
        </li>
        <li className="bg-[#017EFA] z-50 text-white px-[10px] py-[10px] mb-[10px] icon-item">
          <Link
            href={"#"}
            className="flex items-center justify-between gap-x-[10px]"
          >
            <p className="description">Telegram bot</p>
            <Image
              src={"/images/telegram_bot.png"}
              alt="telegram_bot"
              width={40}
              height={40}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default InfoHub;
