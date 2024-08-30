import Button from "@/components/button";
import MyCalendar from "@/components/calendar";
import ClockTMSITI from "@/components/clock";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import Title from "@/components/title";
import TashkentWeather from "@/components/weather";

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

const projectData = [
  {
    id: 1,
    image: "project-image1",
    title: "Bog'cha",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    image: "project-image2",
    title: "Maktab",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 3,
    image: "project-image3",
    title: "Poliklinika",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const integrationData = [
  {
    id: 1,
    url: "https://www.soliq.uz/",
  },
  {
    id: 2,
    url: "https://uzex.uz/",
  },
  {
    id: 3,
    url: "https://stat.uz/uz/",
  },
  {
    id: 4,
    url: "https://customs.uz/oz",
  },
  {
    id: 5,
    url: "https://www.imv.uz/",
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

        {projectData.map((item, index) => (
          <div
            key={get(item, "id")}
            className={`col-span-4 border p-[20px] hover:border-[#1890FF] shadow-md transition-all duration-500  rounded-[20px] project-data-${get(
              item,
              "id"
            )}`}
          >
            <Reveal duration={0.4}>
              <Image
                src={`/images/${get(item, "image")}.png`}
                alt="project-image"
                width={100}
                height={100}
                className="bg-[#1890FF] p-[20px] rounded-[10px]"
              />
            </Reveal>

            <Reveal duration={0.5}>
              <h4 className="my-[15px] text-[22px] font-semibold">
                {get(item, "title")}
              </h4>
            </Reveal>

            <Reveal duration={0.6}>
              <p>{get(item, "desc")}</p>
            </Reveal>
          </div>
        ))}

        <div className="col-span-12 flex items-center justify-center">
          <Reveal duration={0.5}>
            <Button url="/works">Batafsil</Button>
          </Reveal>
        </div>

        <div className="col-span-12">
          <Title>Integratsiya bo'yicha hamkorlar</Title>
        </div>

        {integrationData.map((item, index) => (
          <div className="col-span-3 border flex items-center justify-center p-[10px] rounded-[15px] hover:shadow-md transition-all duration-400">
            <Reveal duration={Number(`0.${index + 2}`)}>
              <Link href={`${get(item, "url")}`}>
                <Image
                  src={`/images/integration${get(item, "id")}.png`}
                  width={350}
                  height={20}
                />
              </Link>
            </Reveal>
          </div>
        ))}
      </div>

      {/* <div className="absolute top-0 right-0">
        <ClockTMSITI />
        <TashkentWeather />
      </div> */}
    </Main>
  );
};

export default Index;
