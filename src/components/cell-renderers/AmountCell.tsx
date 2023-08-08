import type { FC } from 'react';

type AmountCellPropsT = {
  amount?: number;
  currency?: string;
};

const AmountCell: FC<AmountCellPropsT> = ({ amount, currency }) => {
  return (
    <div className="whitespace-nowrap">
      {`${amount?.toFixed(2)} ${currency}`}
    </div>
  );
};

export default AmountCell;
