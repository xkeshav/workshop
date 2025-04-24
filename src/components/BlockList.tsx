// create a n*m block list where user click on block and its color changed and when all block color done then it will change color back in same order it was clicked
import { useEffect, useState } from 'react';
import { Block } from './Block';

const blockData = [
  { num: 1, color: 'green' },
  { num: 2, color: 'green' },
  { num: 3, color: 'green' },
];

export const BlockList = () => {
  const [order, setOrder] = useState<number[]>([]);
  const [data, setData] = useState(blockData);
  const [isResetting, setIsResetting] = useState(false);


  const handleFromParent = (n: number) => {
    if (isResetting) return;
    setData((pd) => pd.map((b) => b.num === n ? { ...b, color: 'red' } : b));
    setOrder(order.concat(n));
  };

  const resetBlockColor = (n: number) => {
    // this is tricky part ; use functional update to get the latest state
    setData(pd => pd.map((d) => d.num === n ? { ...d, color: 'green' } : d));
  }

  const resetColor = () => {
    order.forEach((n, idx) => {
      setTimeout(() => {
        resetBlockColor(n);
        if (idx === order.length - 1) {
          setOrder([]);
          setIsResetting(false);
        }
      }, (idx + 1) * 1000);
    });
  };



  useEffect(() => {
    const allDone = data.every((b) => b.color === 'red');
    if (allDone && !isResetting) {
      setIsResetting(true);
      resetColor();
    }
  }, [data, isResetting, resetColor]);

  return (
    <div>
      <h1>Block Color Problem</h1>
      <p>Initially Block colors are green and when user click on a block it will change to red and when all block color changed then reset the block color to green in the same order it has been clicked</p>
      <p>Click Order: { order }</p>
      { data.map((b, idx) => (
        <Block
          key={ idx }
          block={ b }
          handleClick={ handleFromParent }
        />
      )) }
    </div>
  )
}
