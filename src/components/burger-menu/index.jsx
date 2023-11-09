import React from "react";

const burgerMenu = ({ handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={"tablet:hidden  w-[30px] h-[18px] flex flex-col gap-y-[4px] "}
    >
      <div className={"w-[30px] h-[3px] rounded-[2px] bg-white"}></div>
      <div className={"w-[30px] h-[3px] rounded-[2px] bg-white"}></div>
      <div className={"w-[30px] h-[3px] rounded-[2px] bg-white"}></div>
    </div>
  );
};

export default burgerMenu;
