import type { FC } from 'react';

interface AmountInUsdCellPropsT {
  amount?: number;
}

const AmountInUsdCell: FC<AmountInUsdCellPropsT> = ({ amount }) => {
  return <div>{`${amount?.toFixed(2)} USD`}</div>;
};

export default AmountInUsdCell;
