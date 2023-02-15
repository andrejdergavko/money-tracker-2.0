import type { FC } from 'react';

interface AmountInUsdCellPropsT {
  amount?: number;
}

const AmountInUsdCell: FC<AmountInUsdCellPropsT> = ({ amount }) => {
  return <div className="whitespace-nowrap">{`${amount?.toFixed(2)} USD`}</div>;
};

export default AmountInUsdCell;
