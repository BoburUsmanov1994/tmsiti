import MyCalendar from "@/components/calendar";
import ClockTMSITI from "@/components/clock";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import Title from "@/components/title";

import Main from "@/layouts/main";
import { get } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const menuData = [
  {
    id: 1,
    title: "Material va buyumlar",
    image: "",
    url: "/",
  },
  {
    id: 2,
    title: "Mashina va mexanizmlar",
    image: "",
    url: "/machine-mechano",
  },
  {
    id: 3,
    title: "Qurilish ishlari",
    image: "",
    url: "/works",
  },
  {
    id: 4,
    title: "Kichik mexanizatsiyalar",
    image: "",
    url: "/small-mechano",
  },
  {
    id: 5,
    title: "Uskuna va qurilmalar",
    image: "",
    url: "/technos",
  },
  {
    id: 6,
    title: "Klassifikator",
    image: "",
    url: "/classifier",
  },
  {
    id: 7,
    title: "Integratsiyalar",
    image: "",
    url: "/statistics",
  },
];

const Index = () => {
  return (
    <Main>
      {/* menu section */}
      <div className="grid grid-cols-12 gap-[30px] container my-[50px]">
        <div className="col-span-12">
          <Reveal duration={0.3}>
            <Title>Bo&apos;limlar</Title>
          </Reveal>
        </div>
        {menuData.map((item, index) => (
          <Link
            key={get(item, "id")}
            href={get(item, "url")}
            className="text-white col-span-3 text-lg"
          >
            <Reveal duration={Number(`0.${index + 2}`)}>
              <div
                className="col-span-3 main-page-menu w-full h-[300px] border flex flex-col  justify-center items-center bg-center bg-cover"
                style={{
                  backgroundImage: `url(/images/main-page${index + 1}.jpg)`,
                }}
              >
                <div className="menu-item">{get(item, "title")}</div>
              </div>
            </Reveal>
          </Link>
        ))}
        <div className="col-span-12 mt-[30px]">
          <Title>Namunaviy loyihalar</Title>
        </div>
      </div>

      <div className="absolute top-0 right-0">
        <ClockTMSITI />
      </div>
    </Main>
  );
};

export default Index;
