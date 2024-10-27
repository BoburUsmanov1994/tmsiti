import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="flex justify-center items-center  container mx-auto translate-y-1/2 ">
      <motion.div className="border relative text-center flex flex-col items-center justify-center shadow-lg max-w-[770px] w-full h-[453px] px-[12px]">
        <h1 className="text-[35px] ">Hurmatli foydalanuvchi!</h1>
        <p className="mx-[10px]">
          Saytimizda hozirda texnik ishlar olib borilmoqda. Yaqin orada qayta
          foydalanishga topshiriladi. Iltimos, keyinroq tashrif buyuring.
        </p>
        <Image
          src={"/images/temp-error.png"}
          alt="error"
          width={180}
          height={180}
          className="absolute top-0 left-0"
        />
      </motion.div>
    </div>
  );
};

export default Index;
