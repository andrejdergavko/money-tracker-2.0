import useSWRMutation from 'swr/mutation';
import useTransactions from '@hooks/useTransactions';
import useDeleteTransaction from '@hooks/useDeleteTransaction';
import useAddTransaction from '@hooks/useAddTransaction';
import TransactionTable from '../components/transactions-table';

export default function Transactions() {
  // const { transactions, isLoading } = useTransactions();
  // const { deleteTransaction, isDeleting } = useDeleteTransaction();
  // const { addTransaction, isAdding } = useAddTransaction();

  // const handleAddNew = () => {
  //   addTransaction({
  //     date: '2023-01-03 11:13:50+00',
  //     currency: 'BYN',
  //     description: '111',
  //     amount: 10,
  //     amountInUsd: 5,
  //     bank: 'sdfds',
  //     categoryId: 1,
  //   });
  // };

  // const handledDeleteTransaction = () => {
  //   deleteTransaction(180);
  // };

  return (
    <div className="mx-14 rounded-lg overflow-hidden">
      {/* <button onClick={handleAddNew}>Add new transaction</button>
      <button onClick={handledDeleteTransaction}>Delete transaction</button>
      <div>{String(transactions)}</div> */}
      <TransactionTable />
    </div>
  );
}
