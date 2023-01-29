import type { FC } from 'react';

interface AmountCellPropsT {
  amount?: number;
  currency?: string;
}

const AmountCell: FC<AmountCellPropsT> = ({ amount, currency }) => {
  return <div>{`${amount?.toFixed(2)} ${currency}`}</div>;
};

export default AmountCell;
