import type { FC } from 'react';
import Chip from '@mui/material/Chip';

import { CategoryT } from '@app-types/entities';

interface PropsT {
  category?: CategoryT;
  onEdit: () => void;
}

const EditableCategoryCell: FC<PropsT> = ({ category, onEdit }) => {
  return (
    <div className="flex flex-nowrap items-center">
      <>
        {category && (
          <Chip
            className="px-2 text-slate-100"
            sx={{ backgroundColor: category.color }}
            label={category.label}
            variant="filled"
            size="small"
          />
        )}
        <i
          className="fa-solid fa-pen ml-2 cursor-pointer text-xs text-slate-600"
          onClick={onEdit}
        />
      </>
    </div>
  );
};

export default EditableCategoryCell;
