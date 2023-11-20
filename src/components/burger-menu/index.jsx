import React, { useState } from "react";

const burgerMenu = ({ open, setOpen }) => {
  [open, setOpen] = useState(true);
  return (
    <div
      onClick={() => setOpen(!open)}
      className={"tablet:hidden  w-[30px] h-[18px] flex flex-col gap-y-[4px] "}
    >
      <div className={"w-[30px] h-[3px]  bg-white"}></div>
      <div className={"w-[30px] h-[3px]  bg-white"}></div>
      <div className={"w-[30px] h-[3px]  bg-white"}></div>
    </div>
  );
};

export default burgerMenu;
