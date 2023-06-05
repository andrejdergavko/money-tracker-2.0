import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Switch from '@mui/material/Switch';

import { FormControl } from '~components/ui/FormControl';
import Select, { MenuItem } from '~components/ui/Select';
import Input from '~components/ui/Input';
import useStatisticChartFilters from '~lib/hooks/useStatisticChartFilters';
import { SUMMARIZE_BY_OPTIONS } from '~lib/constants';

import CategoriesSelect from './CategoriesSelect';

const FilterBlock = () => {
  const {
    filters: { startDate, endDate, categories, summarizeBy, isTypeStack },
    setters,
  } = useStatisticChartFilters();

  return (
    <>
      <FormControl className="min-w-[170px] w-2/12 px-4 relative mb-3">
        <label
          className="block uppercase text-slate-600 text-xs font-bold mb-2"
          htmlFor="start-date-input"
        >
          Start date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(startDate, 'DD-MM-YYYY')}
            inputFormat="DD-MM-YYYY"
            onChange={(newValue) => {
              newValue && setters.setStartDate(newValue.format('DD-MM-YYYY'));
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
            value={dayjs(endDate, 'DD-MM-YYYY')}
            inputFormat="DD-MM-YYYY"
            onChange={(newValue) => {
              newValue && setters.setEndDate(newValue.format('DD-MM-YYYY'));
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
            setters.setCategories(values);
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
            setters.setSummarizeBy(Number(event.target.value));
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
          Is type stack
        </label>
        <Switch
          checked={isTypeStack}
          onChange={(event) => {
            setters.setIsTypeStack(event.target.checked);
          }}
        />
      </FormControl>
    </>
  );
};

export default FilterBlock;