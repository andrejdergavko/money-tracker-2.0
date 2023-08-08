import type { FC } from 'react';

type DescriptionCellPropsT = {
  description?: string;
};

const DescriptionCell: FC<DescriptionCellPropsT> = ({ description }) => {
  return (
    <div className="max-w-[600px] min-w-[350px] text-xs overflow-ellipsis">
      {description}
    </div>
  );
};

export default DescriptionCell;
