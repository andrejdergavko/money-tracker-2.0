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

import useEditTransactions from '~service/transactions/useEditTransactions';
import useTransactions from '~service/transactions/useTransactions';
import useDetermineCategory from '~service/openai/useDetermineCategory';
import useCategories from '~service/categories/useCategories';
import { Button } from '~components/ui/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  transactionUuids: string[];
};

const SetCategoryModal: FC<Props> = ({ isOpen, onClose, transactionUuids }) => {
  const [value, setValue] = useState<string>('');
  const [determinedCategory, setDeterminedCategory] = useState<string>();

  const { transactions = [] } = useTransactions();
  const { categories = [] } = useCategories();

  const { determineCategory, isLoading } = useDetermineCategory({
    onSuccess: setDeterminedCategory,
  });
  const { editTransactions, isEditing } = useEditTransactions({
    onSuccess: () => handleClose(),
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

  const handleClose = () => {
    setValue('');
    setDeterminedCategory(undefined);
    onClose();
  };

  const handleSet = (event: FormEvent) => {
    event.preventDefault();
    editTransactions({
      uuids: transactionUuids,
      fields: { categoryUuid: value },
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <form onSubmit={handleSet}>
        <DialogTitle id="alert-dialog-title">Select the category</DialogTitle>
        <DialogContent dividers>
          Determined category:
          {isLoading ? (
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            loading={isEditing}
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
