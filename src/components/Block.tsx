import { useState } from 'react';

export const Block = ({ block, handleClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleChildClick = (e) => {
    console.log(e.currentTarget);
    console.log(e.currentTarget.dataset);
    setIsClicked(true);
    !isClicked && handleClick(block.num);
  };

  return (
    <div
      className="block"
      onClick={ handleChildClick }
      style={ { backgroundColor: block.color } }
    >
      { block.num }
    </div>
  );
};
