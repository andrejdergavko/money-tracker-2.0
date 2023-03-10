import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import useEditTransactions from '@hooks/useEditTransactions';
import useCategories from '@hooks/useCategories';
import { Button } from '@components/ui/Button';

interface PropsT {
  isOpen: boolean;
  onClose: () => void;
  transactionUuids: string[];
}

const SetCategoryModal: FC<PropsT> = ({
  isOpen,
  onClose,
  transactionUuids,
}) => {
  const [value, setValue] = React.useState<string>();
  const { categories = [] } = useCategories();

  const { editTransactions, isEditing } = useEditTransactions({
    onSuccess: () => handleClose(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setValue(undefined);
    onClose();
  };

  const handleSet = (event: React.FormEvent) => {
    event.preventDefault();
    editTransactions({
      uuids: transactionUuids,
      fields: { categoryUuid: value },
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <form
        className="flex flex-col max-h-[700px] w-[400px]"
        onSubmit={handleSet}
      >
        <DialogTitle id="alert-dialog-title">Select the category</DialogTitle>
        <DialogContent dividers>
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
