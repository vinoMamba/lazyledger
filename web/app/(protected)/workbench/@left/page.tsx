import { getTransactionListAction } from "@/actions/get-transaction-list";
import { TransactionTable } from "@/components/transaction/transaction-table";


export const dynamic = 'force-dynamic';

export default async function LeftPage() {
  const transactions = await getTransactionListAction()
  return <TransactionTable transactions={transactions} />
}

