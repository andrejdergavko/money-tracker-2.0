import { type FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';

import useDetermineCategory from '~modules/categories/hooks/useDetermineCategory';
import useCategories from '~modules/categories/hooks/useCategories';
import useTransactions from '~modules/transactions/hooks/useTransactions';
import { Button } from '~components/ui/Button';

type Props = {
  onClose: () => void;
  transactionUuids: string[];
  onSetCategory: (categoryUuid: string) => void;
  isLoading?: boolean;
};

const SetCategoryModal: FC<Props> = ({
  onClose,
  transactionUuids,
  onSetCategory,
  isLoading,
}) => {
  const [value, setValue] = useState<string>('');
  const [determinedCategory, setDeterminedCategory] = useState<string>();

  const { transactions = [] } = useTransactions();
  const { categories = [] } = useCategories();

  const { determineCategory, isLoading: isDetermining } = useDetermineCategory({
    onSuccess: setDeterminedCategory,
  });

  const selectedTransactions = transactions.filter((transaction) =>
    transactionUuids.includes(transaction.uuid)
  );

  useEffect(() => {
    if (
      !determinedCategory &&
      selectedTransactions.length &&
      categories.length
    ) {
      determineCategory({ transactions: selectedTransactions, categories });
    }
  }, [transactions, transactionUuids, categories]);

  useEffect(() => {
    if (!value && determinedCategory) {
      const category = categories.find(
        (category) => category.label === determinedCategory
      );

      category && setValue(category?.uuid);
    }
  }, [determinedCategory]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSet = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onSetCategory(value);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <form onSubmit={handleSet}>
        <DialogTitle id="alert-dialog-title">Select the category</DialogTitle>
        <DialogContent dividers>
          Determined category:
          {isDetermining ? (
            <CircularProgress size={15} />
          ) : (
            <b className="ml-2">{determinedCategory}</b>
          )}
        </DialogContent>
        <DialogContent>
          <FormControl>
            <RadioGroup name="categories" value={value} onChange={handleChange}>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.uuid}
                  value={category.uuid}
                  control={<Radio />}
                  label={category.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            loading={isLoading}
            type="submit"
            variant="contained"
            autoFocus
          >
            Set
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SetCategoryModal;
