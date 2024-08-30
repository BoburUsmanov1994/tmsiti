import Button from "@/components/button";
import MyCalendar from "@/components/calendar";
import ClockTMSITI from "@/components/clock";
import Reveal from "@/components/reveal";
import Title from "@/components/title";
import TashkentWeather from "@/components/weather";
import ReactPlayer from "react-player";
import Main from "@/layouts/main";
import { get } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RevealLeft from "@/components/reveal/revealLeft";
import RevealRight from "@/components/reveal/revealRight";

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
  },
  {
    id: 2,
    image: "project-image2",
    title: "Maktab",
  },
  {
    id: 3,
    image: "project-image3",
    title: "Poliklinika",
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
  {
    id: 6,
    url: "https://digital.uz/",
  },
  {
    id: 7,
    url: "https://www.standart.uz/en",
  },
];

const Index = () => {
  return (
    <Main>
      {/* menu section */}
      <section
        className=""
        // style={{ backgroundImage: "url(/images/bg-main-image3.jpg)" }}
      >
        <div className="grid grid-cols-12 gap-[30px] container  bg-white  py-[50px]">
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
                  className="col-span-3 main-page-menu shadow-2xl rounded-[10px] w-full h-[300px] border flex flex-col  justify-center items-center bg-center bg-cover"
                  style={{
                    backgroundImage: `url(/images/main-page${index + 1}.png)`,
                  }}
                >
                  <div className="menu-item text-white">
                    {get(item, "title")}
                  </div>
                </div>
                <h4 className="text-[#414141] text-center py-2">
                  {get(item, "title")}
                </h4>
              </Reveal>
            </Link>
          ))}

          <div className=" col-span-12 flex items-center gap-x-[50px] bg-[#88C5FF] container rounded-[10px]">
            <RevealLeft>
              <div className=" text-white ">
                <Title>Klassifikator haqida</Title>
                <p>
                  Oʻzbekiston Respublikasi Qurilish va uy-joy kommunal xoʻjaligi
                  vazirligi huzuridagi Texnik me'yorlash va standartlashtirish
                  ilmiy-tadqiqot instituti taqdim etadi. “Qurilish resurslari
                  milliy klassifikatori” elektron platformasi bu: <br /> - 190
                  mingdan ortiq davlat standartlari asosida shakllantirilgan
                  qurilish materiallari, uskuna va jihozlarning turlari; <br />{" "}
                  - Qurilish materiallari ishlab chikaruvchilarining bir erda
                  jamlanganligi;
                  <br /> - Davlat tashkilotlari integrasiyasi natijasida Narx
                  hamda sifatning muvofiqligi; <br /> - Tovar-xom ashyo birja
                  katirovkalari <br /> - Muntazam yangilanib boradigan oʻrtacha
                  narxlar - bir soʻz bilan aytganda Keng auditoriya uchun
                  maksimal axborotni ta'minlashdan iborat. Siz “Qurilish
                  resurslari milliy klassifikatori” orqali qurilish xizmatlari
                  bozorining ishonchli etkazib beruvchilariga aylaning va butun
                  Oʻzbekiston boʻylab yirik qurilish loyihalarida ishtirok
                  eting.
                </p>
              </div>
            </RevealLeft>

            <RevealRight>
              <div className="col-span-6 rounded-[20px] mb-[30px]">
                <ReactPlayer
                  url={"/videos/video_2024-08-30_08-31-21.mp4"}
                  width={600}
                  height={400}
                  playing={false}
                  controls={true}
                  playsinline={true}
                  className={"rounded-[20px]"}
                />
              </div>
            </RevealRight>
          </div>

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
                <div
                  className="bg-cover bg-center w-[250px] h-[250px] rounded-full"
                  style={{
                    backgroundImage: `url(/images/project-image${
                      index + 1
                    }.png)`,
                  }}
                ></div>
              </Reveal>

              <Reveal duration={0.5}>
                <h4 className="my-[15px] text-[22px] font-semibold uppercase">
                  {get(item, "title")}
                </h4>
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
            <div className="col-span-3  flex items-center justify-center p-[10px] rounded-[15px] hover:shadow-md transition-all duration-400">
              <Reveal duration={Number(`0.${index + 2}`)}>
                <Link href={`${get(item, "url")}`}>
                  <Image
                    src={`/images/integration${get(item, "id")}.png`}
                    alt="integration"
                    width={350}
                    height={30}
                  />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* <div className="absolute top-0 right-0">
        <ClockTMSITI />
        <TashkentWeather />
      </div> */}
    </Main>
  );
};

export default Index;
