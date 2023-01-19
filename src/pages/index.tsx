import TransactionTable from '../components/transaction-table';
import useSWRMutation from 'swr/mutation';
import swr from 'swr';

export default function Transactions() {
  const { trigger: addTransaction } = useSWRMutation(
    '/api/transaction',
    (url, { arg }) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      })
  );

  const { trigger: deleteTransaction } = useSWRMutation(
    '/api/transaction',
    (url, { arg }) => fetch(`${url}?transactionId=${arg}`, { method: 'DELETE' })
  );

  const { data } = swr('/api/transactions', (url) =>
    fetch(url).then((res) => res.json())
  );

  const handleAddNew = () => {
    addTransaction({
      date: '2023-01-03 11:13:50+00',
      currency: 'BYN',
      description: '111',
      amount: 10,
      amountInUsd: 5,
      bank: 'sdfds',
      categoryId: 1,
    });
  };

  return (
    <div className="mx-14 rounded-lg overflow-hidden">
      <button onClick={handleAddNew}>Add new transaction</button>
      <button
        onClick={() => {
          deleteTransaction(167);
        }}
      >
        Delete transaction
      </button>
      <div>{String(data)}</div>
      {/* <TransactionTable /> */}
    </div>
  );
}
