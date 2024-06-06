import React from 'react';

const Star = ({ selected = false, onClick }) => (
    <span onClick={onClick} style={{ cursor: 'pointer', color: selected ? '#ffd700' : '#ccc' }}>
    &#9733;
  </span>
);

export default Star;
