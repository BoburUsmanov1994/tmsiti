import React from 'react';

const Star = ({ selected = false, onClick }) => (
    <span onClick={onClick} style={{ cursor: 'pointer', color: selected ? '#ffd700' : '#ccc' }} className={"w-[50px] h-[50px]"}>
    &#9733;
  </span>
);

export default Star;
