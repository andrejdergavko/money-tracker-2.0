import { FC } from 'react';
import Chip from '@mui/material/Chip';
import { type SelectChangeEvent } from '@mui/material/Select';

import Select, { MenuItem } from '~components/ui/Select';
import useCategories from '~modules/categories/hooks/useCategories';

type Props = {
  values?: string[];
  onChange: (values: string[]) => void;
};

const CategoriesSelect: FC<Props> = ({ values, onChange }) => {
  const { categories } = useCategories();

  const renderValues = (selectedUuids?: string[]) => {
    const selectedCategories = (categories || []).filter(
      (item) => selectedUuids?.includes(item.uuid)
    );

    return (
      <div className="p-1 flex flex-wrap gap-1">
        {selectedCategories.map((category) => (
          <Chip
            key={category.uuid}
            label={category.label}
            sx={{ backgroundColor: category.color }}
            classes={{
              root: 'px-1 text-slate-200',
            }}
            size="small"
          />
        ))}
      </div>
    );
  };

  return (
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={values}
      onChange={(event: SelectChangeEvent<typeof values>) => {
        const {
          target: { value },
        } = event;
        value && onChange(typeof value === 'string' ? value.split(',') : value);
      }}
      renderValue={renderValues}
    >
      {(categories || []).map((category) => (
        <MenuItem key={category.uuid} value={category.uuid}>
          <div className="flex items-center">
            <div
              className="w-4 h-4 mr-2 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.label}
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default CategoriesSelect;
