import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Switch from '@mui/material/Switch';
import { Chip } from '@mui/material';
import { format } from 'date-fns';

import { FormControl } from '~components/ui/FormControl';
import Select, { MenuItem } from '~components/ui/Select';
import { TextField as Input } from '~components/ui/Input';
import useStatisticChartFilters from '~modules/statistics/hooks/useStatisticChartFilters';
import CategoriesSelect from '~modules/categories/components/CategoriesSelect';

import { SUMMARIZE_BY_OPTIONS } from '../constants';
import { MillisecondsBy } from 'src/constants';

const shortcuts = [
  {
    label: 'Last 30 days',
    filters: {
      startDate: format(
        new Date(new Date().getTime() - MillisecondsBy.Month),
        'yyyy-MM-dd'
      ),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
  },
  {
    label: 'Last 60 days',
    filters: {
      startDate: format(
        new Date(new Date().getTime() - MillisecondsBy.Month * 2),
        'yyyy-MM-dd'
      ),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
  },
  {
    label: 'Last 90 days',
    filters: {
      startDate: format(
        new Date(new Date().getTime() - MillisecondsBy.Month * 3),
        'yyyy-MM-dd'
      ),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
  },
];

const FilterBlock = () => {
  const {
    filters: { startDate, endDate, categories, summarizeBy, isStackType },
    setFilters,
  } = useStatisticChartFilters();

  return (
    <>
      <div>
        <FormControl className="min-w-[170px] w-2/12 px-4 relative mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="start-date-input"
          >
            Start date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(startDate, 'YYYY-MM-DD')}
              inputFormat="YYYY-MM-DD"
              onChange={(newValue) => {
                newValue &&
                  setFilters({ startDate: newValue.format('YYYY-MM-DD') });
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <>
                  {/* @ts-ignore */}
                  <Input
                    {...inputProps}
                    id="start-date-input"
                    inputRef={inputRef}
                    endAdornment={InputProps?.endAdornment}
                  />
                </>
              )}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl className="min-w-[170px] w-2/12 px-4 relative mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="end-date-input"
          >
            End date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(endDate, 'YYYY-MM-DD')}
              inputFormat="YYYY-MM-DD"
              onChange={(newValue) => {
                newValue &&
                  setFilters({ endDate: newValue.format('YYYY-MM-DD') });
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <>
                  {/* @ts-ignore */}
                  <Input
                    {...inputProps}
                    id="end-date-input"
                    inputRef={inputRef}
                    endAdornment={InputProps?.endAdornment}
                  />
                </>
              )}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl className="min-w-[250px]  px-4 relative mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="categories-select"
          >
            Categories
          </label>

          <CategoriesSelect
            values={categories}
            onChange={(values) => {
              setFilters({ categories: values });
            }}
          />
        </FormControl>

        <FormControl className="min-w-[170px] w-2/12 px-4 relative mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="summarize-by-select-label"
          >
            Summarize by
          </label>
          <Select
            labelId="summarize-by-select-label"
            id="summarize-by-select"
            value={Number(summarizeBy)}
            onChange={(event) => {
              setFilters({ summarizeBy: Number(event.target.value) });
            }}
          >
            {SUMMARIZE_BY_OPTIONS.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="min-w-[170px] w-2/12 px-4 relative mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="summarize-by-select-label"
          >
            Is stack
          </label>
          <Switch
            checked={isStackType}
            onChange={(event) => {
              setFilters({ isStackType: event.target.checked });
            }}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="px-4 mt-1 relative mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="summarize-by-select-label"
          >
            Quick filters
          </label>
          <div>
            {shortcuts.map(({ label, filters }) => (
              <Chip
                key={label}
                label={label}
                className="mr-2"
                onClick={() => {
                  setFilters(filters);
                }}
              />
            ))}
          </div>
        </FormControl>
      </div>
    </>
  );
};

export default FilterBlock;
